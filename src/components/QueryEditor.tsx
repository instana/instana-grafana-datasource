import React, { PureComponent } from 'react';

import {
  ANALYZE_APPLICATION_METRICS,
  ANALYZE_WEBSITE_METRICS,
  APPLICATION_SERVICE_ENDPOINT_METRICS,
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  SLO_INFORMATION,
} from '../GlobalVariables';
import { ApplicationServiceEndpointMetrics } from './ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics';
import { InfrastructureBuiltIn } from './Infrastructure/BuiltIn/InfrastructureBuiltIn';
import { InfrastructureCustom } from './Infrastructure/Custom/InfrastructureCustom';
import { ApplicationCallsMetrics } from './Analyze/ApplicationCallsMetrics';
import { MetricFilter } from './Infrastructure/Custom/MetricFilter';
import AdvancedSettings from './AdvancedSettings/AdvancedSettings';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { SloInformation } from './SLOInformation/SloInformation';
import AggregationFunctions from '../lists/aggregation_function';
import { InstanaOptions } from '../types/instana_options';
import MetricCategories from '../lists/metric_categories';
import { WebsiteMetrics } from './Analyze/WebsiteMetrics';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import FormSelect from './FormField/FormSelect';
import { InlineFormLabel } from '@grafana/ui';
import { Filters } from './Analyze/Filter';
import Metric from './Metric/Metric';
import migrate from '../migration';
import _ from 'lodash';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  allMetrics: SelectableValue[];
  availableMetrics: SelectableValue[];
  groups: SelectableValue[];
  currentCategory: SelectableValue;
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = {
      metricCategory: MetricCategories[0],
      customFilters: [],
    };

    this.query = Object.assign({}, defaultQuery, props.query);

    migrate(this.query);

    this.state = {
      allMetrics: [],
      availableMetrics: [],
      groups: [],
      currentCategory: this.query.metricCategory,
    };

    this.filterMetricsOnType = this.filterMetricsOnType.bind(this);

    this.props.onChange(this.query);
  }

  onCategoryChange = (newCategory: SelectableValue) => {
    if (this.state.currentCategory === newCategory) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      this.query.metricCategory = newCategory;
      this.setState({ currentCategory: newCategory });
      this.query.timeInterval = this.props.datasource.getDefaultTimeInterval(this.query);

      this.onRunQuery();
    }
  };

  onRunQuery = () => {
    this.props.onChange(this.query);
    this.props.onRunQuery();
  };

  setMetricPlaceholder(nrOfTotalResults: number) {
    this.query.metric = {
      key: null,
      label: 'Please select (' + nrOfTotalResults + ')',
    };

    this.props.onChange(this.query);
  }

  updateMetrics = (metrics: SelectableValue[]) => {
    this.setState({
      availableMetrics: _.sortBy(metrics, 'key'),
      allMetrics: _.sortBy(metrics, 'key'),
    });

    if ((this.query.metric && this.query.metric.key) || this.query.showAllMetrics) {
      const metric = _.find(metrics, (m) => m.key === this.query.metric.key);
      metric ? (this.query.metric = metric) : (this.query.metric = { key: null });
    }

    if (!this.query.metric || !this.query.metric.key) {
      this.setMetricPlaceholder(metrics.length);
    }

    this.onRunQuery();
  };

  updateGroups = (groups: SelectableValue[]) => {
    this.setState({
      groups: groups,
    });
  };

  onFilterChange = (customFilters: string[]) => {
    let newAvailableMetrics: SelectableValue[] = [];
    if (!customFilters || customFilters.length === 0) {
      // don't do any filtering if no custom filters are set.
      newAvailableMetrics = this.state.allMetrics;
      this.query.showAllMetrics = false;
      this.query.customFilters = customFilters;
    } else {
      newAvailableMetrics = this.applyFilterToMetricList(customFilters);
      this.query.customFilters = customFilters;
      !this.query.canShowAllMetrics ? (this.query.showAllMetrics = false) : (this.query.allMetrics = this.state.availableMetrics);
    }

    this.setState((state) => ({ ...state, availableMetrics: newAvailableMetrics }));
    if (!this.query.metric.key) {
      this.setMetricPlaceholder(newAvailableMetrics.length);
    }

    this.query.canShowAllMetrics = this.isAbleToShowAllMetrics();
    this.props.onChange(this.query);
    this.checkMetricAndRefresh();
  };

  applyFilterToMetricList(filters: string[]) {
    let filteredMetrics: any = this.state.allMetrics;
    _.forEach(filters, (filter) => {
      if (filter !== '') {
        filteredMetrics = _.sortBy(
          _.filter(filteredMetrics, (metric) => metric.key.toLowerCase().includes(filter.toLowerCase())),
          'key'
        );
      }
    });

    return filteredMetrics;
  }

  filterMetricsOnType(type: string) {
    let filteredMetrics: SelectableValue[] = this.state.allMetrics.filter((metric) => {
      return metric.beaconTypes.includes(type);
    });

    this.setState({
      availableMetrics: filteredMetrics,
    });

    if (!this.query.metric || !this.query.metric.key || !this.query.metric.beaconTypes.includes(type)) {
      this.setMetricPlaceholder(filteredMetrics.length);
    }

    this.onRunQuery();
  }

  isAbleToShowAllMetrics() {
    return this.query.metricCategory.key === CUSTOM_METRICS && this.state.availableMetrics.length > 0 && this.state.availableMetrics.length <= 5;
  }

  checkMetricAndRefresh() {
    if (
      this.query.metric &&
      this.query.metric.key &&
      !_.includes(
        _.map(this.state.availableMetrics, (m) => m.key),
        this.query.metric.key
      )
    ) {
      this.resetMetricSelection();
    }

    this.onRunQuery();
  }

  render() {
    const { query, onRunQuery, onCategoryChange } = this;
    return (
      <div>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'Category'}
          tooltip={'Select a metric category.'}
          value={query.metricCategory}
          options={MetricCategories}
          onChange={onCategoryChange}
        />

        {query.metricCategory.key === BUILT_IN_METRICS && (
          <InfrastructureBuiltIn
            query={query}
            onRunQuery={onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === CUSTOM_METRICS && (
          <InfrastructureCustom
            query={query}
            onRunQuery={onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === ANALYZE_APPLICATION_METRICS && (
          <ApplicationCallsMetrics
            query={query}
            onRunQuery={onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            groups={this.state.groups}
            updateGroups={this.updateGroups}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === ANALYZE_WEBSITE_METRICS && (
          <WebsiteMetrics
            query={query}
            onRunQuery={onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            groups={this.state.groups}
            updateGroups={this.updateGroups}
            filterMetricsOnType={this.filterMetricsOnType}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === APPLICATION_SERVICE_ENDPOINT_METRICS && (
          <ApplicationServiceEndpointMetrics
            query={query}
            onRunQuery={onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === SLO_INFORMATION && (
          <SloInformation query={query} onRunQuery={onRunQuery} onChange={this.props.onChange} datasource={this.props.datasource} />
        )}

        {query.metricCategory.key !== SLO_INFORMATION && (
          <Metric
            query={query}
            onChange={this.props.onChange}
            onRunQuery={onRunQuery}
            updateMetrics={this.updateMetrics}
            availableMetrics={this.state.availableMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === CUSTOM_METRICS && (
          <MetricFilter
            query={query}
            onChange={this.props.onChange}
            onRunQuery={onRunQuery}
            onFilterChange={this.onFilterChange}
            availableMetrics={this.state.availableMetrics}
            datasource={this.props.datasource}
          />
        )}

        {(query.metricCategory.key === ANALYZE_APPLICATION_METRICS || query.metricCategory.key === ANALYZE_WEBSITE_METRICS) && (
          <Filters
            query={query}
            onChange={this.props.onChange}
            onRunQuery={onRunQuery}
            datasource={this.props.datasource}
            groups={this.state.groups}
          />
        )}

        <AdvancedSettings query={query} onRunQuery={onRunQuery} onChange={this.props.onChange} />
      </div>
    );
  }

  selectionReset() {
    const { query } = this.props;
    if (query.metricCategory.key > CUSTOM_METRICS) {
      query.entityQuery = '';
    }

    this.setState({
      availableMetrics: [],
      allMetrics: [],
      groups: [],
    });

    this.resetEntityTypeSelection();
    this.resetEntitySelection();
    this.resetMetricSelection();
  }

  resetEntityTypeSelection() {
    const { query } = this.props;
    query.entityType = {
      key: null,
      label: '-',
    };
    query.customFilters = [];
  }

  resetEntitySelection() {
    const { query } = this.props;
    query.entity = {};
    query.group = {};
    query.showGroupBySecondLevel = false;
    query.groupbyTagSecondLevelKey = '';
    query.aggregateGraphs = false;
    query.aggregationFunction = AggregationFunctions[0];
    query.hideOriginalGraphs = false;
    query.filters = [];
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.canShowAllMetrics = false;
    query.displayMaxMetricValue = false;
    query.applicationCallToEntity = {};
    query.callToEntity = {};
    this.resetServices();
    this.resetEndpoints();
    this.resetSLO();
  }

  resetMetricSelection() {
    const { query } = this.props;
    query.metric = {};
    query.timeShift = '';
    query.timeShiftIsValid = true;
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.labelFormat = '';
    query.freeTextMetrics = '';
    query.useFreeTextMetrics = false;
  }

  resetServices() {
    this.props.query.service = {};
  }

  resetEndpoints() {
    this.props.query.endpoint = {};
  }

  resetSLO() {
    const { query } = this.props;
    query.sloValue = '';
    query.sloReport = {};
  }
}
