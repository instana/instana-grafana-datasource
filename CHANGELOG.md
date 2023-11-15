# Changelog

## 3.3.9
- add filter feature for mobileapp analysis, and enabled beeInstana in infrastructure

## 3.3.8
- add mobile app metrics data

## 3.3.7
- fix application, service and endpoint selection in corresponding metrics category

## 3.3.6
- fix available metrics in Analyze websites

## 3.3.5
- fix docs url for dynamic focus query

## 3.3.4
- encode infrastructure metrics to support custom metrics including special characters
- fix datasource configuration with instana urls ending with `/`

## 3.3.3
- adjust supported granularites for analyze queries to match Instana UI for better comparability
    - removed: `5h`, `10h`
    - added `30min`, `4h`, `6h`, `8h`, `12h`
- fixed an issue sending greater window sizes for analyze queries than actually selected on timepicker, as API is limited by `31d`
- ensure sending minimum valid window size for analyze queries

## 3.3.2
- re-calculate end date and window size by selected granularity

## 3.3.1
status quo
