# Instana Data Source

This is a Grafana datasource for showing metrics from Instana AI-Powered APM for dynamic applications.

## Features

- Dynamic Focus queries
- Automatic completion for available types and metrics
- Utilises Instana REST API
- Security via access token

## Configuration

This datasource uses the Instana REST API to query the metric values. First of all you will need to generate an API [token](https://docs.instana.io/quick_start/api/). Use this token along with the URL for your Instana account e.g. *https://prod-acme.instana.io*

![datasource configuration](https://raw.githubusercontent.com/instana/instana-grafana-datasource/new-readme/screenshots/datasource-sml.png)

## Usage

### Query Editor

![empty query editor](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/empty-query-sml.png)

To start, enter the [Dynamic Focus](https://docs.instana.io/core_concepts/dynamic_focus/) query. This is exactly the same as used in the Instana dashboard; you can test your queries in Instana and then copy and paste them into Grafana. *NOTE* Saved filters are not currently supported by the Grafana datasource plugin.

Once you filled in the query the available types dropdown will be automatically populated, select the type you want.

As you select the type, the available metrics dropdown will be automatically populated, select the metric you want.

If your Dynamic Focus query matches multiple instances then, the returned dataset will include metrics from all those matching instances; providing graphs with multiple plots like the example below.

![multiple plot graph](https://raw.githubusercontent.com/instana/instana-grafana-datasource/master/screenshots/complete-query-sml.png)
