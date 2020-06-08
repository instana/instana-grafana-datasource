import React, { PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import AdvancedSettings from './AdvancedSettings/AdvancedSettings';
import { FormLabel, Select } from '@grafana/ui';
import MetricCategories from '../lists/metric_categories';
import { SloInformation } from './SLOInformation/SloInformation';
import { InfrastructureBuiltIn } from './Infrastructure/BuiltIn/InfrastructureBuiltIn';
import _ from 'lodash';
import Metric from './Metric';
import { MetricFilter } from './Infrastructure/Custom/MetricFilter';
import { CUSTOM_METRICS } from '../GlobalVariables';
import { InfrastructureCustom } from './Infrastructure/Custom/InfrastructureCustom';
import AggregationFunctions from '../lists/aggregation_function';
import { WebsiteMetrics } from './WebsiteMetrics/WebsiteMetrics';
import { ApplicationServiceEndpointMetrics } from './ApplicationServiceEndpointMetrics/ApplicationServiceEndpointMetrics';
import migrate from '../migration';
import { Filters } from './Filter';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  allMetrics: SelectableValue<string>[];
  availableMetrics: SelectableValue<string>[];
  groups: SelectableValue<string>[];
  currentCategory: SelectableValue<string>;
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = {
      metricCategory: MetricCategories[0],
      customFilters: []
    };

    this.query = Object.assign({}, defaultQuery, props.query);

    migrate(this.query);

    this.state = {
      allMetrics: [],
      availableMetrics: [],
      groups: [],
      currentCategory: this.query.metricCategory
    };

    this.filterMetricsOnType = this.filterMetricsOnType.bind(this);

    //TODO query.pluginId = this.props.panelCtrl.panel.type || this.panelCtrl.pluginId;
    this.props.onChange(this.query);
  }

  onCategoryChange = (newCategory: SelectableValue<string>) => {
    if (this.state.currentCategory === newCategory) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      this.query.metricCategory = newCategory;
      this.setState({currentCategory: newCategory})
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
      label: 'Please select (' + nrOfTotalResults + ')'
    }

    this.props.onChange(this.query);
  }

  updateMetrics = (metrics: SelectableValue<string>[]) => {
    this.setState({
      availableMetrics: _.sortBy(metrics, 'key'),
      allMetrics: _.sortBy(metrics, 'key')
    });

    if ((this.query.metric && this.query.metric.key) || this.query.showAllMetrics) {
      const metric = _.find(metrics, m => m.key === this.query.metric.key);
      metric ? this.query.metric = metric : this.query.metric = { key: null };
    }

    if (!this.query.metric || !this.query.metric.key) {
      this.setMetricPlaceholder(metrics.length);
    }

    this.props.onChange(this.query);
    this.onRunQuery();
  };

  updateGroups = (groups: SelectableValue[]) => {
    this.setState({
      groups: groups
    });
  }

  onFilterChange = (customFilters: string[]) => {
    if (!customFilters || customFilters.length === 0) {
      // don't do any filtering if no custom filters are set.
      this.setState({ availableMetrics: this.state.allMetrics });
      this.query.showAllMetrics = false;
      this.query.customFilters = customFilters;
    } else {
      let filteredMetrics = this.applyFilterToMetricList(customFilters);
      this.setState({ availableMetrics: filteredMetrics });
      this.query.customFilters = customFilters;
      !this.query.canShowAllMetrics ? this.query.showAllMetrics = false : this.query.allMetrics = this.state.availableMetrics;
    }

    this.query.canShowAllMetrics = this.isAbleToShowAllMetrics();
    this.props.onChange(this.query);
    this.checkMetricAndRefresh(true);
  };

  applyFilterToMetricList(filters: string[]) {
    let filteredMetrics: any = this.state.allMetrics;
    _.forEach(filters, filter => {
      if (filter !== '') {
        filteredMetrics =
          _.sortBy(
            _.filter(
              filteredMetrics,
              metric => metric.key.toLowerCase().includes(filter.toLowerCase())),
            'key');
      }
    });

    return filteredMetrics;
  }

  filterMetricsOnType(type: string) {
    let filteredMetrics: SelectableValue<string>[] = this.state.allMetrics.filter(metric => {
      return metric.beaconTypes.includes(type);
    });

    this.setState({
      availableMetrics: filteredMetrics
    });

    if (!this.query.metric || !this.query.metric.key || !this.query.metric.beaconTypes.includes(type)) {
      this.setMetricPlaceholder(filteredMetrics.length);
    }

    this.onRunQuery();
  }

  isAbleToShowAllMetrics() {
    return this.query.metricCategory.key === CUSTOM_METRICS
      && this.state.availableMetrics.length > 0
      && this.state.availableMetrics.length <= 5;
  }

  checkMetricAndRefresh(refresh: boolean) {
    if (this.query.metric && !_.includes(_.map(this.state.availableMetrics, m => m.key), this.query.metric.key)) {
      this.resetMetricSelection();
    }

    if (!this.query.metric.key) {
      this.setMetricPlaceholder(this.state.availableMetrics.length);
    }

    this.props.onChange(this.query);

    if (refresh) {
      this.onRunQuery();
    }
  }

  render() {
    const { query, onRunQuery, onCategoryChange } = this;
    return (
      <div>
        <div className={'gf-form'}>
          <FormLabel width={14} tooltip={'Select a metric category.'}>Category</FormLabel>
          <Select
            width={30}
            isSearchable={false}
            options={MetricCategories}
            onChange={onCategoryChange}
            value={query.metricCategory}
          />
        </div>

        {query.metricCategory.key === 0 &&
        <InfrastructureBuiltIn
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          updateMetrics={this.updateMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 1 &&
        <InfrastructureCustom
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          updateMetrics={this.updateMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 3 &&
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
        }

        {query.metricCategory.key === 4 &&
        <ApplicationServiceEndpointMetrics
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          updateMetrics={this.updateMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 7 &&
        <SloInformation
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          datasource={this.props.datasource}/>
        }

        {query.metricCategory.key !== 7 &&
        <Metric
          query={query}
          onChange={this.props.onChange}
          onRunQuery={onRunQuery}
          updateMetrics={this.updateMetrics}
          availableMetrics={this.state.availableMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 1 &&
        <MetricFilter
          query={query}
          onChange={this.props.onChange}
          onRunQuery={onRunQuery}
          onFilterChange={this.onFilterChange}
          availableMetrics={this.state.availableMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 3 &&
        <Filters
          query={query}
          onChange={this.props.onChange}
          onRunQuery={onRunQuery}
          datasource={this.props.datasource}
          groups={this.state.groups}
        />
        }

        <AdvancedSettings
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  selectionReset() {
    const { query } = this.props;
    if (query.metricCategory.key > 1) {
      query.entityQuery = '';
    }
    //this.uniqueEntityTypes = [];

    this.setState({
      availableMetrics: [],
      allMetrics: [],
      groups: []
    });

    //this.uniqueEntities = [];
    //this.uniqueTags = [];
    this.resetEntityTypeSelection();
    this.resetEntitySelection();
    this.resetMetricSelection();
  }

  resetEntityTypeSelection() {
    const { query } = this.props;
    query.entityType = {
      key: null,
      label: '-'
    };
    query.customFilters = [];
    //this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntitySelection() {
    const { query } = this.props;
    query.entity = { };
    query.group = { };
    query.showGroupBySecondLevel = false;
    query.groupbyTagSecondLevelKey = '';
    query.aggregateGraphs = false;
    query.aggregationFunction = AggregationFunctions[0];
    query.hideOriginalGraphs = false;
    //query.filters = [];
    //query.serviceNamefilter = null;
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.canShowAllMetrics = false;
    query.displayMaxMetricValue = false;
    //this.serviceEndpointSelectionText = this.EMPTY_DROPDOWN_TEXT;
    //query.applicationCallToEntity = null;
    //query.callToEntity = null;
    this.resetServices();
    this.resetEndpoints();
    this.resetSLO();
  }

  resetMetricSelection() {
    const { query } = this.props;
    query.metric = { };
    query.filter = '';
    query.timeShift = '';
    query.timeShiftIsValid = true;
    query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.labelFormat = '';
    //this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
    query.freeTextMetrics = '';
    query.useFreeTextMetrics = false;
  }

  resetServices() {
    this.props.query.service = { };
  }

  resetEndpoints() {
    this.props.query.endpoint = { };
  }

  resetSLO() {
    const { query } = this.props;
    query.sloValue = '';
    query.sloReport = { };
  }

}
