# Grafana Template Variables Support

The Instana datasource plugin provides comprehensive support for Grafana template variables, enabling you to create dynamic, reusable dashboards that can adapt to different contexts and user selections.

## Table of Contents

- [Overview](#overview)
- [Supported Variable Types](#supported-variable-types)
- [Quick Start](#quick-start)
  - [Configuring a Variable](#configuring-a-variable)
  - [Creating Your First Variable - Example](#creating-your-first-variable---example)
- [Variable Query Functions](#variable-query-functions)
  - [Applications](#applications)
  - [Services](#services)
  - [Endpoints](#endpoints)
  - [Infrastructure](#infrastructure)
  - [Websites](#websites)
  - [Mobile Apps](#mobile-apps)
  - [SLO Reports](#slo-reports)
  - [Synthetic Monitoring](#synthetic-monitoring)
- [Using Variables in Queries](#using-variables-in-queries)
  - [Variable Syntax](#variable-syntax)
  - [Example Query Configurations](#example-query-configurations)
- [Advanced Usage](#advanced-usage)
  - [Chained Variables](#chained-variables)
  - [Multi-Value Variables](#multi-value-variables)
- [Supported Fields](#supported-fields)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Overview

Template variables allow you to create interactive dashboards where users can select values from dropdowns to filter and customize the displayed data. The Instana datasource supports variables in all major query fields and provides specialized query functions to populate variable dropdowns with data from your Instana environment.

**Key Benefits:**
- Create reusable dashboards for different environments, applications, or services
- Enable users to interactively filter data without editing queries
- Reduce dashboard maintenance by using a single dashboard for multiple contexts
- Chain variables together for hierarchical filtering (e.g., Application → Service → Endpoint)

## Supported Variable Types

The Instana datasource currently supports the following variable types:

* **Query Variable** - Populate variable values from Instana data using query functions
* **Custom Variable** - Define static values manually
* **Datasource Variable** - Switch between multiple Instana datasource instances

## Quick Start

### Configuring a Variable

1. Navigate to **Dashboard Settings → Variables**.
2. Click **Add Variable**.
3. Select the **Variable Type**:
   * **Query** - For dynamic values from Instana
   * **Custom** - For static predefined values
   * **Datasource** - For datasource selection
4. Choose your **Instana Datasource** (for Query variables).
5. Enter a value in the **Query** field:
   * For **Query Variables**, use one of the supported query functions (see below).
   * For **Custom Variables**, enter the required custom values.
6. Configure any additional variable options as needed.
7. Click **Run Query** to validate the variable (for Query variables).
8. Save the dashboard.

> **Note:** Multi-value selection is currently not supported due to API limitations.

### Creating Your First Variable - Example

1. **Open Dashboard Settings**
   - Navigate to your dashboard
   - Click the gear icon (⚙️) in the top right
   - Select "Variables" from the left menu

2. **Add a New Variable**
   - Click "Add variable"
   - Configure the variable:
     - **Name**: `application` (used as `$application` in queries)
     - **Type**: Query
     - **Data source**: Select your Instana datasource
     - **Query**: `applications()`
   - Click "Run Query" to preview values
   - Click "Apply"

3. **Use the Variable in a Query**
   - Create or edit a panel
   - In the query editor, select your Instana datasource
   - In the "Application" dropdown, you can now manually type `$application`
   - The variable will be replaced with the selected value at query time

4. **Test It**
   - Save the dashboard
   - Use the dropdown at the top of the dashboard to select different applications
   - Watch your panels update automatically

## Variable Query Functions

The Instana datasource provides specialized query functions to populate variables with data from your monitoring environment. All functions are case-insensitive.

### Applications

#### `applications()`
Returns a list of all monitored applications.

**Example:**
```
applications()
```

**Returns:**
- All Application names and IDs

**Use Case:** Create a variable to filter dashboards by application.

---

#### `applicationTags()`
Returns a list of available application tags for grouping.

**Example:**
```
applicationTags()
```

**Returns:**
- Tag keys that can be used in the "Group by" field
- Common tags: `endpoint.name`, `service.name`, `call.type`, etc.

**Use Case:** Dynamically populate the Group by field in Analyze Application Calls queries.

---

#### `applicationMetrics()`
Returns a list of all available application metrics.

**Example:**
```
applicationMetrics()
```

**Returns:**
- Metric keys like `calls`, `latency`, `errors`, `erroneous_calls`
- Includes metric labels for display

**Use Case:** Allow users to select which application metric to display.

### Services

#### `services()`
Returns a list of all monitored services across all applications.

**Example:**
```
services()
```

**Returns:**
- All service names and IDs
- Services from all applications

**Use Case:** Create a service filter without application context.

---

#### `services($application)`
Returns services filtered by a specific application.

**Example:**
```
services($application)
```

**Parameters:**
- `$application`: Application ID or variable reference

**Returns:**
- Services that belong to the specified application
- Dynamically updates when the application variable changes

**Use Case:** Create chained variables where service selection depends on application selection.

### Endpoints

#### `endpoints()`
Returns a list of all monitored endpoints.

**Example:**
```
endpoints()
```

**Returns:**
- All endpoint names and IDs across all services

**Use Case:** Global endpoint filtering.

---

#### `endpoints($application)`
Returns endpoints filtered by application.

**Example:**
```
endpoints($application)
```

**Parameters:**
- `$application`: Application ID or variable reference

**Returns:**
- Endpoints within the specified application

---

#### `endpoints($application, $service)`
Returns endpoints filtered by both application and service.

**Example:**
```
endpoints($application, $service)
```

**Parameters:**
- `$application`: Application ID or variable reference
- `$service`: Service ID or variable reference

**Returns:**
- Endpoints within the specified application and service
- Most precise endpoint filtering

**Use Case:** Three-level hierarchical filtering (Application → Service → Endpoint).

### Infrastructure

#### `entityTypes()`
Returns a list of all infrastructure entity types.

**Example:**
```
entityTypes()
```

**Returns:**
- Entity types like `host`, `docker`, `kubernetes-pod`, `jvm`, etc.
- All available infrastructure entity types in your environment

**Use Case:** Allow users to select which infrastructure entity type to monitor.

---

#### `entities($entityType)`
Returns a list of infrastructure entities of a specific type.

**Example:**
```
entities(host)
entities($entityType)
```

**Parameters:**
- `$entityType`: Entity type key (e.g., `host`, `docker`, `jvm`) or variable reference

**Returns:**
- List of entity instances with their labels and IDs
- Entities matching the specified type

**Use Case:** Select specific infrastructure entities to monitor.

---

#### `metrics($entityType)`
Returns available metrics for a specific infrastructure entity type.

**Example:**
```
metrics(host)
metrics($entityType)
```

**Parameters:**
- `$entityType`: Entity type key or variable reference (required)

**Returns:**
- Built-in metrics available for the specified entity type
- Metric keys and labels

**Use Case:** Dynamically populate metric selection based on entity type.

### Websites

#### `websites()`
Returns a list of all monitored websites.

**Example:**
```
websites()
```

**Returns:**
- Website names and IDs
- Sorted by page loads

**Use Case:** Filter dashboards by website.

---

#### `websiteBeaconTypes()`
Returns available website beacon types.

**Example:**
```
websiteBeaconTypes()
```

**Returns:**
- `pageLoad` - Page Loads
- `resourceLoad` - Resources
- `httpRequest` - HTTP Requests
- `error` - Errors
- `pageChange` - Page Transitions

**Use Case:** Populate the Type field in Analyze Websites queries.

---

#### `websiteTags()`
Returns available website tags for grouping.

**Example:**
```
websiteTags()
```

**Returns:**
- Tag keys for website data grouping
- Common tags: `page.name`, `beacon.type`, `geo.country`, etc.

**Use Case:** Dynamically populate the Group by field.

---

#### `websiteMetrics()`
Returns all available website metrics.

**Example:**
```
websiteMetrics()
```

**Returns:**
- All website metrics across all beacon types

---

#### `websiteMetrics($beaconType)`
Returns website metrics filtered by beacon type.

**Example:**
```
websiteMetrics(pageLoad)
websiteMetrics($beaconType)
```

**Parameters:**
- `$beaconType`: Beacon type key or variable reference

**Returns:**
- Metrics applicable to the specified beacon type
- Filtered metric list

**Use Case:** Show only relevant metrics for the selected beacon type.

### Mobile Apps

#### `mobileApps()`
Returns a list of all monitored mobile applications.

**Example:**
```
mobileApps()
```

**Returns:**
- Mobile app names and IDs
- Sorted by session starts

**Use Case:** Filter dashboards by mobile application.

---

#### `mobileAppBeaconTypes()`
Returns available mobile app beacon types.

**Example:**
```
mobileAppBeaconTypes()
```

**Returns:**
- `session_start` - Session Starts
- `view_change` - View Transitions
- `crash` - Crashes
- `http_request` - HTTP Requests
- `custom` - Custom Events

**Use Case:** Populate the Type field in Analyze Mobile App queries.

---

#### `mobileAppTags()`
Returns available mobile app tags for grouping.

**Example:**
```
mobileAppTags()
```

**Returns:**
- Tag keys for mobile app data grouping
- Common tags: `view.name`, `app.version`, `device.model`, etc.

**Use Case:** Dynamically populate the Group by field.

---

#### `mobileAppMetrics()`
Returns all available mobile app metrics.

**Example:**
```
mobileAppMetrics()
```

**Returns:**
- All mobile app metrics across all beacon types

---

#### `mobileAppMetrics($beaconType)`
Returns mobile app metrics filtered by beacon type.

**Example:**
```
mobileAppMetrics(session_start)
mobileAppMetrics($beaconType)
```

**Parameters:**
- `$beaconType`: Beacon type key or variable reference

**Returns:**
- Metrics applicable to the specified beacon type

**Use Case:** Show only relevant metrics for the selected beacon type.

### SLO Reports

#### `sloReports()`
Returns a list of configured SLO reports (Service Level Objectives Widgets).

**Example:**
```
sloReports()
```

**Returns:**
- SLO report configurations
- Report names and IDs

**Use Case:** Allow users to select which SLO to monitor.

---

#### `slo2Reports()`
Returns a list of SLO2 configurations (Service Level Objectives Beta).

**Example:**
```
slo2Reports()
```

**Returns:**
- SLO2 configuration names and IDs
- Beta SLO reports

**Use Case:** Select from the new SLO API configurations.

### Synthetic Monitoring

#### `syntheticTests()`
Returns a list of all synthetic monitoring tests.

**Example:**
```
syntheticTests()
```

**Returns:**
- Synthetic test names and IDs
- All configured synthetic tests

**Use Case:** Filter dashboards by synthetic test.

---

#### `syntheticMetrics()`
Returns available synthetic monitoring metrics.

**Example:**
```
syntheticMetrics()
```

**Returns:**
- Synthetic test metrics
- Metric keys and labels

**Use Case:** Allow users to select which synthetic metric to display.

## Using Variables in Queries

Once you've created variables, you can use them throughout your queries using the `$variableName` or `${variableName}` syntax.

### Variable Syntax

- **Simple reference**: `$application`
- **Explicit reference**: `${application}`
- **With text**: `entity.zone:$environment`
- **In expressions**: `entity.type:host AND entity.zone:${zone}`

### Example Query Configurations

#### Infrastructure Built-in & Custom Metrics
```
Entity Type: $entityType
Entity Name: $entity (optional)
Metric: $metric
```

#### Application Metrics
```
Application: $application
Metric: $metric
```

#### Service Metrics
```
Application: $application
Service: $service
Metric: $metric
```

#### Endpoint Metrics
```
Application: $application
Service: $service
Endpoint: $endpoint
Metric: $metric
```

#### Analyze Application Calls
```
Application: $application
Metric: $metric
Group by: $groupByTag
```

#### Analyze Websites
```
Website: $website
Type: $beaconType
Metric: $metric
Group by: $groupByTag
```

#### Infrastructure Analyze
```
Entity Type: $entityType
Metric: $metric
Group by: $groupByTag
Tag Filter Expression: Can include variables in JSON
```

## Advanced Usage

### Chained Variables

Create hierarchical variable dependencies where one variable's options depend on another variable's value.

#### Example: Application → Service → Endpoint Chain

**Variable 1: Application**
```
Name: application
Query: applications()
```

**Variable 2: Service**
```
Name: service
Query: services($application)
```

**Variable 3: Endpoint**
```
Name: endpoint
Query: endpoints($application, $service)
```

**Panel Query:**
```
Application: $application
Service: $service
Endpoint: $endpoint
```

**Behavior:**
- When user selects an application, the service dropdown updates
- When user selects a service, the endpoint dropdown updates
- All three selections filter the panel data

#### Example: Entity Type → Metric Chain

**Variable 1: Entity Type**
```
Name: entityType
Query: entityTypes()
```

**Variable 2: Metric**
```
Name: metric
Query: metrics($entityType)
```

**Panel Query:**
```
Entity Type: $entityType
Metric: $metric
```

### Multi-Value Variables

> **Important:** Multi-value selection is currently **not supported** due to Instana API limitations. Variables can only hold a single value at a time.

**Current Limitation:**
- The Instana REST API does not support querying multiple entities simultaneously in most endpoints
- Enabling multi-value or "Include All" options may result in unexpected behavior or errors
- Only single-value selection is recommended and tested

**Workaround:**
If you need to monitor multiple entities:
- Create separate panels for each entity
- Use dashboard rows to organize multiple entity views
- Consider using Infrastructure Analyze category which supports aggregation across multiple entities

## Supported Fields

Variables can be used in the following query fields:

### Infrastructure Metrics (Built-in & Custom)
- **Entity Type**: `$entityType`
- **Entity Name**: `$entity` (optional - for specific entity filtering)
- **Metric**: `$metric`

### Infrastructure Analyze
- **Entity Type**: `$entityType`
- **Metric**: `$metric`
- **Tag Filter Expression**: JSON with variable interpolation

### Application/Service/Endpoint Metrics
- **Application**: `$application`
- **Service**: `$service`
- **Endpoint**: `$endpoint`
- **Metric**: `$metric`

### Analyze Application Calls
- **Application**: `$application`
- **Metric**: `$metric`
- **Group by**: `$groupByTag`

### Analyze Websites
- **Website**: `$website`
- **Type** (Beacon Type): `$beaconType`
- **Metric**: `$metric`
- **Group by**: `$groupByTag`

### Analyze Mobile Apps
- **Mobile App**: `$mobileApp`
- **Type** (Beacon Type): `$beaconType`
- **Metric**: `$metric`
- **Group by**: `$groupByTag`

### SLI Information
- **SLI Report**: `$sliReport`

### SLO Information
- **SLO Report**: `$sloReport`

### Synthetic Monitoring
- **Test**: `$syntheticTest`
- **Metric**: `$metric`


## Examples

### Example 1: Multi-Environment Infrastructure Dashboard

**Objective:** Create a single dashboard that works across dev, staging, and production environments.

#### Using Datasource Variable (Separate Instana Instances)

**Prerequisites:**
- Configure separate Instana datasources in Grafana:
  - `Instana-Dev`
  - `Instana-Staging`
  - `Instana-Production`

**Variables:**

1. **Datasource Variable**
   ```
   Variable type: Data source
   Name: instana_env
   Type: Choose "instana"
   ```

2. **Entity Type Variable**
   ```
   Name: entityType
   Data source: $instana_env
   Query: entityTypes()
   ```

3. **Metric Variable**
   ```
   Name: metric
   Data source: $instana_env
   Query: metrics($entityType)
   ```

**Panel Query:**
```
Data source: $instana_env
Category: Infrastructure built-in metrics
Entity Type: $entityType
Entity Name: (optional - leave empty or use $entity for specific entity)
Metric: $metric
```

**Result:** Users can switch between completely separate Instana environments (different backends) and monitor different entity types with appropriate metrics.

---

### Example 2: Application Performance Dashboard

**Objective:** Monitor application performance with drill-down capability.

**Variables:**

1. **Application Variable**
   ```
   Name: app
   Query: applications()
   ```

2. **Service Variable**
   ```
   Name: service
   Query: services($app)
   ```

3. **Endpoint Variable**
   ```
   Name: endpoint
   Query: endpoints($app, $service)
   ```

4. **Metric Variable**
   ```
   Name: metric
   Type: Custom
   Values: calls, latency, errors, erroneous_calls
   ```

**Panel 1 - Application Overview:**
```
Category: Application metrics
Application: $app
Metric: $metric
```

**Panel 2 - Service Details:**
```
Category: Service metrics
Application: $app
Service: $service
Metric: $metric
```

**Panel 3 - Endpoint Details:**
```
Category: Endpoint metrics
Application: $app
Service: $service
Endpoint: $endpoint
Metric: $metric
```

**Result:** Hierarchical view from application down to specific endpoints.

---

### Example 3: Website Monitoring by Beacon Type

**Objective:** Analyze website performance for different interaction types.

**Variables:**

1. **Website Variable**
   ```
   Name: website
   Query: websites()
   ```

2. **Beacon Type Variable**
   ```
   Name: beaconType
   Query: websiteBeaconTypes()
   ```

3. **Metric Variable**
   ```
   Name: metric
   Query: websiteMetrics($beaconType)
   ```

4. **Group By Variable**
   ```
   Name: groupBy
   Query: websiteTags()
   ```

**Panel Query:**
```
Category: Analyze websites
Website: $website
Type: $beaconType
Metric: $metric
Group by: $groupBy
Aggregation: MEAN
```

**Result:** Flexible website monitoring with dynamic metric selection based on beacon type.

---

### Example 4: Infrastructure Analyze with Dynamic Filtering

**Objective:** Analyze infrastructure metrics with flexible filtering.

**Variables:**

1. **Entity Type Variable**
   ```
   Name: entityType
   Query: entityTypes()
   ```

2. **Metric Variable**
   ```
   Name: metric
   Query: metrics($entityType)
   ```

3. **Zone Variable**
   ```
   Name: zone
   Type: Custom
   Values: us-east-1, us-west-2, eu-central-1
   ```

4. **Group By Variable**
   ```
   Name: groupBy
   Type: Custom
   Values: entity.zone, entity.name, host.name
   ```

**Panel Query:**
```
Category: Infrastructure Analyze
Entity Type: $entityType
Metric: $metric
Group by: $groupBy
Tag Filter Expression:
{
  "type": "TAG_FILTER",
  "name": "entity.zone",
  "operator": "EQUALS",
  "value": "$zone"
}
```

**Result:** Comprehensive infrastructure analysis with zone-based filtering.

---

### Example 5: SLO Monitoring Dashboard

**Objective:** Monitor multiple SLOs with a single dashboard.

**Variables:**

1. **SLO Report Variable**
   ```
   Name: slo
   Query: sloReports()
   ```

**Panel 1 - SLO Status:**
```
Category: Service levels objectives (beta)
SLO Configuration: $slo
Value Type: Service level status
```

**Panel 2 - Error Budget:**
```
Category: Service levels objectives (beta)
SLO Configuration: $slo
Value Type: Remain error budget
```

**Panel 3 - Violations:**
```
Category: Service levels objectives (beta)
SLO Configuration: $slo
Value Type: Voilation chart
```

**Result:** Comprehensive SLO monitoring with easy switching between different SLOs.

---

### Example 6: Synthetic Test Monitoring

**Objective:** Monitor synthetic tests across different locations.

**Variables:**

1. **Test Variable**
   ```
   Name: test
   Query: syntheticTests()
   ```

2. **Metric Variable**
   ```
   Name: metric
   Query: syntheticMetrics()
   ```

**Panel Query:**
```
Category: Synthetic Monitoring
Test: $test
Data Type: Result
Metric: $metric
Aggregation: MEAN
```

**Result:** Flexible synthetic test monitoring with metric selection.


## Troubleshooting

### Variable Not Populating

**Symptoms:**
- Variable dropdown is empty
- Shows "No options found"

**Solutions:**
1. **Check datasource connection**: Ensure Instana datasource is configured correctly
2. **Verify query syntax**: Ensure query function name is correct (case-insensitive)
3. **Check API permissions**: Ensure API token has necessary permissions
4. **Review browser console**: Look for error messages
5. **Test datasource**: Use "Save & Test" in datasource configuration

### Variable Not Interpolating

**Symptoms:**
- Query shows `$variable` instead of the value
- No data returned

**Solutions:**
1. **Check variable name**: Ensure variable name matches reference
2. **Use correct syntax**: Try both `$var` and `${var}` syntax
3. **Verify variable scope**: Ensure variable is defined at dashboard level

## Additional Resources

- **Grafana Variables Documentation**: https://grafana.com/docs/grafana/latest/variables/
- **Instana API Documentation**: https://www.ibm.com/docs/en/instana-observability/current?topic=apis-web-rest-api
- **Plugin Repository**: https://github.com/instana/instana-grafana-datasource
- **Community Support**: https://community.ibm.com/community/user/aiops/communities/community-home?CommunityKey=58f324a3-3104-41be-9510-5b7c413cc48f


**Last Updated**: 2026-06-15
**Plugin Version**: 5.1.0