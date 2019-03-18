System.register([], function(exports_1) {
    return {
        setters:[],
        execute: function() {
            exports_1("default",{
                'pageLoad': [
                    {
                        'key': 'onLoadTime',
                        'label': 'onLoad time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'uniqueUsers',
                        'label': 'UNIQUE USERS',
                        'aggregations': ['DISTINCT_COUNT']
                    },
                    {
                        'key': 'unloadTime',
                        'label': 'Unload time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'redirectTime',
                        'label': 'Redirect time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'appCacheTime',
                        'label': 'AppCache time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'dnsTime',
                        'label': 'DNS time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'tcpTime',
                        'label': 'TCP time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'sslTime',
                        'label': 'SSL time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'requestTime',
                        'label': 'Request time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'responseTime',
                        'label': 'Response time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'processingTime',
                        'label': 'Processing time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'onLoadEventDuration',
                        'label': 'onLoad event duration',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'domTime',
                        'label': 'DOM time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'childrenTime',
                        'label': 'Children time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'firstPaintTime',
                        'label': 'First paint time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'firstContentfulPaintTime',
                        'label': 'First contentful paint time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    }
                ],
                'resourceLoad': [
                    {
                        'key': 'retrievalTime',
                        'label': 'Retrieval time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'uniqueUsers',
                        'label': 'UNIQUE USERS',
                        'aggregations': ['DISTINCT_COUNT']
                    },
                    {
                        'key': 'encodedBodySize',
                        'label': 'Encoded body size',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'decodedBodySize',
                        'label': 'Decoded body size',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'transferSize',
                        'label': 'Transfer size',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'redirectTime',
                        'label': 'Redirect time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'appCacheTime',
                        'label': 'AppCache time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'dnsTime',
                        'label': 'DNS time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'tcpTime',
                        'label': 'TCP time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'sslTime',
                        'label': 'SSL time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'requestTime',
                        'label': 'Request time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'responseTime',
                        'label': 'Response time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    }
                ],
                'httpRequest': [
                    {
                        'key': 'retrievalTime',
                        'label': 'Retrieval time',
                        'aggregations': ['MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99']
                    },
                    {
                        'key': 'uniqueUsers',
                        'label': 'UNIQUE USERS',
                        'aggregations': ['DISTINCT_COUNT']
                    },
                    {
                        'key': 'http1xx',
                        'label': 'HTTP 1XX',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'http2xx',
                        'label': 'HTTP 2XX',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'http3xx',
                        'label': 'HTTP 3XX',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'http4xx',
                        'label': 'HTTP 4XX',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'http5xx',
                        'label': 'HTTP 5XX',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'httpGet',
                        'label': 'HTTP GET',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'httpPost',
                        'label': 'HTTP POST',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'httpPut',
                        'label': 'HTTP PUT',
                        'aggregations': ['SUM']
                    },
                    {
                        'key': 'httpDelete',
                        'label': 'HTTP DELETE',
                        'aggregations': ['SUM']
                    }
                ],
                'error': [
                    {
                        'key': 'affectedUsers',
                        'label': 'Affected Users',
                        'aggregations': ['SUM']
                    }
                ]
            });
        }
    }
});
// onLoadEventDuration == onLoadEventTime ??
// Retrieval Time in the ui but not from the metrics rest call
// metrics never used in the ui: httpSynchronous, beaconCount, beaconDuration, beaconErrorCount, beaconErrorRate, errors
//{'httpGet':["pageLoad","resourceLoad"]};
//# sourceMappingURL=website_metrics.js.map