import React from 'react';
import { Button, InlineFormLabel, Input, Select } from '@grafana/ui';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import FormSwitch from '../FormField/FormSwitch';
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
  traces: SelectableValue[];
  calls: SelectableValue[];
  tagOptions: SelectableValue[];
  tracesLoading: boolean;
  callsLoading: boolean;
  tagsLoading: boolean;
}

const PLEASE_SPECIFY: SelectableValue = { key: '', label: 'Please specify', value: '' };

const TAG_FILTER_OPERATORS = [
  { key: 'EQUALS',          label: 'equals' },
  { key: 'NOT_EQUAL',       label: 'does not equal' },
  { key: 'CONTAINS',        label: 'contains' },
  { key: 'NOT_CONTAIN',     label: 'does not contain' },
  { key: 'STARTS_WITH',     label: 'starts with' },
  { key: 'ENDS_WITH',       label: 'ends with' },
  { key: 'NOT_STARTS_WITH', label: 'does not start with' },
  { key: 'NOT_ENDS_WITH',   label: 'does not end with' },
  { key: 'NOT_EMPTY',       label: 'is present' },
  { key: 'IS_EMPTY',        label: 'is not present' },
];

const TAG_FILTER_ENTITIES = [
  { key: 'DESTINATION', label: 'Destination', value: 'DESTINATION' },
  { key: 'SOURCE',      label: 'Source',      value: 'SOURCE' },
];

type TraceTagFilter = InstanaQuery['tracesTagFilters'][number];

const EMPTY_TAG_FILTER: TraceTagFilter = {
  name: '',
  operator: 'EQUALS',
  entity: 'DESTINATION',
  value: '',
};

let isUnmounting = false;

export class TracesAndCalls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      traces: [],
      calls: [],
      tagOptions: [],
      tracesLoading: false,
      callsLoading: false,
      tagsLoading: false,
    };
  }

  componentDidMount() {
    const { query, onChange } = this.props;
    isUnmounting = false;

    // Initialise fields that may not exist on older saved queries
    if (query.tracesIncludeInternal === undefined) {
      query.tracesIncludeInternal = false;
    }
    if (query.tracesIncludeSynthetic === undefined) {
      query.tracesIncludeSynthetic = false;
    }
    if (!Array.isArray(query.tracesTagFilters)) {
      query.tracesTagFilters = [];
    }
    onChange(query);

    // Traces & Calls does not use the shared Metric / Group-by row
    this.props.updateMetrics([]);
    this.props.updateGroups([]);

    this.loadTraces();
    this.loadTagOptions();

    // If a trace was already selected (e.g. dashboard reload), re-populate calls
    if (query.selectedTrace?.key) {
      this.loadCalls(String(query.selectedTrace.key));
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

  // ── Data loaders ──────────────────────────────────────────────────────────

  loadTraces() {
    const { query } = this.props;
    this.setState({ tracesLoading: true });
    this.props.datasource.dataSourceTracesAndCalls
      .fetchTracesForDropdown(
        this.getTimeFilter(),
        query.tracesIncludeInternal ?? false,
        query.tracesIncludeSynthetic ?? false,
        query.tracesTagFilters ?? []
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

  loadTagOptions() {
    this.setState({ tagsLoading: true });
    this.props.datasource
      .fetchTracesTags()
      .then((tags: SelectableValue[]) => {
        if (!isUnmounting) {
          this.setState({ tagOptions: tags, tagsLoading: false });
        }
      })
      .catch(() => {
        if (!isUnmounting) {
          this.setState({ tagsLoading: false });
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

  // ── Trace / Call change handlers ──────────────────────────────────────────

  onTraceChange = (trace: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedTrace = trace;
    query.selectedCall  = PLEASE_SPECIFY;
    onChange(query);
    this.setState({ calls: [] });

    // Always load the call/span list for the picked trace
    if (trace?.key) {
      this.loadCalls(String(trace.key));
    }

    onRunQuery();
  };

  onCallChange = (call: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.selectedCall = call;
    onChange(query);
    // selecting a call (or clearing it) re-runs the query:
    // runQuery branches: selectedCall.key → call detail, otherwise → trace detail
    onRunQuery();
  };

  // ── Boolean toggle handlers ───────────────────────────────────────────────

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

  // ── Tag-filter handlers ───────────────────────────────────────────────────

  addTagFilter = () => {
    const { query, onChange } = this.props;
    query.tracesTagFilters = [...(query.tracesTagFilters ?? []), { ...EMPTY_TAG_FILTER }];
    onChange(query);
  };

  removeTagFilter = (index: number) => {
    const { query, onChange } = this.props;
    const updated = [...(query.tracesTagFilters ?? [])];
    updated.splice(index, 1);
    query.tracesTagFilters = updated;
    onChange(query);
    this.loadTraces();
  };

  onTagFilterNameChange = (value: SelectableValue, index: number) => {
    const { query, onChange } = this.props;
    const updated = [...(query.tracesTagFilters ?? [])];
    const tag = this.state.tagOptions.find((t) => t.value === value.value);

    let entity = updated[index].entity;
    if (tag && !tag.canApplyToSource && tag.canApplyToDestination) {
      entity = 'DESTINATION';
    } else if (tag && tag.canApplyToSource && !tag.canApplyToDestination) {
      entity = 'SOURCE';
    }

    updated[index] = { ...updated[index], name: value.value ?? '', entity };
    query.tracesTagFilters = updated;
    onChange(query);
  };

  onTagFilterOperatorChange = (value: SelectableValue, index: number) => {
    const { query, onChange } = this.props;
    const updated = [...(query.tracesTagFilters ?? [])];
    updated[index] = { ...updated[index], operator: value.key ?? 'EQUALS' };
    query.tracesTagFilters = updated;
    onChange(query);
  };

  onTagFilterEntityChange = (value: SelectableValue, index: number) => {
    const { query, onChange } = this.props;
    const updated = [...(query.tracesTagFilters ?? [])];
    updated[index] = { ...updated[index], entity: value.key ?? 'DESTINATION' };
    query.tracesTagFilters = updated;
    onChange(query);
  };

  onTagFilterValueChange = (event: React.FormEvent<HTMLInputElement>, index: number) => {
    const { query, onChange } = this.props;
    const updated = [...(query.tracesTagFilters ?? [])];
    updated[index] = { ...updated[index], value: event.currentTarget.value };
    query.tracesTagFilters = updated;
    onChange(query);
  };

  applyTagFilters = () => {
    this.loadTraces();
  };

  render() {
    const { query } = this.props;
    const { traces, calls, tagOptions, tracesLoading, callsLoading, tagsLoading } = this.state;

    const traceValue = query.selectedTrace?.key
      ? traces.find((t) => t.key === query.selectedTrace.key) ?? query.selectedTrace
      : PLEASE_SPECIFY;

    const callValue = query.selectedCall?.key
      ? calls.find((c) => c.key === query.selectedCall.key) ?? query.selectedCall
      : PLEASE_SPECIFY;

    const traceOptions = [PLEASE_SPECIFY, ...traces];
    const callOptions  = [PLEASE_SPECIFY, ...calls];

    const tagFilters: TraceTagFilter[] = query.tracesTagFilters ?? [];

    return (
      <div>
        {/* ── Boolean flags ──────────────────────────────────────────── */}
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

        {/* ── Tag filter rows ────────────────────────────────────────── */}
        {tagFilters.map((filter, index) => {
          const operatorValue =
            TAG_FILTER_OPERATORS.find((o) => o.key === filter.operator) ?? TAG_FILTER_OPERATORS[0];
          const entityValue =
            TAG_FILTER_ENTITIES.find((e) => e.key === filter.entity) ?? TAG_FILTER_ENTITIES[0];

          const currentTag = tagOptions.find((t) => t.value === filter.name);
          const nameValue  = filter.name
            ? (currentTag ?? { key: filter.name, label: filter.name, value: filter.name })
            : null;

          const sourceAllowed      = !currentTag || currentTag.canApplyToSource      !== false;
          const destinationAllowed = !currentTag || currentTag.canApplyToDestination !== false;
          const availableEntities  = TAG_FILTER_ENTITIES.filter(
            (e) => (e.key === 'SOURCE' && sourceAllowed) || (e.key === 'DESTINATION' && destinationAllowed)
          );

          const needsValue = operatorValue.key !== 'NOT_EMPTY' && operatorValue.key !== 'IS_EMPTY';

          return (
            <div key={'trace_filter_' + index} className={'gf-form'}>
              <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Filter traces by tag.'}>
                {index + 1}. tag filter
              </InlineFormLabel>

              <Select
                menuPlacement={'bottom'}
                width={14}
                value={entityValue}
                options={availableEntities}
                isDisabled={availableEntities.length <= 1}
                onChange={(v) => this.onTagFilterEntityChange(v, index)}
              />

              <Select
                menuPlacement={'bottom'}
                width={24}
                isSearchable={true}
                allowCustomValue={true}
                placeholder={tagsLoading ? 'Loading tags…' : 'tag name…'}
                value={nameValue}
                options={tagOptions}
                onChange={(v) => this.onTagFilterNameChange(v, index)}
              />

              <Select
                menuPlacement={'bottom'}
                width={20}
                value={operatorValue}
                options={TAG_FILTER_OPERATORS}
                onChange={(v) => this.onTagFilterOperatorChange(v, index)}
              />

              {needsValue && (
                <Input
                  width={24}
                  placeholder={'value…'}
                  value={filter.value}
                  onChange={(e) => this.onTagFilterValueChange(e, index)}
                />
              )}

              <Button variant={'secondary'} onClick={() => this.removeTagFilter(index)}>
                −
              </Button>
            </div>
          );
        })}

        {/* ── Add filter / Apply ─────────────────────────────────────── */}
        <div className={'gf-form'}>
          <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Add a tag filter to narrow the traces search.'}>
            Tag filters
          </InlineFormLabel>
          <Button variant={'primary'} onClick={this.addTagFilter}>
            + Add filter
          </Button>
          {tagFilters.length > 0 && (
            <Button style={{ marginLeft: 8 }} variant={'primary'} onClick={this.applyTagFilters}>
              Apply filters
            </Button>
          )}
        </div>

        {/* ── Trace dropdown ─────────────────────────────────────────── */}
        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Trace'}
            tooltip={
              'Select a trace from the current time range.\n' +
              'Label shows:  service  →  endpoint  (duration ms).\n' +
              'Selecting a trace shows its span table below.'
            }
            value={traceValue}
            options={traceOptions}
            onChange={this.onTraceChange}
            noOptionsMessage={tracesLoading ? 'Loading traces…' : 'No traces found in time range'}
            placeholder={'Select a trace…'}
          />
        </div>

        {/* ── Call / Span dropdown — always visible once a trace is picked ── */}
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
