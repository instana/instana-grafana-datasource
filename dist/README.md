# Instana Data Source

This is a Grafana datasource for showing metrics from Instana AI-Powered APM for dynamic applications.

## Requirements

Attention: For On-premise customers Instana Release 146 is required.

## Features

- Dynamic Focus queries
- Automatic completion for available types and metrics
- Utilises Instana REST API
- Security via access token

## Configuration

This datasource uses the Instana REST API to query the metric values. First of all you will need to generate an API [token](https://docs.instana.io/quick_start/api/). Use this token along with the URL for your Instana account e.g. *https://prod-acme.instana.io*

![datasource configuration](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/datasource-sml.png)

## Usage

### Query Editor

![empty query editor](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/empty-query-sml.png)

To start, enter the [Dynamic Focus](https://docs.instana.io/core_concepts/dynamic_focus/) query. This is exactly the same as used in the Instana dashboard; you can test your queries in Instana and then copy and paste them into Grafana. *NOTE* Saved filters are not currently supported by the Grafana datasource plugin.

#### Infrastructure built-in metrics

Once you filled in the query the available types dropdown will be automatically populated, select the type you want.

As you select the type, the available metrics dropdown will be automatically populated, select the metric you want.

If your Dynamic Focus query matches multiple instances then, the returned dataset will include metrics from all those matching instances, providing graphs with multiple plots like the example below.

![multiple plot graph](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/complete-query-sml.png)

#### Infrastructure custom metrics

To choose custom metrics matching your query you need to select "Infrastructure custom metrics" from the category dropdown, which will automatically populate the available types dropdown.

As you select the type, the available metrics dropdown will be automatically populated, select the metric you want. As there might be a huge amount of custom metrics, you can specify an optional filter to reduce to a corresponding subset.

If your Dynamic Focus query matches, the returned dataset will include metrics providing graphs like the example below.

![custom plot graph](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/custom-metrics-sml.png)

#### Change legend format

To adjust the legend display you can provide an own "Legend format". Supported values for replacement are:
- $label - the entity label
- $host - the corresponding host
- $pid - the corresponding PID
- $metric - the displayed metric
- $type - the entity type
- $service - the service label (for endpoints only)
- $name - a label alternative

If no custom format is provided the default '_$label (on host $host)_' will be shown.

#### Website metrics

To choose EUM website metrics you need to select "Website metrics" from the category dropdown, which will populate all further available dropdown lists. While switching the most called website will be selected per default.

If multiple aggregation types are available the selected metric can be exactly defined with a specific aggregation type.

You can further more specify filters by adding them via "add Filter", if multiple filters are added they are connected via "AND".

If your selection matches, the returned dataset will include metrics providing graphs like the example below.

![website plot graph](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/website-metrics-sml.png)

A default label '_$name ($website) $metric_' will be shown.
