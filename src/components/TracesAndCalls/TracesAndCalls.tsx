import React from 'react';

import {
  TRACES_CALLS_MODE_TRACES,
  TRACES_CALLS_MODE_CALL_DETAIL,
} from '../../datasources/DataSource_TracesAndCalls';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../../types/time_filter';
import { readTime } from '../../util/time_util';

interface Props {
  query: InstanaQuery;
  groups: SelectableValue[];
  updateGroups(groups: SelectableValue[]): void;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
  datasource: DataSource;
  range?: any;
}

interface State {
  traces: SelectableValue[];    // options for the Trace dropdown
  calls: SelectableValue[];     // options for the Call dropdown (populated after trace selection)
  tracesLoading: boolean;
  callsLoading: boolean;
}

const PLEASE_SPECIFY: SelectableValue = { key: '', label: 'Please specify', value: '' };

const QUERY_MODE_OPTIONS: SelectableValue[] = [
  {
    key: TRACES_CALLS_MODE_TRACES,
    label: 'Trace detail',
    description: 'Select a trace — shows all spans inside it as a table.',
  },
  {
    key: TRACES_CALLS_MODE_CALL_DETAIL,
    label: 'Call / Span detail',
    description: 'Select a trace, then a span — shows full metadata for that span as a table.',
  },
];

let isUnmounting = false;

export class TracesAndCalls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      traces: [],
      calls: [],
      tracesLoading: false,
      callsLoading: false,
    };
  }

  componentDidMount() {
    const { query, onChange } = this.props;
    isUnmounting = false;

    // Default mode on first load
    if (!query.tracesAndCallsQueryMode?.key) {
      query.tracesAndCallsQueryMode = QUERY_MODE_OPTIONS[0];
      onChange(query);
    }

    // Traces & Calls does not use the shared Metric / Group-by row
    this.props.updateMetrics([]);
    this.props.updateGroups([]);

    // Populate the trace dropdown immediately
    this.loadTraces();
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  getTimeFilter(): TimeFilter {
    return this.props.range
      ? readTime(this.props.range)
      : this.props.datasource.getTimeFilter();
  }

  loadTraces() {
    this.setState({ tracesLoading: true });
    this.props.datasource.dataSourceTracesAndCalls
      .fetchTracesForDropdown(this.getTimeFilter())
      .then((traces: SelectableValue[]) => {
        if (!isUnmounting) {
          this.setState({ traces, tracesLoading: false });
        }
      })
      .catch(() => {
        if (!isUnmounting) {
          this.setState({ tracesLoading: false });
        }
      });
  }

  loadCalls(traceId: string) {
    this.setState({ calls: [], callsLoading: true });
    this.props.datasource.dataSourceTracesAndCalls
      .fetchCallsForDropdown(traceId)
      .then((calls: SelectableValue[]) => {
        if (!isUnmounting) {
          this.setState({ calls, callsLoading: false });
        }
      })
      .catch(() => {
        if (!isUnmounting) {
          this.setState({ callsLoading: false });
        }
      });
  }

  onModeChange = (mode: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.tracesAndCallsQueryMode = mode;
    // Reset selections when switching mode
    query.selectedTrace = PLEASE_SPECIFY;
    query.selectedCall  = PLEASE_SPECIFY;
    onChange(query);
    this.setState({ calls: [] });
    onRunQuery();
  };

  onTraceChange = (trace: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedTrace = trace;
    query.selectedCall  = PLEASE_SPECIFY;
    onChange(query);
    this.setState({ calls: [] });

    const mode = query.tracesAndCallsQueryMode?.key || TRACES_CALLS_MODE_TRACES;
    const traceId = trace?.key;

    // In call-detail mode, load the call dropdown after a trace is picked
    if (mode === TRACES_CALLS_MODE_CALL_DETAIL && traceId) {
      this.loadCalls(String(traceId));
    }

    onRunQuery();
  };

  onCallChange = (call: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedCall = call;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { query } = this.props;
    const { traces, calls, tracesLoading, callsLoading } = this.state;

    const mode = query.tracesAndCallsQueryMode?.key || TRACES_CALLS_MODE_TRACES;
    const modeValue = QUERY_MODE_OPTIONS.find((o) => o.key === mode) || QUERY_MODE_OPTIONS[0];

    // Normalise selectedTrace so the Select shows the right label
    const traceValue = query.selectedTrace?.key
      ? traces.find((t) => t.key === query.selectedTrace.key) ?? query.selectedTrace
      : PLEASE_SPECIFY;

    // Normalise selectedCall
    const callValue = query.selectedCall?.key
      ? calls.find((c) => c.key === query.selectedCall.key) ?? query.selectedCall
      : PLEASE_SPECIFY;

    const traceOptions = [PLEASE_SPECIFY, ...traces];
    const callOptions  = [PLEASE_SPECIFY, ...calls];

    return (
      <div>
        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Query mode'}
            tooltip={
              'Trace detail: pick a trace → see all its spans in a table.\n' +
              'Call / Span detail: pick a trace, then a span → see full metadata.'
            }
            value={modeValue}
            options={QUERY_MODE_OPTIONS}
            onChange={this.onModeChange}
          />
        </div>

        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Trace'}
            tooltip={
              'Select a trace from the current time range.\n' +
              'Label shows:  service  →  endpoint  (duration ms).\n' +
              'API: GET /api/application-monitoring/analyze/traces'
            }
            value={traceValue}
            options={traceOptions}
            onChange={this.onTraceChange}
            noOptionsMessage={tracesLoading ? 'Loading traces…' : 'No traces found in time range'}
            placeholder={'Select a trace…'}
          />
        </div>

        {mode === TRACES_CALLS_MODE_CALL_DETAIL && (
          <div className={'gf-form'}>
            <FormSelect
              queryKeyword
              inputWidth={0}
              label={'Call / Span'}
              tooltip={
                'Select a span from within the chosen trace.\n' +
                'Label shows:  span name  (service).\n' +
                'API: GET /api/application-monitoring/v2/analyze/traces/{id}'
              }
              value={callValue}
              options={callOptions}
              onChange={this.onCallChange}
              noOptionsMessage={
                !query.selectedTrace?.key
                  ? 'Select a trace first'
                  : callsLoading
                  ? 'Loading spans…'
                  : 'No spans found'
              }
              placeholder={'Select a span…'}
            />
          </div>
        )}

      </div>
    );
  }
}
