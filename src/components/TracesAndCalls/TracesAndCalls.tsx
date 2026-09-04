import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import FormSwitch from '../FormField/FormSwitch';
import FormTextArea from '../FormField/FormTextArea';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../../types/time_filter';
import { readTime } from '../../util/time_util';
import _ from 'lodash';

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
  traces: SelectableValue[];
  calls: SelectableValue[];
  tracesLoading: boolean;
  callsLoading: boolean;
  tagFilterExpressionText: string;
}

const PLEASE_SPECIFY: SelectableValue = { key: '', label: 'Please specify', value: '' };

let isUnmounting = false;

export class TracesAndCalls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      traces: [],
      calls: [],
      tracesLoading: false,
      callsLoading: false,
      tagFilterExpressionText: props.query.tagFilterExpression || '',
    };
  }

  componentDidMount() {
    const { query, onChange } = this.props;
    isUnmounting = false;

    if (query.tracesIncludeInternal === undefined) {
      query.tracesIncludeInternal = false;
    }
    if (query.tracesIncludeSynthetic === undefined) {
      query.tracesIncludeSynthetic = false;
    }
    if (!query.tagFilterExpression) {
      query.tagFilterExpression = '';
    }
    onChange(query);

    this.props.updateMetrics([]);
    this.props.updateGroups([]);

    if (this.hasValidTagFilter()) {
      this.loadTraces();
      if (query.selectedTrace?.key) {
        this.loadCalls(String(query.selectedTrace.key));
      }
    }
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  getTimeFilter(): TimeFilter {
    return this.props.range
      ? readTime(this.props.range)
      : this.props.datasource.getTimeFilter();
  }

  parsedTagFilter(): any {
    const raw = (this.props.query.tagFilterExpression || '').trim();
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  hasValidTagFilter(): boolean {
    const raw = (this.props.query.tagFilterExpression || '').trim();
    return raw.length > 0 && this.parsedTagFilter() !== null;
  }

  loadTraces() {
    const { query } = this.props;

    if (!this.hasValidTagFilter()) {
      this.setState({ traces: [], tracesLoading: false });
      return;
    }

    this.setState({ tracesLoading: true });

    this.props.datasource.dataSourceTracesAndCalls
      .fetchTracesForDropdown(
        this.getTimeFilter(),
        query.tracesIncludeInternal ?? false,
        query.tracesIncludeSynthetic ?? false,
        this.parsedTagFilter()
      )
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

  onTraceChange = (trace: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedTrace = trace;
    query.selectedCall = PLEASE_SPECIFY;
    onChange(query);
    this.setState({ calls: [] });

    if (trace?.key) {
      this.loadCalls(String(trace.key));
    }

    onRunQuery();
  };

  onCallChange = (call: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedCall = call;
    onChange(query);
    onRunQuery();
  };

  onIncludeInternalChange = () => {
    const { query, onChange } = this.props;
    query.tracesIncludeInternal = !query.tracesIncludeInternal;
    onChange(query);
    this.loadTraces();
  };

  onIncludeSyntheticChange = () => {
    const { query, onChange } = this.props;
    query.tracesIncludeSynthetic = !query.tracesIncludeSynthetic;
    onChange(query);
    this.loadTraces();
  };

  debouncedLoadTraces = _.debounce(() => this.loadTraces(), 600);

  onTagFilterExpressionChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { query, onChange } = this.props;
    const value = event.currentTarget.value;
    this.setState({ tagFilterExpressionText: value });
    query.tagFilterExpression = value;
    query.selectedTrace = {};
    query.selectedCall = {};
    onChange(query);
    this.debouncedLoadTraces();
  };

  render() {
    const { query } = this.props;
    const { traces, calls, tracesLoading, callsLoading, tagFilterExpressionText } = this.state;

    const raw = tagFilterExpressionText.trim();
    const tagFilterInvalid = raw.length > 0 && this.parsedTagFilter() === null;
    const tagFilterMissing = raw.length === 0;

    const traceValue = query.selectedTrace?.key
      ? traces.find((t) => t.key === query.selectedTrace.key) ?? query.selectedTrace
      : PLEASE_SPECIFY;

    const callValue = query.selectedCall?.key
      ? calls.find((c) => c.key === query.selectedCall.key) ?? query.selectedCall
      : PLEASE_SPECIFY;

    const traceOptions = [PLEASE_SPECIFY, ...traces];
    const callOptions = [PLEASE_SPECIFY, ...calls];

    let traceNoOptionsMessage: string;
    if (tracesLoading) {
      traceNoOptionsMessage = 'Loading traces…';
    } else if (tagFilterMissing) {
      traceNoOptionsMessage = 'Enter a tag filter expression above to search for traces';
    } else if (tagFilterInvalid) {
      traceNoOptionsMessage = 'Fix the tag filter expression JSON above to search for traces';
    } else {
      traceNoOptionsMessage = 'No traces found for the given filter';
    }

    return (
      <div>
        <div className={'gf-form'}>
          <FormSwitch
            queryKeyword
            label={'Include internal'}
            tooltip={'When enabled, internal traces are included in the result (includeInternal: true).'}
            value={query.tracesIncludeInternal ?? false}
            onChange={this.onIncludeInternalChange}
          />
          <FormSwitch
            queryKeyword
            label={'Include synthetic'}
            tooltip={'When enabled, synthetic traces are included in the result (includeSynthetic: true).'}
            value={query.tracesIncludeSynthetic ?? false}
            onChange={this.onIncludeSyntheticChange}
          />
        </div>

        <div className={'gf-form'}>
          <FormTextArea
            queryKeyword
            inputWidth={0}
            label={'Tag filter expression *'}
            invalid={tagFilterInvalid}
            tooltip={
              'Required. Enter a tagFilterExpression JSON object — traces will only be loaded once a valid expression is provided.\n' +
              'Example: {"type":"EXPRESSION","logicalOperator":"AND","elements":[{"type":"TAG_FILTER","name":"service.name","operator":"EQUALS","entity":"DESTINATION","value":"my-service"}]}'
            }
            placeholder={'{"type":"EXPRESSION","logicalOperator":"AND","elements":[{"type":"TAG_FILTER","name":"service.name","operator":"EQUALS","entity":"DESTINATION","value":"..."}]}'}
            value={tagFilterExpressionText}
            onChange={this.onTagFilterExpressionChange}
          />
        </div>

        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Trace'}
            tooltip={
              'Select a trace matching the tag filter above.\n' +
              'Label shows:  service  →  endpoint  (duration ms).\n' +
              'Selecting a trace shows its span table below.'
            }
            value={traceValue}
            options={traceOptions}
            onChange={this.onTraceChange}
            noOptionsMessage={traceNoOptionsMessage}
            placeholder={'Select a trace…'}
          />
        </div>

        {query.selectedTrace?.key && (
          <div className={'gf-form'}>
            <FormSelect
              queryKeyword
              inputWidth={0}
              label={'Call / Span'}
              tooltip={
                'Optionally select a span to see its full metadata.\n' +
                'Leave as "Please specify" to stay in trace-detail view.\n' +
                'Selecting a span switches the panel to call-detail view.'
              }
              value={callValue}
              options={callOptions}
              onChange={this.onCallChange}
              noOptionsMessage={callsLoading ? 'Loading spans…' : 'No spans found'}
              placeholder={'Select a span (optional)…'}
            />
          </div>
        )}
      </div>
    );
  }
}
