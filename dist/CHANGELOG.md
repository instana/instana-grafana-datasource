# Changelog

## 4.1.3 - 2025-03-28
- Fix: Fixed an issue with the legend variables in Infrastructure Metric Categories.

## 4.1.2 - 2025-02-24
- Enhancements: Enabled multi-filtering in the Infrastructure Analyze metric category.
- Fix: Fixed a bug in the legend label format functionality.

## 4.1.1 - 2025-01-10
- Fix: Ensured accurate time range handling, resolving alignment and data consistency issues.
- Fix: Fixed the API limit issue for querying "Infrastructure Custom Metrics".
- Fix: Fixed the bug in the legend format functionality.

## 4.1.0 - 2024-07-19
- New Feature: Added a new metric category for Service Level Objectives (beta) with the new SLO API.
- Enhancements: Renamed the existing SLO information metric category to Service Level Objectives Widgets, which supports the old SLO APIs.
- Fix: Fixed a bug to enable offline snapshots in the Infrastructure Metrics category.

## 4.0.2 - 2024-05-29
- Fix: Fixed a DFQ bug introduced in the Infrastructure Metrics category.

## 4.0.1 - 2024-05-07
- Fix: Fixed a bug in the Infrastructure snapshot API that was causing issues with listing Entity types for Self-hosted installation.

## 4.0.0 - 2024-03-28
- Breaking Changes: Secure information, including API keys, is now stored in `secureJsonData` instead of `jsonData`. This change requires users to reauthenticate datasources by entering the URL and API Token on the configuration page.
- Chore: Replaced deprecated instana REST API calls in Analyze Infrastructure with new ones.
- Fix: Fixed filter bug introduced in Analyze Application/Website.
- Fix: Updated instana version and suggested grafana version.
- Fix: Updated json data into security json file

## 3.3.9 - 2023-11-17
- Chore: Added filter query for Analyze Mobileapp in grafana UI.
- Chore: Enabled `includeSynthetic` parameter query in Analyze Infrastructure.

## 3.3.8 - 2023-09-29
- New Feature: Added Analyze Mobileapp for available metrics data in grafana UI.

## 3.3.7 - 2023-07-11
- Fix: Fixed application, service and endpoint selection in corresponding metrics category

## 3.3.6 - 2023-05-08
- Fix: Fixed available metrics in Analyze Websites

## 3.3.5 - 2023-01-20
- Fix: Fixed docs url for dynamic focus query

## 3.3.4 - 2022-08-18
- Chore: Encode infrastructure metrics to support custom metrics including special characters
- Fix: Fixed datasource configuration with instana urls ending with `/`

## 3.3.3 - 2022-02-16
- Chore: Adjusted supported granularites for analyze queries to match Instana UI for better comparability
    - removed: `5h`, `10h`
    - added `30min`, `4h`, `6h`, `8h`, `12h`
- Fix: Fixed an issue sending greater window sizes for analyze queries than actually selected on timepicker, as API is limited by `31d`
- Chore: ensure sending minimum valid window size for analyze queries

## 3.3.2 - 2022-01-28
- Chore: Re-calculate end date and window size by selected granularity

## 3.3.1 - 2021-08-10
- Fix: Status quo
