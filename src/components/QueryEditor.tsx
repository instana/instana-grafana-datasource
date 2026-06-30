import { injectGlobal } from '@emotion/css';

import {
  ANALYZE_APPLICATION_METRICS,
  ANALYZE_MOBILE_APP_METRICS,
  ANALYZE_WEBSITE_METRICS,
  APPLICATION_SERVICE_ENDPOINT_METRICS,
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  INFRASTRUCTURE_ANALYZE,
  SLO_INFORMATION,
  SLO2_INFORMATION,
  SYNTHETIC_MONITORING,
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
import { Slo2Information } from './SLOInformation/Slo2Information';
import { WebsiteMetrics } from './Analyze/WebsiteMetrics';
import { SyntheticMonitoring } from './SyntheticMonitoring/SyntheticMonitoring';
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
  lastInterpolatedQuery: string;
  lastInterpolatedEntityType: string;
  lastInterpolatedEntity: string;
  lastInterpolatedMetric: string;
  lastInterpolatedGroup: string;
  lastInterpolatedMobileAppType: string;
  lastInterpolatedWebsiteType: string;
}

// Inject global CSS to hide specific SVG path (from instana-grafana.css)
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
injectGlobal`
  path[d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"] {
    display: none;
  }
`;

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

    const metricKey = this.query.metric?.key || this.query.metric?.value;
    const initialMetric = metricKey && metricKey.includes('$') ? props.datasource.templateSrv.replace(metricKey) : '';

    const groupKey = this.query.group?.key || this.query.group?.value;
    const initialGroup = groupKey && groupKey.includes('$') ? props.datasource.templateSrv.replace(groupKey) : '';

    this.state = {
      groups: [],
      allMetrics: [],
      queryTypes: [],
      availableMetrics: [],
      selectedWindowSize: props.range ? readTime(props.range).windowSize : 21600000,
      lastInterpolatedQuery: '',
      lastInterpolatedEntityType: '',
      lastInterpolatedEntity: '',
      lastInterpolatedMetric: initialMetric,
      lastInterpolatedGroup: initialGroup,
      lastInterpolatedMobileAppType: '',
      lastInterpolatedWebsiteType: '',
    };

    this.filterMetricsOnType = this.filterMetricsOnType.bind(this);
    this.allowInfraExplore = props.datasource.options.allowInfraExplore;

    props.onChange(this.query);
  }

  componentDidMount() {
    const { datasource } = this.props;

    if (this.query.metricCategory.key === INFRASTRUCTURE_ANALYZE) {
      const entityKey = this.query.entity?.key || this.query.entity?.value;
      if (entityKey) {
        datasource
          .fetchMetricsForEntityType(this.query)
          .then((results: any) => {
            this.updateMetrics(results);
          })
          .catch((error: any) => {
            console.error('[QueryEditor] Failed to hydrate Infra Analyze metrics on mount', error);
          });
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<QueryState>, snapshot?: any) {
    const { onChange, range, datasource, onRunQuery } = this.props;

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

    // Handle dashboard variable changes for entityType in Built-in/Custom metrics
    if (
      this.query.entityType?.label &&
      this.query.entityType.label.includes('$') &&
      (this.query.metricCategory.key === 0 || this.query.metricCategory.key === 1)
    ) {
      const currentInterpolatedType = datasource.templateSrv.replace(this.query.entityType.label);

      if (currentInterpolatedType !== this.state.lastInterpolatedEntityType && currentInterpolatedType) {
        this.setState({
          ...this.state,
          lastInterpolatedEntityType: currentInterpolatedType,
        });

        const interpolatedQuery = datasource.interpolateVariables(this.query);

        datasource.dataSourceInfrastructure
          .getMetricsCatalog(interpolatedQuery.entityType, this.query.metricCategory.key)
          .then((results) => {
            this.updateMetrics(results);
          });
      }
    }
    // Handle dashboard variable changes for entity in Infrastructure Analyze
    const entityKey = this.query.entity?.key || this.query.entity?.value;
    if (entityKey && entityKey.includes('$') && this.query.metricCategory.key === INFRASTRUCTURE_ANALYZE) {
      const currentInterpolatedEntity = datasource.templateSrv.replace(entityKey);

      if (currentInterpolatedEntity !== this.state.lastInterpolatedEntity && currentInterpolatedEntity) {
        this.setState({
          ...this.state,
          lastInterpolatedEntity: currentInterpolatedEntity,
        });

        if (this.query.entity?.value && !this.query.entity?.key) {
          this.query.entity.key = this.query.entity.value;
        }

        const interpolatedQuery = datasource.interpolateVariables(this.query);

        datasource.fetchMetricsForEntityType(interpolatedQuery).then((results) => {
          this.updateMetrics(results);
        });
      }
    }

    // Handle dashboard variable changes for entity in Website Analyze
    const websiteEntityKey = this.query.entity?.key || this.query.entity?.value;
    if (
      websiteEntityKey &&
      websiteEntityKey.includes('$') &&
      this.query.metricCategory.key === ANALYZE_WEBSITE_METRICS
    ) {
      const currentInterpolatedEntity = datasource.templateSrv.replace(websiteEntityKey);

      if (currentInterpolatedEntity !== this.state.lastInterpolatedEntity && currentInterpolatedEntity) {
        this.setState({
          ...this.state,
          lastInterpolatedEntity: currentInterpolatedEntity,
        });

        onRunQuery();
      }
    }

    // Handle dashboard variable changes for entity in Mobile App Analyze
    const mobileAppEntityKey = this.query.entity?.key || this.query.entity?.value;
    if (
      mobileAppEntityKey &&
      mobileAppEntityKey.includes('$') &&
      this.query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS
    ) {
      const currentInterpolatedEntity = datasource.templateSrv.replace(mobileAppEntityKey);

      if (currentInterpolatedEntity !== this.state.lastInterpolatedEntity && currentInterpolatedEntity) {
        this.setState({
          ...this.state,
          lastInterpolatedEntity: currentInterpolatedEntity,
        });

        onRunQuery();
      }
    }
    // Handle dashboard variable changes for entityType (Type field) in Mobile App Analyze
    const mobileAppEntityTypeKey = this.query.entityType?.key || this.query.entityType?.value;
    if (
      mobileAppEntityTypeKey &&
      mobileAppEntityTypeKey.includes('$') &&
      this.query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS
    ) {
      const currentInterpolatedType = datasource.templateSrv.replace(mobileAppEntityTypeKey);

      if (currentInterpolatedType !== this.state.lastInterpolatedMobileAppType && currentInterpolatedType) {
        this.setState({
          ...this.state,
          lastInterpolatedMobileAppType: currentInterpolatedType,
        });

        const interpolatedQuery = datasource.interpolateVariables(this.query);

        datasource.dataSourceMobileapp.getMobileappMetricsCatalog().then((allMetrics: any) => {
          const filteredMetrics = allMetrics.filter(
            (metric: any) => metric.beaconTypes && metric.beaconTypes.includes(interpolatedQuery.entityType.key)
          );
          this.updateMetrics(filteredMetrics.length > 0 ? filteredMetrics : allMetrics);
          onRunQuery();
        });
      }
    }

    // Handle dashboard variable changes for entityType (Type field) in Website Analyze
    const websiteEntityTypeKey = this.query.entityType?.key || this.query.entityType?.value;
    if (
      websiteEntityTypeKey &&
      websiteEntityTypeKey.includes('$') &&
      this.query.metricCategory.key === ANALYZE_WEBSITE_METRICS
    ) {
      const currentInterpolatedType = datasource.templateSrv.replace(websiteEntityTypeKey);

      if (currentInterpolatedType !== this.state.lastInterpolatedWebsiteType && currentInterpolatedType) {
        this.setState({
          ...this.state,
          lastInterpolatedWebsiteType: currentInterpolatedType,
        });

        const interpolatedQuery = datasource.interpolateVariables(this.query);

        datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then((allMetrics: any) => {
          const filteredMetrics = allMetrics.filter(
            (metric: any) => metric.beaconTypes && metric.beaconTypes.includes(interpolatedQuery.entityType.key)
          );
          this.updateMetrics(filteredMetrics.length > 0 ? filteredMetrics : allMetrics);
          onRunQuery();
        });
      }
    }
    // Handle dashboard variable changes for metric variable
    const metricKey = this.query.metric?.key || this.query.metric?.value;
    if (metricKey && metricKey.includes('$')) {
      const currentInterpolatedMetric = datasource.templateSrv.replace(metricKey);

      if (currentInterpolatedMetric !== this.state.lastInterpolatedMetric && currentInterpolatedMetric) {
        this.setState({
          ...this.state,
          lastInterpolatedMetric: currentInterpolatedMetric,
        });
        onRunQuery();
      }
    }

    // Handle dashboard variable changes for group (Group by) in Analyze categories
    const groupKey = this.query.group?.key || this.query.group?.value;
    if (
      groupKey &&
      groupKey.includes('$') &&
      (this.query.metricCategory.key === ANALYZE_APPLICATION_METRICS ||
        this.query.metricCategory.key === ANALYZE_WEBSITE_METRICS ||
        this.query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS)
    ) {
      const currentInterpolatedGroup = datasource.templateSrv.replace(groupKey);

      if (currentInterpolatedGroup !== this.state.lastInterpolatedGroup && currentInterpolatedGroup) {
        this.setState({
          ...this.state,
          lastInterpolatedGroup: currentInterpolatedGroup,
        });
        onRunQuery();
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

          if (metric) {
            this.query.metric = metric;
          } else if (this.query.metric.key && !this.query.metric.key.toString().startsWith('$')) {
            this.query.metric = { key: null };
          }
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

    const isVariable = this.query.metric?.key && this.query.metric.key.toString().startsWith('$');
    if ((!this.query.metric || !this.query.metric.key) && !isVariable) {
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
      const isVariable = this.query.metric.key.toString().startsWith('$');
      if (!isVariable) {
        this.resetMetricSelection();
      }
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
    this.resetSLO2();
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

  resetSLO2() {
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

        {query.metricCategory.key === SLO2_INFORMATION && (
          <Slo2Information
            query={query}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key === SYNTHETIC_MONITORING && (
          <SyntheticMonitoring
            query={query}
            onRunQuery={this.props.onRunQuery}
            onChange={this.props.onChange}
            updateMetrics={this.updateMetrics}
            datasource={this.props.datasource}
          />
        )}

        {query.metricCategory.key !== SLO_INFORMATION && query.metricCategory.key !== SLO2_INFORMATION && (
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

        <AdvancedSettings query={query} onRunQuery={this.props.onRunQuery} onChange={this.props.onChange} />

        <Badge text={'5.1.0'} color={'blue'} />
      </div>
    );
  }
}
