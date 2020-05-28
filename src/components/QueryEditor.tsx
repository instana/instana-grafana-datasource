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

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  allMetrics: SelectableValue<string>[];
  availableMetrics: SelectableValue<string>[];
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
    this.state = {
      allMetrics: [],
      availableMetrics: [],
      currentCategory: this.query.metricCategory
    };

    this.props.onChange(this.query);
  }

  onCategoryChange = (newCategory: SelectableValue<string>) => {
    if (this.state.currentCategory === newCategory) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      this.query.metricCategory = newCategory;
      this.setState({currentCategory: newCategory});
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

    if (this.query.metric || this.query.showAllMetrics) {
      const metric = _.find(this.state.availableMetrics, m => m.key === this.query.metric.key);
      metric ? this.query.metric = metrics : this.query.metric = { key: null };
    }

    if (!this.query.metric || !this.query.metric.key) {
      this.setMetricPlaceholder(metrics.length);
    }

    this.props.onChange(this.query);
    this.onRunQuery();
  };

  onFilterChange = (customFilters: string[]) => {
    if (!customFilters || customFilters.length === 0) {
      // don't do any filtering if no custom filters are set.
      this.setState({ availableMetrics: this.state.allMetrics });
      this.query.showAllMetrics = false;
      this.query.customFilters = customFilters;
    } else {
      let filteredMetrics = this.applyFilterToMetricList(customFilters);
      console.log(filteredMetrics);
      this.setState({ availableMetrics: filteredMetrics });
      console.log(this.state.availableMetrics);
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
      console.log(this.state.availableMetrics);
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
      allMetrics: []
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
    //query.entity = null;
    //query.group = null;
    //query.showGroupBySecondLevel = null;
    //query.groupbyTagSecondLevelKey = null;
    query.aggregateGraphs = false;
    query.aggregationFunction = AggregationFunctions[0];
    //query.filters = [];
    //query.serviceNamefilter = null;
    //query.showWarningCantShowAllResults = false;
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
    query.metric = { key: null, label: '-' };
    query.filter = '';
    query.timeShift = '';
    query.timeShiftIsValid = true;
    //query.showWarningCantShowAllResults = false;
    query.showAllMetrics = false;
    query.labelFormat = '';
    //this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
    query.freeTextMetrics = '';
    query.useFreeTextMetrics = false;
  }

  resetServices() {
    //const { query } = this.props;
    //query.service = null;
    //this.uniqueServices = [];
  }

  resetEndpoints() {
    //const { query } = this.props;
    //query.endpoint = null;
    //this.uniqueEndpoints = [];
  }

  resetSLO() {
    const { query } = this.props;
    query.sloValue = '';
    query.sloReport = {
      key: null
    };
  }

}
