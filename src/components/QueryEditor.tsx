import '../instana-grafana.css';

import {
  ANALYZE_APPLICATION_METRICS,
  ANALYZE_MOBILE_APP_METRICS,
  ANALYZE_WEBSITE_METRICS,
  APPLICATION_SERVICE_ENDPOINT_METRICS,
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  INFRASTRUCTURE_ANALYZE,
  SLO_INFORMATION,
} from '../GlobalVariables';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import React, { PureComponent } from 'react';

import AdvancedSettings from './AdvancedSettings/AdvancedSettings';
import AggregationFunctions from '../lists/aggregation_function';
import { ApplicationCallsMetrics } from './Analyze/ApplicationCallsMetrics';
import { ApplicationServiceEndpointMetrics } from './ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics';
import { Badge } from '@grafana/ui';
import { DataSource } from '../datasources/DataSource';
import { Explore } from './Infrastructure/Explore';
import { Filters } from './Analyze/Filter';
import FormSelect from './FormField/FormSelect';
import { Infrastructure } from './Infrastructure/Infrastructure';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import Metric from './Metric/Metric';
import { MetricFilter } from './Infrastructure/Custom/MetricFilter';
import { MobileAppMetrics } from './Analyze/MobileAppMetrics';
import { SloInformation } from './SLOInformation/SloInformation';
import { WebsiteMetrics } from './Analyze/WebsiteMetrics';
import _ from 'lodash';
import metricCategories from '../lists/metric_categories';
import migrate from '../migration';
import { readTime } from '../util/time_util';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  groups: SelectableValue[];
  queryTypes: SelectableValue[];
  allMetrics: SelectableValue[];
  availableMetrics: SelectableValue[];
  selectedWindowSize: number;
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;
  snapshots: any;
  allowInfraExplore: boolean;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = {
      metricCategory: metricCategories[0],
      timeShiftIsValid: true,
      customFilters: [],
    };

    this.query = Object.assign(defaultQuery, props.query);

    migrate(this.query);

    this.state = {
      groups: [],
      allMetrics: [],
      queryTypes: [],
      availableMetrics: [],
      selectedWindowSize: props.range ? readTime(props.range).windowSize : 21600000,
    };

    this.filterMetricsOnType = this.filterMetricsOnType.bind(this);
    this.loadEntityTypes = this.loadEntityTypes.bind(this);
    this.allowInfraExplore = props.datasource.options.allowInfraExplore;

    props.onChange(this.query);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<QueryState>, snapshot?: any) {
    const { onChange, range, datasource } = this.props;
    if (range && this.state.selectedWindowSize !== readTime(range).windowSize) {
      this.setState({
        ...this.state,
        selectedWindowSize: readTime(range).windowSize,
      });
      datasource.setPossibleTimeIntervals(this.query);
      if (!datasource.availableTimeIntervals.find((i) => i.key === this.query.timeInterval.key)) {
        this.query.timeInterval = datasource.getDefaultTimeInterval(this.query);
        onChange(this.query);
        // no need to execute onRunQuery() here because the change of time frame triggers
        // datasource.query() anyways and datasource will take care of correcting the timeInterval
      }
    }
  }

  onCategoryChange = (newCategory: SelectableValue) => {
    if (this.query.metricCategory === newCategory) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      this.query.metricCategory = newCategory;
      this.query.timeInterval = this.props.datasource.getDefaultTimeInterval(this.query);

      this.changeAndRun();
    }
  };

  changeAndRun = () => {
    this.props.onChange(this.query);
    this.props.onRunQuery();
  };

  setMetricPlaceholder(nrOfTotalResults: number) {
    if (this.query.metricCategory.key === CUSTOM_METRICS) {
      this.query.metric = {
        key: null,
        label: 'Please select (' + nrOfTotalResults + '/' + this.state.allMetrics.length + ')',
      };
    } else {
      this.query.metric = {
        key: null,
        label: 'Please select (' + nrOfTotalResults + ')',
      };
    }

    this.props.onChange(this.query);
  }

  updateMetrics = (metrics: SelectableValue[]) => {
    this.setState(
      {
        availableMetrics: _.sortBy(metrics, 'key'),
        allMetrics: _.sortBy(metrics, 'key'),
      },
      () => {
        if ((this.query.metric && this.query.metric.key) || this.query.showAllMetrics) {
          const metric = _.find(metrics, (m) => m.key === this.query.metric.key);
          metric ? (this.query.metric = metric) : (this.query.metric = { key: null });
        }
        if (this.query.metricCategory.key === CUSTOM_METRICS) {
          this.onMetricsFilter(this.query.customFilters); // this contains setMetricPlaceholder
        } else if (!this.query.metric || !this.query.metric.key) {
          this.setMetricPlaceholder(metrics.length);
        }
        this.changeAndRun();
      }
    );
  };

  loadEntityTypes(filterResult = true) {
    const { query, datasource, onRunQuery } = this.props;

    if (query.entityQuery) {
      datasource.fetchTypesForTarget(query).then((response: any) => {
        this.snapshots = response.data;
        this.filterForEntityType(true, filterResult);
        onRunQuery();
      });
    } else {
      this.setState({ queryTypes: [] });
    }
  }

  filterForEntityType = (findMatchingEntityTypes = true, filterResults = true) => {
    const { query, datasource, onChange } = this.props;
    datasource.getEntityTypes().then((entityTypes: any) => {
      let queryTypes = entityTypes;
      if (filterResults && !query.useFreeTextMetrics) {
        queryTypes = this.filterEntityTypes(entityTypes, findMatchingEntityTypes);
      }

      this.setState({ queryTypes: queryTypes });

      if (!query.entityType || !query.entityType.key || !_.find(queryTypes, (m) => m.key === query.entityType.key)) {
        query.entityType = { key: null, label: 'Please select (' + queryTypes.length + ')' };
      }

      onChange(query);
    });
  };

  filterEntityTypes = (entityTypes: SelectableValue[], findMatchingEntityTypes: boolean) => {
    if (findMatchingEntityTypes) {
      return _.sortBy(
        _.filter(entityTypes, (entityType) => this.findMatchingEntityTypes(entityType)),
        'label'
      );
    }

    return _.sortBy(entityTypes, 'label');
  };

  findMatchingEntityTypes = (entityType: SelectableValue) => {
    const { query } = this.props;

    if (query.metricCategory.key === BUILT_IN_METRICS || query.metricCategory.key === CUSTOM_METRICS) {
      return this.snapshots.find((type: any) => type === entityType.key) && entityType.label != null;
    }

    return false;
  };

  updateQueryTypes = (types: SelectableValue[]) => {
    this.setState({
      queryTypes: types,
    });
  };

  updateGroups = (groups: SelectableValue[]) => {
    this.setState({
      groups: groups,
    });
  };

  onMetricsFilter = (customFilters: string[]) => {
    let newAvailableMetrics: SelectableValue[] = [];
    if (!customFilters || customFilters.length === 0) {
      newAvailableMetrics = this.state.allMetrics;
    } else {
      newAvailableMetrics = this.applyFilterToMetricList(customFilters);
    }
    this.query.canShowAllMetrics = this.isAbleToShowAllMetrics(newAvailableMetrics);
    if (!this.query.canShowAllMetrics) {
      this.query.showAllMetrics = false;
    }
    this.query.customFilters = customFilters;
    if (!this.query.metric || !this.query.metric.key) {
      this.setMetricPlaceholder(newAvailableMetrics.length);
    }

    this.setState((state) => ({ ...state, availableMetrics: newAvailableMetrics }));

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

    this.changeAndRun();
  }

  isAbleToShowAllMetrics(metrics: SelectableValue[]) {
    return this.query.metricCategory.key === CUSTOM_METRICS && metrics.length > 0 && metrics.length <= 5;
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

    this.changeAndRun();
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
    query.applicationCallToEntity = '';
    query.callToEntity = '';
    query.tagFilterExpression = '';
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

  render() {
    const { query, onCategoryChange } = this;
    const categories = this.allowInfraExplore
      ? metricCategories
      : metricCategories.filter((category) => category.key !== INFRASTRUCTURE_ANALYZE);

    return (
      <div className={'gf-form-group'}>
        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Category'}
            tooltip={'Select a metric category.'}
            value={query.metricCategory}
            options={categories}
            onChange={onCategoryChange}
          />
        </div>

        {query.metricCategory.key === BUILT_IN_METRICS && (
          <Infrastructure
            query={query}
            queryTypes={this.state.queryTypes}
            datasource={this.props.datasource}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            loadEntityTypes={this.loadEntityTypes}
            updateQueryTypes={this.updateQueryTypes}
          />
        )}

        {query.metricCategory.key === CUSTOM_METRICS && (
          <Infrastructure
            query={query}
            queryTypes={this.state.queryTypes}
            datasource={this.props.datasource}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            loadEntityTypes={this.loadEntityTypes}
            updateQueryTypes={this.updateQueryTypes}
          />
        )}

        {query.metricCategory.key === INFRASTRUCTURE_ANALYZE && (
          <Explore
            query={query}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            groups={this.state.groups}
            updateGroups={this.updateGroups}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === ANALYZE_APPLICATION_METRICS && (
          <ApplicationCallsMetrics
            query={query}
            onRunQuery={this.props.onRunQuery}
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
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            groups={this.state.groups}
            updateGroups={this.updateGroups}
            filterMetricsOnType={this.filterMetricsOnType}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS && (
          <MobileAppMetrics
            query={query}
            onRunQuery={this.props.onRunQuery}
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
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === SLO_INFORMATION && (
          <SloInformation
            query={query}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key !== SLO_INFORMATION && (
          <Metric
            query={query}
            onChange={this.props.onChange}
            onRunQuery={this.props.onRunQuery}
            updateMetrics={this.updateMetrics}
            availableMetrics={this.state.availableMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === CUSTOM_METRICS && (
          <MetricFilter
            query={query}
            onChange={this.props.onChange}
            onRunQuery={this.props.onRunQuery}
            onFilterChange={this.onMetricsFilter}
            availableMetrics={this.state.availableMetrics}
            datasource={this.props.datasource}
          />
        )}

        {(query.metricCategory.key === ANALYZE_APPLICATION_METRICS ||
          query.metricCategory.key === ANALYZE_WEBSITE_METRICS ||
          query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS ||
          query.metricCategory.key === INFRASTRUCTURE_ANALYZE) && (
          <Filters
            query={query}
            onChange={this.props.onChange}
            onRunQuery={this.props.onRunQuery}
            datasource={this.props.datasource}
            groups={this.state.groups}
          />
        )}

        <AdvancedSettings
          query={query}
          onRunQuery={this.props.onRunQuery}
          onChange={this.props.onChange}
          loadEntityTypes={this.loadEntityTypes}
        />

        <Badge text={'4.0.2'} color={'blue'} />
      </div>
    );
  }
}
