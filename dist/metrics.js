System.register([], function(exports_1) {
    return {
        setters:[],
        execute: function() {
            exports_1("default",{
                "host": {
                    "label": "Hosts",
                    "deprecated": false,
                    "metrics": {
                        "memory.free": "Free",
                        "memory.used": "Used",
                        "load.1min": "Load",
                        "cpu.user": "User",
                        "cpu.sys": "System",
                        "cpu.wait": "Wait",
                        "cpu.nice": "Nice",
                        "cpu.steal": "Steal",
                        "cpu.used": "Used",
                        "topPID": "Top PID",
                        "swap.pgin": "Page-In",
                        "swap.pgout": "Page-Out",
                        "tcp.established": "Established",
                        "tcp.opens": "Open/s",
                        "tcp.inSegs": "In Segments/s",
                        "tcp.outSegs": "Out Segments/s",
                        "tcp.establishedResets": "Established Resets",
                        "tcp.resets": "Out Resets",
                        "tcp.fails": "Fail",
                        "tcp.errors": "Error",
                        "tcp.retrans": "Retransmission"
                    }
                },
                "activemq": {
                    "label": "ActiveMQs",
                    "deprecated": false,
                    "metrics": {
                        "totalQueuesEnqueueCount": "All Queues Messages Enqueue",
                        "totalQueuesDequeueCount": "All Queues Messages Dequeue",
                        "totalTopicsDequeueCount": "All Topics Messages Dequeue",
                        "totalTopicsEnqueueCount": "All Topics Messages Enqueue",
                        "totalConnectionsCount": "Total Connections",
                        "totalConsumerCount": "Total Consumers",
                        "totalProducerCount": "Total Producers",
                        "memoryPercentUsage": "Memory Usage",
                        "storePercentUsage": "Store Usage"
                    }
                },
                "application": {
                    "label": "Applications",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate"
                    }
                },
                "awsdynamodb": {
                    "label": "AWS DynamoDB Tables",
                    "deprecated": false,
                    "metrics": {
                        "provisioned_read": "Provisioned read capacity",
                        "consumed_read": "Consumed read capacity",
                        "throttled_get": "Throttled read requests (Get)",
                        "throttled_scan": "Throttled read requests (Scan)",
                        "throttled_query": "Throttled read requests (Query)",
                        "throttled_batch_get": "Throttled read requests (Batch Get)",
                        "provisioned_write": "Provisioned write capacity",
                        "consumed_write": "Consumed write capacity",
                        "throttled_put": "Throttled write requests (Put)",
                        "throttled_update": "Throttled write requests (Update)",
                        "throttled_delete": "Throttled write requests (Delete)",
                        "throttled_batch_write": "Throttled write requests (Batch Write)",
                        "lat_get_max": "Get latency (Maximum)",
                        "lat_get_min": "Get latency (Minimum)",
                        "lat_get_avg": "Get latency (Average)",
                        "lat_get_sum": "Get latency (Sum)",
                        "lat_get_sc": "Get latency (Request count)",
                        "lat_put_max": "Put latency (Maximum)",
                        "lat_put_min": "Put latency (Minimum)",
                        "lat_put_avg": "Put latency (Average)",
                        "lat_put_sum": "Put latency (Sum)",
                        "lat_put_sc": "Put latency (Request count)",
                        "lat_query_max": "Query latency (Maximum)",
                        "lat_query_min": "Query latency (Minimum)",
                        "lat_query_avg": "Query latency (Average)",
                        "lat_query_sum": "Query latency (Sum)",
                        "lat_query_sc": "Query latency (Request count)",
                        "lat_scan_max": "Scan latency (Maximum)",
                        "lat_scan_min": "Scan latency (Minimum)",
                        "lat_scan_avg": "Scan latency (Average)",
                        "lat_scan_sum": "Scan latency (Sum)",
                        "lat_scan_sc": "Scan latency (Request count)",
                        "lat_up_max": "Update latency (Maximum)",
                        "lat_up_min": "Update latency (Minimum)",
                        "lat_up_avg": "Update latency (Average)",
                        "lat_up_sum": "Update latency (Sum)",
                        "lat_up_sc": "Update latency (Request count)",
                        "lat_del_max": "Delete latency (Maximum)",
                        "lat_del_min": "Delete latency (Minimum)",
                        "lat_del_avg": "Delete latency (Average)",
                        "lat_del_sum": "Delete latency (Sum)",
                        "lat_del_sc": "Delete latency (Request count)",
                        "lat_batch_get_max": "Batch get latency (Maximum)",
                        "lat_batch_get_min": "Batch get latency (Minimum)",
                        "lat_batch_get_avg": "Batch get latency (Average)",
                        "lat_batch_get_sum": "Batch get latency (Sum)",
                        "lat_batch_get_sc": "Batch get latency (Request count)",
                        "lat_batch_write_max": "Batch write latency (Maximum)",
                        "lat_batch_write_min": "Batch write latency (Minimum)",
                        "lat_batch_write_avg": "Batch write latency (Average)",
                        "lat_batch_write_sum": "Batch write latency (Sum)",
                        "lat_batch_write_sc": "Batch write latency (Request count)",
                        "scan_ret_item_max": "Returned scan item count (Maximum)",
                        "scan_ret_item_min": "Returned scan item count (Minimum)",
                        "scan_ret_item_avg": "Returned scan item count (Average)",
                        "scan_ret_item_sum": "Returned scan item count (Sum)",
                        "query_ret_item_max": "Returned query item count (Maximum)",
                        "query_ret_item_min": "Returned query item count (Minimum)",
                        "query_ret_item_avg": "Returned query item count (Average)",
                        "query_ret_item_sum": "Returned query item count (Sum)",
                        "con_check_fail": "Conditional check failed",
                        "user_err": "User error",
                        "sys_err_get": "System errors read (Get)",
                        "sys_err_scan": "System errors read (Scan)",
                        "sys_err_query": "System errors read (Query)",
                        "sys_err_batch_get": "System errors read (Batch get)",
                        "sys_err_put": "System errors write (Put)",
                        "sys_err_update": "System errors write (Update)",
                        "sys_err_delete": "System errors write (Delete)",
                        "sys_err_batch_write": "System errors write (Batch write)",
                        "ttl": "TTL Deleted Items"
                    }
                },
                "awsec": {
                    "label": "AWS ECs",
                    "deprecated": false,
                    "metrics": {
                        "cpu_utilization": "CPU Utilization",
                        "freeable_memory": "Freeable memory",
                        "net_bytes_in": "Bytes In",
                        "net_bytes_out": "Bytes Out",
                        "swap_usage": "Swap usage",
                        "curr_connections": "Current connections",
                        "new_connections": "New connections",
                        "curr_items": "Current Items",
                        "evictions": "Evictions",
                        "reclaimed": "Reclaimed"
                    }
                },
                "awselb": {
                    "label": "AWS ELBs",
                    "deprecated": false,
                    "metrics": {
                        "processed_bytes": "Processed Bytes",
                        "new_flow_count": "New Flow Count",
                        "client_reset_count": "Client RST",
                        "elb_reset_count": "Elb RST",
                        "target_reset_count": "Target RST",
                        "active_connection_count": "Active Connections",
                        "new_connection_count": "New Connections",
                        "rejected_connection_count": "Rejected Connections",
                        "elb_4XX_count": "Elb Status Code 4xx Count",
                        "elb_5XX_count": "Elb Status Code 5xx Count"
                    }
                },
                "awskinesis": {
                    "label": "AWS Kinesis streams",
                    "deprecated": false,
                    "metrics": {
                        "get_records_records": "Get Records records",
                        "get_records_success": "Get Records success",
                        "put_records_records": "Put Records records",
                        "put_records_success": "Put Records success",
                        "get_records_age_ms": "Get Records age",
                        "get_records_latency": "Get Records Latency",
                        "get_records_bytes": "Get Records traffic",
                        "incoming_records": "Incoming records",
                        "incoming_bytes": "Incoming traffic",
                        "put_records_latency": "Put Records Latency",
                        "put_records_bytes": "Put Records traffic",
                        "read_provisioned_throughput_exceeded": "Read Provisioned Throughput Exceeded",
                        "write_provisioned_throughput_exceeded": "Write Provisioned Throughput Exceeded"
                    }
                },
                "awslambda": {
                    "label": "AWS Lambdas",
                    "deprecated": false,
                    "metrics": {
                        "invocations": "Invocations",
                        "errors": "Errors",
                        "dead_letter_error": "Dead Letter Error",
                        "duration": "Duration Average",
                        "duration_maximum": "Duration Maximum",
                        "duration_minimum": "Duration Minimum",
                        "duration_sum": "Duration Sum",
                        "throttles": "Throttles",
                        "iterator_age": "Iterator Age Average",
                        "iterator_age_minimum": "Iterator Age Minimum",
                        "iterator_age_maximum": "Iterator Age Maximum",
                        "iterator_age_sum": "Iterator Age Sum",
                        "concurrent_executions": "Concurrent Executions Average",
                        "concurrent_executions_maximum": "Concurrent Executions Maximum",
                        "concurrent_executions_minimum": "Concurrent Executions Minimum",
                        "concurrent_executions_sum": "Concurrent Executions Sum",
                        "unreserved_concurrent_executions": "Unreserved Concurrent Executions"
                    }
                },
                "awsrds": {
                    "label": "AWS RDSs",
                    "deprecated": false,
                    "metrics": {
                        "cpu_utilization": "CPU Usage",
                        "cpu_credit_usage": "CPU Credit Usage",
                        "cpu_credit_balance": "CPU Credit Balance",
                        "burst_balance": "Burst Balance",
                        "db_connections": "DB Connections",
                        "disk_queue_depth": "Disk queue depth",
                        "freeable_memory": "Freeable RAM",
                        "free_storage_space": "Available storage space",
                        "replica_lag": "Replica lag",
                        "swap_usage": "Swap usage",
                        "read_iops": "Read ops",
                        "write_iops": "Write ops",
                        "read_latency": "Read latency",
                        "write_latency": "Write latency",
                        "read_throughput": "Read throughput",
                        "write_throughput": "Write throughput",
                        "net_receive_throughput": "Receive throughput",
                        "net_transmit_throughput": "Transmit throughput"
                    }
                },
                "awssqs": {
                    "label": "AWS SQSs",
                    "deprecated": false,
                    "metrics": {
                        "num_of_msg_delayed": "Number of messages delayed",
                        "num_of_msg_not_visible": "Number of messages not visible",
                        "num_of_msg_visible": "Number of messages visible",
                        "num_of_empty_receives": "Number of messages empty receives",
                        "num_of_msg_received": "Number of messages receives",
                        "num_of_msg_sent": "Number of messages sent"
                    }
                },
                "awss3": {
                    "label": "AWS S3 Buckets",
                    "deprecated": false,
                    "metrics": {
                        "all_requests": "All Requests",
                        "get_requests": "Get Requests",
                        "put_requests": "Put Requests",
                        "delete_requests": "Delete Requests",
                        "head_requests": "Head Requests",
                        "post_requests": "Post Requests",
                        "list_requests": "List Requests",
                        "bytes_downloaded": "Downloaded",
                        "bytes_uploaded": "Uploaded",
                        "4xx_errors": "First Byte Latency",
                        "5xx_errors": "Total Request Latency"
                    }
                },
                "azureapimanagement": {
                    "label": "Azure API Management Services",
                    "deprecated": false,
                    "metrics": {
                        "metrics.Capacity": "Capacity",
                        "metrics.TotalRequests": "Total Gateway Requests",
                        "metrics.SuccessfulRequests": "Successful Gateway Requests",
                        "metrics.UnauthorizedRequests": "Unauthorized Gateway Requests",
                        "metrics.FailedRequests": "Failed Gateway Requests",
                        "metrics.OtherRequests": "Other Gateway Requests",
                        "metrics.Duration": "Duration",
                        "EventHubTotalEvents": "Total EventHub Events",
                        "EventHubSuccessfulEvents": "Successful EventHub Events",
                        "EventHubTotalFailedEvents": "Failed EventHub Events",
                        "EventHubRejectedEvents": "Rejected EventHub Events",
                        "EventHubThrottledEvents": "Throttled EventHub Events",
                        "EventHubTimedoutEvents": "Timed Out EventHub Events",
                        "EventHubDroppedEvents": "Dropped EventHub Events",
                        "EventHubTotalBytesSent": "Size of EventHub Events"
                    }
                },
                "azureappservice": {
                    "label": "Azure AppService",
                    "deprecated": false,
                    "metrics": {
                        "art": "Average Response-Time",
                        "h2x": "Number of HTTP 2xx responses",
                        "h4x": "Number of HTTP 2xx responses",
                        "h5x": "Number of HTTP 5xx responses",
                        "trs": "Number of requests",
                        "qrs": "Number of queued requests",
                        "bts": "Bytes Sent",
                        "btr": "Bytes Received",
                        "g0c": "Generation 0 Collections",
                        "g1c": "Generation 1 Collections",
                        "g2c": "Generation 2 Collections"
                    }
                },
                "azurecosmosdb": {
                    "label": "Azure CosmosDb",
                    "deprecated": false,
                    "metrics": {
                        "h2": "Number of HTTP 2xx responses",
                        "h3": "Number of HTTP 3xx responses",
                        "tr": "Number of requests",
                        "ds": "Data Size",
                        "is": "Index Size",
                        "dc": "Document Count",
                        "rl": "Read Latency",
                        "rlc": "Read Latency Count",
                        "wl": "Write Latency",
                        "wlc": "Write Latency Count",
                        "sc": "Storage Capacity",
                        "as": "Available Storage"
                    }
                },
                "azurerediscache": {
                    "label": "Azure Redis Caches",
                    "deprecated": false,
                    "metrics": {
                        "connectedclients": "Connected Clients",
                        "totalcommandsprocessed": "Total Operations",
                        "cachehits": "Cache Hits",
                        "cachemisses": "Cache Misses",
                        "getcommands": "Gets",
                        "setcommands": "Sets",
                        "operationsPerSecond": "Operations Per Second",
                        "evictedkeys": "Evicted Keys",
                        "totalkeys": "Total Keys",
                        "expiredkeys": "Expired Keys",
                        "usedmemory": "Used Memory",
                        "usedmemoryRss": "Used Memory RSS",
                        "serverLoad": "Server Load",
                        "cacheWrite": "Cache Write",
                        "cacheRead": "Cache Read",
                        "percentProcessorTime": "CPU"
                    }
                },
                "azurestorage": {
                    "label": "Azure Storage Services",
                    "deprecated": false,
                    "metrics": {
                        "tr_to": "Total Transactions",
                        "in_to": "Total Ingress",
                        "in_av": "Average Ingress",
                        "in_mi": "Minimum Ingress",
                        "in_mx": "Maximum Ingress",
                        "eg_to": "Total Egress",
                        "eg_av": "Average Egress",
                        "eg_mi": "Minimum Egress",
                        "eg_mx": "Maximum Egress",
                        "sl_to": "Total Success Server Latency",
                        "sl_av": "Average Success Server Latency",
                        "sl_mi": "Minimum Success Server Latency",
                        "sl_mx": "Maximum Success Server Latency",
                        "el_to": "Total Success E2E Latency",
                        "el_av": "Average Success E2E Latency",
                        "el_mi": "Minimum Success E2E Latency",
                        "el_mx": "Maximum Success E2E Latency",
                        "av_to": "Total Availability",
                        "av_av": "Average Availability",
                        "av_mi": "Minimum Availability",
                        "av_mx": "Maximum Availability"
                    }
                },
                "azuresqldatabase": {
                    "label": "Azure SQL Databases",
                    "deprecated": false,
                    "metrics": {
                        "total_dtu_limit": "Total DTU Limit",
                        "total_dtu_used": "Total DTU Used"
                    }
                },
                "batchserviceinstance": {
                    "label": "Batch Job Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "browserlogicalservice": {
                    "label": "Websites",
                    "deprecated": false,
                    "metrics": {
                        "count": "Page Loads",
                        "duration.mean": "Mean Load Time",
                        "duration.50th": "Load Time 50th",
                        "duration.90th": "Load Time 90th",
                        "duration.95th": "Load Time 95th",
                        "duration.98th": "Load Time 98th",
                        "duration.99th": "Load Time 99th",
                        "unl": "Unload Time ",
                        "red": "Redirect Time ",
                        "apc": "AppCache Time ",
                        "dns": "DNS Time ",
                        "tcp": "TCP Time ",
                        "ssl": "SSL Time ",
                        "req": "Request Time ",
                        "rsp": "Response Time ",
                        "dom": "DOM Processing Time ",
                        "chi": "Children Time ",
                        "bac": "Backend Time ",
                        "fro": "Frontend Time ",
                        "fp": "First Paint Time ",
                        "uncaughtErrors": "Errors",
                        "xhrCalls": "Calls",
                        "xhrErrors": "Errors"
                    }
                },
                "cassandracluster": {
                    "label": "Cassandra Clusters",
                    "deprecated": false,
                    "metrics": {
                        "clientrequests.read.count": "Read",
                        "clientrequests.write.count": "Write",
                        "clientrequests.read.mean": "Mean",
                        "clientrequests.read.50": "50th Percentile",
                        "clientrequests.read.95": "95th Percentile",
                        "clientrequests.read.99": "99th Percentile",
                        "clientrequests.write.mean": "Mean",
                        "clientrequests.write.50": "50th Percentile",
                        "clientrequests.write.95": "95th Percentile",
                        "clientrequests.write.99": "99th Percentile",
                        "overallDiskSize": "Overall Disk Size",
                        "keyspaceCount": "Keyspaces",
                        "nodeCount": "Cluster Nodes"
                    }
                },
                "cassandrakeyspaceserviceinstance": {
                    "label": "Cassandra Keyspace Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "cassandranode": {
                    "label": "Cassandra Nodes",
                    "deprecated": false,
                    "metrics": {
                        "clientrequests.read.mean": "Mean",
                        "clientrequests.read.50": "50th Percentile",
                        "clientrequests.read.95": "95th Percentile",
                        "clientrequests.read.99": "99th Percentile",
                        "clientrequests.write.mean": "Mean",
                        "clientrequests.write.50": "50th Percentile",
                        "clientrequests.write.95": "95th Percentile",
                        "clientrequests.write.99": "99th Percentile",
                        "clientrequests.read.count": "Write (Mutation)",
                        "clientrequests.write.count": "Read",
                        "stage.mutation.pending": "Counter Mutation",
                        "stage.read.pending": "Read Repair",
                        "stage.countermutation.pending": "Request/Response",
                        "stage.readrepair.pending": "Memtable Flushwriter",
                        "stage.requestresponse.pending": "Write (Mutation)",
                        "stage.memtableflushwriter.pending": "Read",
                        "stage.mutation.blocked": "Counter Mutation",
                        "stage.read.blocked": "Read Repair",
                        "stage.countermutation.blocked": "Request/Response",
                        "stage.readrepair.blocked": "Memtable Flushwriter",
                        "stage.requestresponse.blocked": "Write (Mutation)",
                        "stage.memtableflushwriter.blocked": "Read",
                        "dropped.MUTATION": "Counter Mutation",
                        "dropped.READ": "Read Repair",
                        "dropped.COUNTER_MUTATION": "Request/Response",
                        "dropped.READ_REPAIR": "Compactions",
                        "dropped.REQUEST_RESPONSE": "Read",
                        "compaction.pending": "Write",
                        "cache.counter.hit": "Counter",
                        "cache.key.hit": "Key",
                        "cache.row.hit": "Row",
                        "bloomFilterFalse": "Miss Rate"
                    }
                },
                "ceph": {
                    "label": "Ceph instances",
                    "deprecated": false,
                    "metrics": {
                        "num_mons": "Number of monitors",
                        "num_active_mons": "Number of active monitors",
                        "num_osds": "Total mumber of osds",
                        "num_up_osds": "Total number of osds in state UP",
                        "num_in_osds": "Total number of osds in state IN",
                        "commit_latency_ms": "Commit latency in ms",
                        "apply_latency_ms": "Apply latency in ms",
                        "num_near_full_osds": "Number of near full osds",
                        "num_full_osds": "Number of active+clean pgs",
                        "num_pgs": "Number of pgs",
                        "num_pools": "Number of pools",
                        "num_objects": "Number of objects",
                        "aggregate_pct_used": "Overall capacity usage",
                        "read_bytes_sec": "Read bytes per second",
                        "write_bytes_sec": "Write bytes per second",
                        "read_op_per_sec": "Read ops",
                        "write_op_per_sec": "Write ops"
                    }
                },
                "clickhousedatabase": {
                    "label": "ClickHouse DBs",
                    "deprecated": false,
                    "metrics": {
                        "Merge": "Merge",
                        "ReplicatedFetch": "ReplicatedFetch",
                        "ReplicatedSend": "ReplicatedSend",
                        "ReplicatedChecks": "ReplicatedChecks",
                        "BackgroundPoolTask": "BackgroundPoolTask",
                        "DiskSpaceReservedForMerge": "DiskSpaceReservedForMerge",
                        "DistributedSend": "DistributedSend",
                        "QueryPreempted": "QueryPreempted",
                        "TCPConnection": "TCPConnection",
                        "HTTPConnection": "HTTPConnection",
                        "InterserverConnection": "InterserverConnection",
                        "OpenFileForRead": "OpenFileForRead",
                        "OpenFileForWrite": "OpenFileForWrite",
                        "Read": "Read",
                        "Write": "Write",
                        "SendExternalTables": "SendExternalTables",
                        "QueryThread": "QueryThread",
                        "ReadonlyReplica": "ReadonlyReplica",
                        "LeaderReplica": "LeaderReplica",
                        "MemoryTracking": "MemoryTracking",
                        "MemoryTrackingInBackgroundProcessingPool": "MemoryTrackingInBackgroundProcessingPool",
                        "MemoryTrackingForMerges": "MemoryTrackingForMerges",
                        "LeaderElection": "LeaderElection",
                        "EphemeralNode": "EphemeralNode",
                        "ZooKeeperWatch": "ZooKeeperWatch",
                        "DelayedInserts": "DelayedInserts",
                        "ContextLockWait": "ContextLockWait",
                        "StorageBufferRows": "StorageBufferRows",
                        "StorageBufferBytes": "StorageBufferBytes",
                        "DictCacheRequests": "DictCacheRequests",
                        "Revision": "Revision",
                        "RWLockWaitingReaders": "RWLockWaitingReaders",
                        "RWLockWaitingWriters": "RWLockWaitingWriters",
                        "RWLockActiveReaders": "RWLockActiveReaders",
                        "RWLockActiveWriters": "RWLockActiveWriters",
                        "Query": "Query",
                        "SelectQuery": "SelectQuery",
                        "InsertQuery": "InsertQuery",
                        "FileOpen": "FileOpen",
                        "Seek": "Seek",
                        "ReadBufferFromFileDescriptorRead": "ReadBufferFromFileDescriptorRead",
                        "ReadBufferFromFileDescriptorReadBytes": "ReadBufferFromFileDescriptorReadBytes",
                        "WriteBufferFromFileDescriptorWrite": "WriteBufferFromFileDescriptorWrite",
                        "WriteBufferFromFileDescriptorWriteBytes": "WriteBufferFromFileDescriptorWriteBytes",
                        "ReadCompressedBytes": "ReadCompressedBytes",
                        "CompressedReadBufferBlocks": "CompressedReadBufferBlocks",
                        "CompressedReadBufferBytes": "CompressedReadBufferBytes",
                        "IOBufferAllocs": "IOBufferAllocs",
                        "IOBufferAllocBytes": "IOBufferAllocBytes",
                        "ArenaAllocChunks": "ArenaAllocChunks",
                        "ArenaAllocBytes": "ArenaAllocBytes",
                        "FunctionExecute": "FunctionExecute",
                        "TableFunctionExecute": "TableFunctionExecute",
                        "MarkCacheHits": "MarkCacheHits",
                        "MarkCacheMisses": "MarkCacheMisses",
                        "CreatedReadBufferOrdinary": "CreatedReadBufferOrdinary",
                        "CreatedWriteBufferOrdinary": "CreatedWriteBufferOrdinary",
                        "ReplicatedPartMerges": "ReplicatedPartMerges",
                        "InsertedRows": "InsertedRows",
                        "InsertedBytes": "InsertedBytes",
                        "DuplicatedInsertedBlocks": "DuplicatedInsertedBlocks",
                        "ZooKeeperInit": "ZooKeeperInit",
                        "ZooKeeperTransactions": "ZooKeeperTransactions",
                        "ZooKeeperList": "ZooKeeperList",
                        "ZooKeeperCreate": "ZooKeeperCreate",
                        "ZooKeeperRemove": "ZooKeeperRemove",
                        "ZooKeeperExists": "ZooKeeperExists",
                        "ZooKeeperGet": "ZooKeeperGet",
                        "ZooKeeperSet": "ZooKeeperSet",
                        "ZooKeeperMulti": "ZooKeeperMulti",
                        "ZooKeeperClose": "ZooKeeperClose",
                        "ZooKeeperWatchResponse": "ZooKeeperWatchResponse",
                        "ZooKeeperExceptions": "ZooKeeperExceptions",
                        "ZooKeeperWaitMicroseconds": "ZooKeeperWaitMicroseconds",
                        "ZooKeeperBytesSent": "ZooKeeperBytesSent",
                        "ZooKeeperBytesReceived": "ZooKeeperBytesReceived",
                        "DistributedConnectionStaleReplica": "DistributedConnectionStaleReplica",
                        "SlowRead": "SlowRead",
                        "ReplicaPartialShutdown": "ReplicaPartialShutdown",
                        "SelectedParts": "SelectedParts",
                        "SelectedRanges": "SelectedRanges",
                        "SelectedMarks": "SelectedMarks",
                        "MergedRows": "MergedRows",
                        "MergedUncompressedBytes": "MergedUncompressedBytes",
                        "MergesTimeMilliseconds": "MergesTimeMilliseconds",
                        "MergeTreeDataWriterRows": "MergeTreeDataWriterRows",
                        "MergeTreeDataWriterUncompressedBytes": "MergeTreeDataWriterUncompressedBytes",
                        "MergeTreeDataWriterCompressedBytes": "MergeTreeDataWriterCompressedBytes",
                        "MergeTreeDataWriterBlocks": "MergeTreeDataWriterBlocks",
                        "MergeTreeDataWriterBlocksAlreadySorted": "MergeTreeDataWriterBlocksAlreadySorted",
                        "CannotRemoveEphemeralNode": "CannotRemoveEphemeralNode",
                        "LeaderElectionAcquiredLeadership": "LeaderElectionAcquiredLeadership",
                        "RegexpCreated": "RegexpCreated",
                        "ContextLock": "ContextLock",
                        "RWLockAcquiredReadLocks": "RWLockAcquiredReadLocks",
                        "RWLockAcquiredWriteLocks": "RWLockAcquiredWriteLocks",
                        "RWLockReadersWaitMilliseconds": "RWLockReadersWaitMilliseconds",
                        "RWLockWritersWaitMilliseconds": "RWLockWritersWaitMilliseconds"
                    }
                },
                "clrruntimeplatform": {
                    "label": ".NET Apps",
                    "deprecated": false,
                    "metrics": {
                        "mem.gen0GC": "Generation 0",
                        "mem.gen1GC": "Generation 1",
                        "mem.gen2GC": "Generation 2",
                        "threads.lck_cql": "Queue-Length",
                        "threads.lck_crs": "Contention-Rate",
                        "mem.gen1HeapBytes": "Generation 1",
                        "mem.gen2HeapBytes": "Generation 2",
                        "mem.loHeapBytes": "Large Objects"
                    }
                },
                "cloudfoundry": {
                    "label": "CloudFoundry",
                    "deprecated": false,
                    "metrics": {
                        "nodeCount": "Nodes"
                    }
                },
                "consul": {
                    "label": "Consul Nodes",
                    "deprecated": false,
                    "metrics": {
                        "consul.runtime.free_count": "Number of freed heap objects",
                        "consul.runtime.heap_objects": "Number of objects allocated on the heap",
                        "consul.runtime.sys_bytes": "Number of the virtual address space reserved by the Go runtime",
                        "consul.runtime.malloc_count": "Number of heap objects allocated",
                        "consul.session_ttl.active": "Session time-to-live active",
                        "consul.autopilot.healthy": "Autopilot: healthy",
                        "consul.runtime.total_gc_runs": "Number of total garbage collection runs",
                        "consul.runtime.num_goroutines": "Number of loaded go routines",
                        "consul.runtime.alloc_bytes": "Number of bytes allocated by the Consul process",
                        "consul.autopilot.failure_tolerance": "Autopilot: failure tolerance",
                        "consul.runtime.total_gc_pause_ns": "Number of total garbage collection pauses in ns",
                        "raft.appliedIndex": "Raft: applied index",
                        "raft.commitIndex": "Raft: commit index",
                        "raft.fsmPending": "Raft: finite state machine pending",
                        "raft.lastLogIndex": "Raft: last log index",
                        "raft.lastLogTerm": "Raft: last log term",
                        "raft.lastSnapshotIndex": "Raft: last snapshot index",
                        "raft.lastSnapshotTerm": "Raft: last snapshop term",
                        "raft.numPeers": "Raft: number of peers",
                        "raft.term": "Raft: term, describes the number of new leader elections that have happened"
                    }
                },
                "couchbasecluster": {
                    "label": "Couchbase Clusters",
                    "deprecated": false,
                    "metrics": {
                        "cluster.usedDisk": "Used disk (bytes)",
                        "cluster.usedMemory": "Used memory (bytes)",
                        "cluster.ops": "Operations per sec.",
                        "cluster.cmd_get": "Gets per sec.",
                        "cluster.cmd_set": "Sets per sec.",
                        "cluster.curr_items": "Items"
                    }
                },
                "couchbasenode": {
                    "label": "Couchbase Nodes",
                    "deprecated": false,
                    "metrics": {
                        "node.mem_used": "Used memory (bytes)",
                        "node.couch_docs_actual_disk_size": "Used disk (bytes)",
                        "node.ep_diskqueue_fill": "Items put to disk queue per sec.",
                        "node.ep_diskqueue_drain": "Items written to disk per sec.",
                        "node.disk_write_queue": "Items in disk write queue"
                    }
                },
                "crystalruntimeplatform": {
                    "label": "Crystal Apps",
                    "deprecated": false,
                    "metrics": {
                        "gc.hs": "Size",
                        "gc.fb": "Free",
                        "gc.ub": "Unused",
                        "gc.bsgc": "Bytes Since GC"
                    }
                },
                "databaseserviceinstance": {
                    "label": "Database Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "defaultentity20": {
                    "label": "defaultEntity20",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate"
                    }
                },
                "defaultlogicalconnection": {
                    "label": "Unspecified Logical Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "defaultlogicalservice": {
                    "label": "Services",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "defaultserviceinstance": {
                    "label": "Service Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "docker": {
                    "label": "Docker Containers",
                    "deprecated": false,
                    "metrics": {
                        "cpu.total_usage": "Total",
                        "cpu.system_usage": "Kernel",
                        "cpu.user_usage": "User",
                        "cpu.throttling_count": "Throttling count",
                        "cpu.throttling_time": "Throttling time",
                        "memory.usage": "Usage",
                        "memory.max_usage": "Max usage",
                        "memory.total_rss": "RSS",
                        "memory.total_cache": "Cache",
                        "memory.active_anon": "active_anon",
                        "memory.active_file": "active_file",
                        "memory.inactive_anon": "inactive_anon",
                        "memory.inactive_file": "inactive_file",
                        "blkio.blk_read": "Read",
                        "blkio.blk_write": "Write",
                        "network.rx.bytes": "Received",
                        "network.tx.bytes": "Transmitted",
                        "network.rx.errors": "RX Errors",
                        "network.rx.dropped": "RX Dropped",
                        "network.tx.errors": "TX Errors",
                        "network.tx.dropped": "TX Dropped"
                    }
                },
                "dropwizardapplicationcontainer": {
                    "label": "Dropwizard Apps",
                    "deprecated": false,
                    "metrics": {}
                },
                "ejblogicalconnection": {
                    "label": "Logical EJB Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "ejblogicalservice": {
                    "label": "EJBs",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "ejbserviceinstance": {
                    "label": "EJB Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "elasticsearchcluster": {
                    "label": "Elasticsearch Clusters",
                    "deprecated": false,
                    "metrics": {
                        "query_latency": "Latency",
                        "query_count": "Number Of Queries",
                        "indices_count": "Indices",
                        "active_shards": "Active",
                        "active_primaryshards": "Active Primary",
                        "initializing_shards": "Initializing",
                        "relocating_shards": "Relocating",
                        "unassigned_shards": "Unassigned",
                        "document_count": "Overall Documents",
                        "index_count": "Added",
                        "deleted_count": "Removed",
                        "shards.node_active_shards": "Active Shards",
                        "indices.document_count": "Documents",
                        "indices.store_size": "Indices size"
                    }
                },
                "elasticsearchindexserviceinstance": {
                    "label": "Elasticsearch Index Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "elasticsearchnode": {
                    "label": "Elasticsearch Nodes",
                    "deprecated": false,
                    "metrics": {
                        "indices.query_latency": "Latency",
                        "indices.query_count": "Number Of Queries",
                        "indices_count": "Indices",
                        "shards.node_active_shards": "Active",
                        "shards.node_active_primary_shards": "Active Primary",
                        "indices.document_count": "Overall Documents",
                        "indices.index_count": "Added",
                        "indices.deleted_count": "Removed",
                        "indices.refresh_count": "Refresh Count",
                        "indices.flush_count": "Flush Count",
                        "indices.segment_count": "Segments",
                        "indices.refresh_time": "Refresh Time",
                        "indices.flush_time": "Flush Time",
                        "threads.search_active": "Search",
                        "threads.index_active": "Index",
                        "threads.bulk_active": "Bulk",
                        "threads.merge_active": "Merge",
                        "threads.flush_active": "Flush",
                        "threads.get_active": "Get",
                        "threads.management_active": "Management",
                        "threads.refresh_active": "Refresh",
                        "threads.search_rejected": "Search",
                        "threads.index_rejected": "Index",
                        "threads.bulk_rejected": "Bulk",
                        "threads.get_rejected": "Get",
                        "threads.search_queue": "Search",
                        "threads.index_queue": "Index",
                        "threads.bulk_queue": "Bulk",
                        "threads.merge_queue": "Merge",
                        "threads.flush_queue": "Flush",
                        "threads.get_queue": "Get",
                        "threads.management_queue": "Management",
                        "threads.refresh_queue": "Refresh"
                    }
                },
                "endpoint": {
                    "label": "Endpoints",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate"
                    }
                },
                "etcd": {
                    "label": "Etcd Nodes",
                    "deprecated": false,
                    "metrics": {
                        "requests_received": "Received",
                        "requests_sent": "Sent",
                        "bytes_per_sec_received": "Received",
                        "bytes_per_sec_sent": "Sent",
                        "storage.expire_count": "Expire count",
                        "storage.watchers": "Watchers",
                        "storage.compare_and_swap_fail": "Compare and swap fail",
                        "storage.compare_and_swap_success": "Compare and swap success",
                        "storage.compare_and_delete_fail": "Compare and delete fail",
                        "storage.compare_and_delete_success": "Compare and delete success",
                        "storage.create_fail": "Create fail",
                        "storage.create_success": "Create success",
                        "storage.delete_fail": "Delete fail",
                        "storage.delete_success": "Delete success",
                        "storage.gets_fail": "Gets fail",
                        "storage.gets_success": "Gets success",
                        "storage.sets_fail": "Sets fail",
                        "storage.sets_success": "Sets success",
                        "storage.update_fail": "Update fail",
                        "storage.update_success": "Update success"
                    }
                },
                "finagleapplicationcontainer": {
                    "label": "Finagle Apps",
                    "deprecated": false,
                    "metrics": {}
                },
                "f5": {
                    "label": "F5",
                    "deprecated": false,
                    "metrics": {}
                },
                "ftpserviceinstance": {
                    "label": "FTP Server Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "garden": {
                    "label": "Garden Containers",
                    "deprecated": false,
                    "metrics": {
                        "cpu.total": "Total",
                        "cpu.system": "Kernel",
                        "cpu.user": "User",
                        "memory.usage": "Usage",
                        "memory.total_rss": "RSS",
                        "memory.total_cache": "Cache",
                        "memory.active_anon": "active_anon",
                        "memory.active_file": "active_file",
                        "memory.inactive_anon": "inactive_anon",
                        "memory.inactive_file": "inactive_file",
                        "disk.totalBytesUsed": "Total Bytes",
                        "disk.totalInodesUsed": "Total Inodes",
                        "exclusiveBytesUsed": "Exclusive Inodes",
                        "network.rxBytes": "Received",
                        "network.txBytes": "Transmitted"
                    }
                },
                "glassfishapplicationcontainer": {
                    "label": "Glassfish",
                    "deprecated": false,
                    "metrics": {
                        "http_request_count": "Requests",
                        "http_error": "Errors",
                        "keep_alive_connections": "Connections",
                        "keep_alive_flushes": "Flushes",
                        "keep_alive_hits": "Hits",
                        "keep_alive_refusals": "Refusals",
                        "keep_alive_timeouts": "Timeouts",
                        "file_cache_hits": "Hits",
                        "file_cache_misses": "Misses",
                        "file_cache_info_hits": "Info Hits",
                        "file_cache_info_misses": "Info Misses",
                        "jdbc_connection_used": "Used",
                        "jdbc_connection_free": "Free",
                        "connections_open": "Open",
                        "connections_overflows": "Overflows",
                        "connections_queued": "Queued",
                        "connections_peak_queued": "Peak Queued",
                        "connections_ticks_total_queued": "Ticks Total Queued",
                        "connections_total": "Total",
                        "http_max_time": "Max Time",
                        "http_proc_time": "Processing Time",
                        "file_cache_rate": "Hit rate",
                        "file_cache_info_rate": "Info hit rate"
                    }
                },
                "golangruntimeplatform": {
                    "label": "Go Apps",
                    "deprecated": false,
                    "metrics": {
                        "metrics.memory.pause_ns": "GC Pause",
                        "metrics.goroutine": "Executed Goroutines",
                        "metrics.memory.heap_objects": "Objects",
                        "metrics.memory.heap_sys": "System Heap",
                        "metrics.memory.heap_in_use": "Used Heap",
                        "metrics.memory.alloc": "Allocated Memory",
                        "metrics.memory.sys": "Obtained From System"
                    }
                },
                "hadoopyarn": {
                    "label": "Hadoop YARNs",
                    "deprecated": false,
                    "metrics": {
                        "activeNodes": "Active Nodes",
                        "lostNodes": "Lost Nodes",
                        "unhealthyNodes": "Unhealthy Nodes",
                        "decommissionedNodes": "Decommissioned Nodes",
                        "appsRunning": "Apps Running",
                        "appsPending": "Apps Pending",
                        "appsFailed": "Apps Failed",
                        "usedMemory": "Used Memory",
                        "availableMemory": "Available Memory",
                        "reservedMemory": "Reserved Memory",
                        "usedVirtualCores": "Used Virtual Cores",
                        "availableVirtualCores": "Available Virtual Cores",
                        "reservedVirtualCores": "Reserved Virtual Cores",
                        "containersRunning": "Containers Running"
                    }
                },
                "hadoopyarnnode": {
                    "label": "Hadoop YARN Nodes",
                    "deprecated": false,
                    "metrics": {
                        "allocatedVCores": "Allocated Virtual Cores",
                        "availableVCores": "Available Virtual Cores",
                        "allocatedMem": "Allocated Memory",
                        "availableMem": "Available Memory"
                    }
                },
                "haproxy": {
                    "label": "HAProxy",
                    "deprecated": false,
                    "metrics": {}
                },
                "hazelcastcluster": {
                    "label": "HazelcastClusters",
                    "deprecated": false,
                    "metrics": {
                        "isClusterSafe": "Is Cluster Safe",
                        "nodeCount": "Node Count"
                    }
                },
                "hazelcastnode": {
                    "label": "Hazelcast Nodes",
                    "deprecated": false,
                    "metrics": {
                        "nodeMetrics.clientEndpointCount": "Client Endpoint Count",
                        "nodeMetrics.eventQueueSize": "Migration Queue Size",
                        "nodeMetrics.migrationQueueSize": "Operation Count",
                        "isLiteMember": "Is Lite Member",
                        "isLocalMemberSafe": "Is Local Member Safe",
                        "distributedObjects.cacheCount": "ICache",
                        "distributedObjects.mapCount": "IMap",
                        "distributedObjects.replicatedMapCount": "ReplicatedMap",
                        "distributedObjects.multiMapCount": "MultiMap",
                        "distributedObjects.queueCount": "IQueue",
                        "distributedObjects.listCount": "IList",
                        "distributedObjects.setCount": "ISet",
                        "distributedObjects.topicCount": "ITopic",
                        "distributedObjects.executorCount": "IExecutorService",
                        "distributedObjects.otherCount": "Other",
                        "executorServiceQueueSize.asyncExecutor": "ASyncExecutor",
                        "executorServiceQueueSize.clientExecutor": "ClientExecutor",
                        "executorServiceQueueSize.queryExecutor": "QueryExecutor",
                        "executorServiceQueueSize.scheduledExecutor": "ScheduledExecutor",
                        "executorServiceQueueSize.systemExecutor": "SystemExecutor",
                        "executorServiceQueueSize.ioExecutor": "IOExecutor"
                    }
                },
                "httpd": {
                    "label": "Apache HTTPds",
                    "deprecated": false,
                    "metrics": {
                        "requests": "Requests",
                        "kBytes": "kBytes",
                        "conns_total": "Connections",
                        "conns_async_writing": "Async Connections Writing",
                        "conns_async_keep_alive": "Async Connections Keep-alive",
                        "conns_async_closing": "Async Connections Closing",
                        "worker.waiting": "Waiting",
                        "worker.starting": "Starting",
                        "worker.reading": "Reading",
                        "worker.writing": "Writing",
                        "worker.keepalive": "Keepalive",
                        "worker.dns": "Dns",
                        "worker.closing": "Closing",
                        "worker.logging": "Logging",
                        "worker.graceful": "Graceful",
                        "worker.idle": "Idle",
                        "cpu_load": "CPU load",
                        "bytes_per_req": "Traffic per request"
                    }
                },
                "instanaagent": {
                    "label": "Instana Agents",
                    "deprecated": false,
                    "metrics": {
                        "cpu.load": "Load",
                        "memory.used": "Used",
                        "memory.nativeUsed": "Native Used",
                        "net.rx": "Received",
                        "net.tx": "Sent",
                        "sensors.time": "Sensor time",
                        "discovery.time": "Discovery time",
                        "sensors.count": "Sensor Count",
                        "discovery.count": "Discovery Count"
                    }
                },
                "jbossasapplicationcontainer": {
                    "label": "JBoss",
                    "deprecated": false,
                    "metrics": {}
                },
                "jbossdatagrid": {
                    "label": "JBoss Data Grids",
                    "deprecated": false,
                    "metrics": {
                        "hotRod.numberOfLocalConnections": "Number Of Local Connections",
                        "hotRod.numberOfGlobalConnections": "Number Of Global Connections"
                    }
                },
                "jettyapplicationcontainer": {
                    "label": "Jetty",
                    "deprecated": false,
                    "metrics": {
                        "idleThreads": "Idle Threads",
                        "busyThreads": "Busy Threads",
                        "threads": "Total Threads",
                        "threadsQueueSize": "Threads Queue Size"
                    }
                },
                "jiraapplication": {
                    "label": "Atlassian JIRAs",
                    "deprecated": false,
                    "metrics": {
                        "instruments.http.sessions": "Current Sessions",
                        "instruments.concurrent.requests": "Concurrent Requests",
                        "instruments.dbcp.numIdle": "Idle Connections"
                    }
                },
                "jvmruntimeplatform": {
                    "label": "JVMs",
                    "deprecated": false,
                    "metrics": {
                        "threads.new": "New",
                        "threads.runnable": "Runnable",
                        "threads.timed-waiting": "Timed-Waiting",
                        "threads.waiting": "Waiting",
                        "threads.blocked": "Blocked",
                        "suspension.time": "Time",
                        "memory.used": "Used"
                    }
                },
                "kafka": {
                    "label": "Kafka Nodes",
                    "deprecated": false,
                    "metrics": {
                        "broker.bytesIn": "In",
                        "broker.bytesOut": "Out",
                        "broker.bytesRejected": "Rejected",
                        "broker.produceRequests": "Produce Throughput",
                        "broker.fetchConsumerRequests": "Fetch Consumer Throughput",
                        "broker.fetchFollowerRequests": "Fetch Follower Throughput",
                        "broker.totalTimeProduce": "Produce Latency",
                        "broker.totalTimeFetchConsumer": "Fetch Consumer Latency",
                        "broker.totalTimeFetchFollower": "Fetch Follower Latency",
                        "broker.failedFetch": "Fetch",
                        "broker.failedProduce": "Produce",
                        "broker.underReplicatedPartitions": "Under-replicated Partitions",
                        "broker.offlinePartitionsCount": "Offline Partitions",
                        "broker.leaderElections": "Leader Elections",
                        "broker.uncleanLeaderElections": "Unclean Leader Elections",
                        "broker.isrShrinks": "ISR Shrinks",
                        "broker.isrExpansions": "ISR Expansions",
                        "broker.activeControllerCount": "Active controller count",
                        "broker.networkProcessorIdle": "Network Processor",
                        "broker.requestHandlerIdle": "Request Handler",
                        "broker.partitionCount": "Count",
                        "broker.messagesIn": "#",
                        "logflush.mean": "Mean ms",
                        "logflush.inv": "Flushes"
                    }
                },
                "kafkacluster": {
                    "label": "Kafka Cluster",
                    "deprecated": false,
                    "metrics": {
                        "nodeCount": "Nodes"
                    }
                },
                "kubernetescluster": {
                    "label": "Kubernetes Clusters",
                    "deprecated": false,
                    "metrics": {
                        "allocatedCapacityPodsRatio": "Pods Allocation",
                        "requiredCapacityCPURatio": "CPU Requests Allocation",
                        "limitCapacityCPURatio": "CPU Limits Allocation",
                        "requiredCapacityMemoryRatio": "Memory Requests Allocation",
                        "limitCapacityMemoryRatio": "Memory Limits Allocation",
                        "requiredCPU": "CPU Requests",
                        "limitCPU": "CPU Limits",
                        "nodes.capacity_cpu": "CPU Capacity",
                        "requiredMemory": "Memory Requests",
                        "limitMemory": "Memory Limits",
                        "nodes.capacity_mem": "Memory Capacity",
                        "podsRunning": "Running Pods",
                        "podsPending": "Pending Pods",
                        "pods.count": "Allocated Pods",
                        "nodes.capacity_pods": "Pods Capacity",
                        "nodes.OutOfDisk.True": "OutOfDisk nodes",
                        "nodes.MemoryPressure.True": "MemoryPressure nodes",
                        "nodes.DiskPressure.True": "DiskPressure nodes",
                        "nodes.KubeletReady.False": "KubeletNotReady nodes",
                        "availableReplicas": "Available Replicas",
                        "desiredReplicas": "Desired Replicas",
                        "nodes.count": "Number of Nodes"
                    }
                },
                "kubernetespod": {
                    "label": "Kubernetes Pods",
                    "deprecated": false,
                    "metrics": {
                        "containers.count": "Containers",
                        "cpuRequests": "CPU Requests",
                        "cpuLimits": "CPU Limits",
                        "memoryRequests": "Memory Requests",
                        "memoryLimits": "Memory Limits"
                    }
                },
                "kubernetesnode": {
                    "label": "Kubernetes Nodes",
                    "deprecated": false,
                    "metrics": {
                        "allocatedPods": "Allocated Pods",
                        "cap_pods": "Pods Capacity",
                        "required_mem": "Memory Requests",
                        "limit_mem": "Memory Limits",
                        "cap_mem": "Memory Capacity",
                        "required_cpu": "CPU Requests",
                        "limit_cpu": "CPU Limits",
                        "cap_cpu": "CPU Capacity",
                        "alloc_pods_percentage": "Pods Allocation",
                        "required_cpu_percentage": "CPU Requests Allocation",
                        "limit_cpu_percentage": "CPU Limits Allocation",
                        "required_mem_percentage": "Memory Requests Allocation",
                        "limit_mem_percentage": "Memory Limits Allocation"
                    }
                },
                "kubernetesdeployment": {
                    "label": "Kubernetes Deployments",
                    "deprecated": false,
                    "metrics": {
                        "availableReplicas": "Available",
                        "desiredReplicas": "Desired",
                        "phase.Pending.count": "Pending",
                        "conditions.PodScheduled.False": "Unscheduled",
                        "conditions.Ready.False": "Unready",
                        "duration": "Pending phase duration",
                        "pods.count": "Pods",
                        "pods.required_mem": "Memory Requests",
                        "pods.limit_mem": "Memory Limits",
                        "pods.required_cpu": "CPU Requests",
                        "pods.limit_cpu": "CPU Limits"
                    }
                },
                "kubernetesnamespace": {
                    "label": "Kubernetes Namespaces",
                    "deprecated": false,
                    "metrics": {
                        "cap_requests_memory": "Capacity Requests",
                        "used_requests_memory": "Used Requests",
                        "cap_limits_memory": "Capacity Limits ",
                        "used_limits_memory": "Used Limits",
                        "cap_requests_cpu": "Capacity Requests",
                        "used_requests_cpu": "Used Requests",
                        "cap_limits_cpu": "Capacity Limits",
                        "used_limits_cpu": "Used Limits",
                        "used_pods": "Used Pods",
                        "cap_pods": "Pods Capacity",
                        "used_pods_percentage": "Pods Allocation",
                        "required_cpu_percentage": "CPU Requests Allocation",
                        "limit_cpu_percentage": "CPU Limits Allocation",
                        "required_mem_percentage": "Memory Requests Allocation",
                        "limit_mem_percentage": "Memory Limits Allocation"
                    }
                },
                "openshiftdeploymentconfig": {
                    "label": "Openshift Deployment Configs",
                    "deprecated": false,
                    "metrics": {
                        "availableReplicas": "Available",
                        "desiredReplicas": "Desired",
                        "phase.Pending.count": "Pending",
                        "conditions.PodScheduled.False": "Unscheduled",
                        "conditions.Ready.False": "Unready",
                        "duration": "Pending phase duration",
                        "pods.count": "Pods",
                        "pods.required_mem": "Memory Requests",
                        "pods.limit_mem": "Memory Limits",
                        "pods.required_cpu": "CPU Requests",
                        "pods.limit_cpu": "CPU Limits"
                    }
                },
                "ldaplogicalconnection": {
                    "label": "LDAP Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "ldaplogicalservice": {
                    "label": "LDAP",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "ldapserviceinstance": {
                    "label": "LDAP Service Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalbatch": {
                    "label": "Batch Jobs",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalbatchconnection": {
                    "label": "Batch Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalcassandraconnection": {
                    "label": "Cassandra Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicaldatabase": {
                    "label": "Databases",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicaldatabaseconnection": {
                    "label": "Database Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalejbconnection": {
                    "label": "EJB Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalelasticsearchconnection": {
                    "label": "Elasticsearch Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalelasticsearchindex": {
                    "label": "Elasticsearch Indices",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalftpconnection": {
                    "label": "Logical FTP Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalftpservice": {
                    "label": "FTP Servers",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalhttpconnection": {
                    "label": "Http Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicaljdbcconnection": {
                    "label": "JDBC Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalkafkaconsumerconnection": {
                    "label": "Kafka Consumer Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalkafkapublisherconnection": {
                    "label": "Kafka Publisher Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmessagebroker": {
                    "label": "Message Brokers",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmessageconsumer": {
                    "label": "Message Consumers",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmessageconsumerconnection": {
                    "label": "Message Consumer Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmessagepublisherconnection": {
                    "label": "Message Publisher Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmongodbconnection": {
                    "label": "MongoDB Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmongodbdatabase": {
                    "label": "MongoDB Databases",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmsmqconsumerconnection": {
                    "label": "MSMQ Consumer Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalmsmqpublisherconnection": {
                    "label": "MSMQ Publisher Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalneo4jconnection": {
                    "label": "Neo4j Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalneo4jdatabase": {
                    "label": "Neo4j Databases",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalrabbitmqconsumerconnection": {
                    "label": "Rabbit MQ Consumer Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalrabbitmqpublisherconnection": {
                    "label": "Rabbit MQ Publisher Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalredisconnection": {
                    "label": "Redis Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalredisdatabase": {
                    "label": "Redis Databases",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalrpcconnection": {
                    "label": "RPC Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalrpcendpoint": {
                    "label": "RPC Endpoints",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "logicalwebapp": {
                    "label": "Web Services",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "mariadbdatabase": {
                    "label": "MariaDBs",
                    "deprecated": false,
                    "metrics": {
                        "status.THREADS_CONNECTED": "Connections",
                        "status.MAX_USED_CONNECTIONS": "Max used connections",
                        "status.ABORTED_CONNECTS": "Aborted connects",
                        "status.SLOW_QUERIES": "Slow Queries",
                        "status.KEY_READ_REQUESTS": "Read Requests",
                        "status.KEY_WRITE_REQUESTS": "Write Requests",
                        "status.KEY_READS": "Reads",
                        "status.KEY_WRITES": "Writes",
                        "status.ARIA_PAGECACHE_READS": "Pagecache Reads",
                        "status.ARIA_PAGECACHE_WRITES": "Pagecache Writes"
                    }
                },
                "memcached": {
                    "label": "Memcacheds Nodes",
                    "deprecated": false,
                    "metrics": {
                        "cmd_get": "Gets",
                        "cmd_set": "Sets",
                        "bytes_read": "Bytes reads",
                        "bytes_write": "Bytes writes",
                        "get_hits": "Get hits",
                        "get_misses": "Get misses",
                        "delete_hits": "Delete hits",
                        "delete_misses": "Delete misses",
                        "cmd_flush": "Flush",
                        "evictions": "Evictions",
                        "bytes": "Used bytes",
                        "get_hit_rate": "Get hit ratio",
                        "delete_hit_rate": "Delete hit ratio",
                        "conn_connected": "Connected",
                        "conn_queued": "Queued",
                        "conn_yields": "Yields"
                    }
                },
                "messagebrokerserviceinstance": {
                    "label": "Message Broker Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "messageconsumerserviceinstance": {
                    "label": "Message Consumer Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "mongodb": {
                    "label": "MongoDB Nodes",
                    "deprecated": false,
                    "metrics": {
                        "documents.deleted": "Deleted",
                        "documents.inserted": "Inserted",
                        "documents.returned": "Returned",
                        "documents.updated": "Updated",
                        "connections": "Connections",
                        "repl.apply_ops": "Replication Apply Operations",
                        "repl.apply_bathes": "Replication Apply Batches",
                        "repl.apply_bathes_total_ms": "Replication Apply Batch Total",
                        "repl.buffer_count": "Replication Buffer Count",
                        "repl.buffer_size_bytes": "Replication Buffer Size",
                        "repl.network_ops": "Replication Network Ops",
                        "repl.network_bytes": "Replication Network Traffic",
                        "repl.preload_docs_num": "Replication Preload Docs",
                        "repl.preload_docs_total_ms": "Replication Preload Total",
                        "repl.preload_idx_num": "Replication Preload Indexes",
                        "repl.preload_idx_total_ms": "Replication Preload Indexes Total",
                        "repl.replication_lag": "Replication Lag"
                    }
                },
                "mongodbdatabaseserviceinstance": {
                    "label": "MongoDB Databases",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "mongodbreplicaset": {
                    "label": "MongoDB Replica Set",
                    "deprecated": false,
                    "metrics": {
                        "nodeCount": "Nodes",
                        "documents.deleted": "Deleted",
                        "documents.inserted": "Inserted",
                        "documents.returned": "Returned",
                        "documents.updated": "Updated",
                        "connections": "Connections",
                        "repl.apply_ops": "Replication Apply Operations",
                        "repl.apply_bathes": "Replication Apply Batches",
                        "repl.apply_bathes_total_ms": "Replication Apply Batch Total",
                        "repl.buffer_count": "Replication Buffer Count",
                        "repl.buffer_size_bytes": "Replication Buffer Size",
                        "repl.network_ops": "Replication Network Ops",
                        "repl.network_bytes": "Replication Network Traffic",
                        "repl.preload_docs_num": "Replication Preload Docs",
                        "repl.preload_docs_total_ms": "Replication Preload Total",
                        "repl.preload_idx_num": "Replication Preload Indexes",
                        "repl.preload_idx_total_ms": "Replication Preload Indexes Total",
                        "repl.replication_lag": "Replication Lag"
                    }
                },
                "msiis": {
                    "label": "Internet Information Servers",
                    "deprecated": false,
                    "metrics": {}
                },
                "mssqldatabase": {
                    "label": "MsSQL Instances",
                    "deprecated": false,
                    "metrics": {
                        "generalstats._total.user_connections": "User Connections",
                        "waitstats.PAGEIOLATCH_EX.wait_time_ms": "Page IO-Latch EX",
                        "waitstats.PAGEIOLATCH_SH.wait_time_ms": "Page IO-Latch SH",
                        "waitstats.ASYNC_NETWORK_IO.wait_time_ms": "Async Network IO",
                        "waitstats.CXPACKET.wait_time_ms": "CX-Packet",
                        "waitstats.WRITELOG.wait_time_ms": "Writelog",
                        "iostats._total.num_of_bytes_read": "Reads",
                        "iostats._total.num_of_bytes_written": "Writes",
                        "perfcounters.databases._total.write_transactions_sec": "Write Transactions",
                        "perfcounters.sql_errors.user_errors.errors_sec": "User Errors",
                        "perfcounters.sql_errors.db_offline_errors.errors_sec": "DB Offline Errors",
                        "perfcounters.sql_errors.kill_connection_errors.errors_sec": "Kill Connection Errors"
                    }
                },
                "mule": {
                    "label": "Mule ESB",
                    "deprecated": false,
                    "metrics": {}
                },
                "mysqldatabase": {
                    "label": "MySQL DBs",
                    "deprecated": false,
                    "metrics": {
                        "status.COM_SELECT": "SELECTS",
                        "status.COM_UPDATE": "UPDATES",
                        "status.COM_INSERT": "INSERTS",
                        "status.COM_DELETE": "DELETES",
                        "status.COM_OTHER": "OTHER",
                        "status.SLOW_QUERIES": "status.SLOW_QUERIES",
                        "status.COM_SHOW_ERRORS": "status.COM_SHOW_ERRORS",
                        "status.DB_QUERY_LATENCY": "avg. Query Latency",
                        "status.THREADS_CONNECTED": "Connections",
                        "status.MAX_USED_CONNECTIONS": "Max used connections",
                        "status.ABORTED_CONNECTS": "Aborted connects",
                        "status.KEY_READ_REQUESTS": "Read Requests",
                        "status.KEY_WRITE_REQUESTS": "Write Requests",
                        "status.KEY_READS": "Reads",
                        "status.KEY_WRITES": "Writes"
                    }
                },
                "netcoreruntimeplatform": {
                    "label": ".NET Core Apps",
                    "deprecated": false,
                    "metrics": {
                        "metrics.gcCount": "GC Count",
                        "metrics.exceptionThrownCount": "Exceptions Thrown",
                        "metrics.contentionCount": "Contention Count",
                        "metrics.heapSizeGen0": "Generation 0",
                        "metrics.heapSizeGen1": "Generation 1",
                        "metrics.heapSizeGen2": "Generation 2",
                        "metrics.heapSizeGen3": "Generation 3"
                    }
                },
                "neo4jserviceinstance": {
                    "label": "Neo4j Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "nginx": {
                    "label": "Nginx",
                    "deprecated": false,
                    "metrics": {
                        "requests": "Requests / s",
                        "connections.accepted": "Accepted connections",
                        "connections.handled": "Handled connections",
                        "connections.active": "Active connections",
                        "connections.dropped": "Dropped connections",
                        "connections.reading": "Reading",
                        "connections.writing": "Writing",
                        "connections.waiting": "Waiting",
                        "nginx_plus.processes.respawned": "Processes respawned",
                        "nginx_plus.http.upstreams.peers.failed": "Upstreams failed",
                        "nginx_plus.http.server_zones.5xx_responses": "5xx responses",
                        "nginx_plus.http.caches.miss.responses": "Miss responses",
                        "nginx_plus.http.caches.hit.responses": "Hit responses",
                        "nginx_plus.http.caches.size": "Caches size",
                        "nginx_plus.http.caches.max_size": "Max caches size",
                        "nginx_plus.http.caches.cold": "# of cold caches",
                        "nginx_plus.ssl.handshakes": "Handshakes",
                        "nginx_plus.ssl.handshakes_failed": "Failed hanshakes",
                        "nginx_plus.ssl.session_reuses": "Session reuses"
                    }
                },
                "nodejsruntimeplatform": {
                    "label": "Node.js Apps",
                    "deprecated": false,
                    "metrics": {
                        "gc.gcPause": "GC Pause",
                        "activeHandles": "#Handles",
                        "activeRequests": "#Requests",
                        "gc.minorGcs": "#Minor GCs",
                        "gc.majorGcs": "#Major GCs",
                        "memory.rss": "RSS",
                        "memory.heapUsed": "Heap Size",
                        "gc.usedHeapSizeAfterGc": "Heap Size After GC",
                        "libuv.max": "Longest time spent in a single loop",
                        "libuv.sum": "Total time spent in loop",
                        "libuv.lag": "Event loop lag",
                        "libuv.num": "Loops per second",
                        "healthcheckResult": "Health check result"
                    }
                },
                "nomadscheduler": {
                    "label": "Nomad Clients",
                    "deprecated": false,
                    "metrics": {
                        "nomad.client.allocated.cpu": "Total amount of CPU shares the scheduler has allocated to tasks",
                        "nomad.client.allocated.disk": "Total amount of disk space the scheduler has allocated to tasks",
                        "nomad.client.allocated.iops": "Total amount of IOPS the scheduler has allocated to tasks",
                        "nomad.client.allocated.memory": "Total amount of memory the scheduler has allocated to tasks",
                        "nomad.client.allocations.blocked": "Blocked allocations",
                        "nomad.client.allocations.migrating": "Migrating allocations",
                        "nomad.client.allocations.pending": "Pending allocations",
                        "nomad.client.allocations.running": "Running allocations",
                        "nomad.client.allocations.terminal": "Terminated allocations",
                        "nomad.client.unallocated.cpu": "Total amount of CPU shares free for the scheduler to allocate to tasks",
                        "nomad.client.unallocated.disk": "Total amount of disk space free for the scheduler to allocate to tasks",
                        "nomad.client.unallocated.iops": "Total amount of IOPS free for the scheduler to allocate to tasks",
                        "nomad.client.unallocated.memory": "Total amount of memory free for the scheduler to allocate to tasks",
                        "nomad.nomad.blocked_evals.total_blocked": "Total amount of blocked evaluations",
                        "nomad.nomad.blocked_evals.total_escaped": "Total amount of escaped evaluations",
                        "nomad.nomad.blocked_evals.total_quota_limit": "Total quota limit for blocked evaluations",
                        "nomad.nomad.broker._core.ready": "Broker core ready",
                        "nomad.nomad.broker._core.unacked": "Broker core unacknowledged",
                        "nomad.nomad.broker.total_blocked": "Broker total blocked",
                        "nomad.nomad.broker.total_ready": "Broker total ready",
                        "nomad.nomad.broker.total_unacked": "Broker total unacknowledged",
                        "nomad.nomad.broker.total_waiting": "Broker total waiting",
                        "nomad.nomad.heartbeat.active": "Heartbeat active",
                        "nomad.nomad.plan.queue_depth": "Nomad plan queue depth",
                        "nomad.nomad.vault.distributed_tokens_revoking": "Nomad vault distributed tokens revoking",
                        "nomad.runtime.alloc_bytes": "Runtime allocated bytes",
                        "nomad.runtime.free_count": "Runtime free count",
                        "nomad.runtime.heap_objects": "Runtime heap objects",
                        "nomad.runtime.malloc_count": "Runtime malloc count",
                        "nomad.runtime.num_goroutines": "Runtime number of go routines",
                        "nomad.runtime.sys_bytes": "Runtime system bytes",
                        "nomad.runtime.total_gc_pause_ns": "Runtime total amount of gc pause in ns",
                        "nomad.runtime.total_gc_runs": "Runtime total amount of gc runs",
                        "nomad.uptime": "Uptime"
                    }
                },
                "oracledb": {
                    "label": "OracleDBs",
                    "deprecated": false,
                    "metrics": {
                        "stats.dbTime": "DB Time",
                        "stats.cpuTime": "DB CPU Time",
                        "stats.sqlExecuteTime": "SQL Execute Time",
                        "stats.parseTime": "Parse Time",
                        "stats.cpuTimeDbTimeRatio": "DB CPU Time/DB Time Ratio",
                        "stats.timeWaited.userIO": "User I/O",
                        "stats.timeWaited.other": "Other",
                        "stats.timeWaited.systemIO": "System I/O",
                        "stats.timeWaited.concurrency": "Concurrency",
                        "stats.timeWaited.scheduler": "Scheduler",
                        "stats.timeWaited.application": "Application",
                        "stats.timeWaited.commit": "Commit",
                        "stats.timeWaited.configuration": "Configuration",
                        "stats.timeWaited.administrative": "Administrative",
                        "stats.timeWaited.network": "Network",
                        "stats.timeWaited.queue": "Queueing",
                        "stats.sqlExecuteCount": "Sql Execute Count",
                        "stats.averageSqlExecuteTime": "Average Sql Execution Time",
                        "stats.hardParseCount": "Hard Parse Count",
                        "stats.totalParseCount": "Total Parse Count",
                        "stats.softTotalParsesRatio": "Soft/Total Parse Ratio",
                        "stats.executesWithoutParsesRatio": "Executes Without Parses Ratio",
                        "stats.userCalls": "User Calls",
                        "stats.recursiveCalls": "Recursive Calls",
                        "stats.userCommits": "User Commits",
                        "stats.userRollbacks": "User Rollbacks",
                        "stats.userLogOns": "User Log Ons",
                        "stats.physicalReads": "Physical Reads",
                        "stats.sessionLogicalReads": "Session Logical Reads",
                        "stats.bufferCacheHitRatio": "Buffer Cache Hit Ratio",
                        "stats.activeUserSessions": "Active User Sessions",
                        "stats.inactiveUserSessions": "Inactive User Sessions",
                        "stats.backgroundSessions": "Background Sessions",
                        "stats.usedSessionsRatio": "Sessions/Session Limit"
                    }
                },
                "ping": {
                    "label": "Ping",
                    "deprecated": false,
                    "metrics": {
                        "duration": "Duration"
                    }
                },
                "phpfpmruntimeplatform": {
                    "label": "PHP-FPM Runtimes",
                    "deprecated": false,
                    "metrics": {}
                },
                "postgresqldatabase": {
                    "label": "PostgreSQL DBs",
                    "deprecated": false,
                    "metrics": {
                        "totalCommittedTransactions": "Committed Transactions",
                        "max_conn_pct": "Connection Usage",
                        "total_active_connections": "Total Active Connections"
                    }
                },
                "process": {
                    "label": "Processes",
                    "deprecated": false,
                    "metrics": {
                        "mem.virtual": "Virtual",
                        "mem.resident": "Resident",
                        "mem.share": "Share",
                        "cpu.user": "User",
                        "cpu.sys": "System",
                        "ctx_switches.voluntary": "Voluntary",
                        "ctx_switches.nonvoluntary": "Nonvoluntary"
                    }
                },
                "pythonruntimeplatform": {
                    "label": "Python Apps",
                    "deprecated": false,
                    "metrics": {
                        "metrics.ru_utime": "Time Spent In User Mode",
                        "metrics.ru_stime": "Time Spent In System Mode",
                        "metrics.ru_ixrss": "Shared Memory Size",
                        "metrics.ru_idrss": "Unshared Memory Size",
                        "metrics.ru_maxrss": "Maximum Resident Set Size",
                        "metrics.ru_isrss": "Unshare Stack Size",
                        "metrics.ru_minflt": "Page Faults Requiring I/O",
                        "metrics.ru_majflt": "Page Faults Not Requiring I/O",
                        "metrics.ru_nswap": "Swap Outs",
                        "metrics.ru_inblock": "Block Input Operations",
                        "metrics.ru_oublock": "Block Output Operations",
                        "metrics.ru_msgsnd": "Messages Sent",
                        "metrics.ru_msgrcv": "Messages Received",
                        "metrics.ru_nsignals": "Signals Received",
                        "metrics.ru_nvcsw": "Voluntary Context Switches",
                        "metrics.ru_nivcsw": "Involuntary Context Switches",
                        "metrics.rgc.collect0": "Collect 0",
                        "metrics.rgc.collect1": "Collect 1",
                        "metrics.rgc.collect2": "Collect 2",
                        "metrics.rgc.threshold0": "Threshold 0",
                        "metrics.rgc.threshold1": "Threshold 1",
                        "metrics.rgc.threshold2": "Threshold 2",
                        "metrics.alive_threads": "Alive Threads",
                        "metrics.dummy_threads": "Dummy Threads",
                        "metrics.daemon_threads": "Daemon Threads"
                    }
                },
                "rabbitmq": {
                    "label": "RabbitMQ",
                    "deprecated": false,
                    "metrics": {
                        "overview.publish_rate": "Published per 5 seconds",
                        "overview.deliver_rate": "Delivered per 5 seconds",
                        "overview.ack_rate": "Acknowledged per 5 seconds",
                        "overview.messages_ready": "Messages ready",
                        "overview.messages_unacknowledged": "Messages unacknowledged",
                        "overview.messages": "Messages total",
                        "overview.messages_ready_rate": "Messages ready rate",
                        "overview.messages_unacknowledged_rate": "Unacknowledged rate",
                        "overview.consumers": "Consumers",
                        "overview.connections": "Connections"
                    }
                },
                "redisserviceinstance": {
                    "label": "Redis Databases",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "rpcendpointserviceinstance": {
                    "label": "RPC Endpoint Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "rubyruntimeplatform": {
                    "label": "Ruby Apps",
                    "deprecated": false,
                    "metrics": {
                        "memory.rss_size": "Resident",
                        "gc.heap_live": "Live",
                        "gc.heap_free": "Free",
                        "gc.minorGcs": "#Minor GCs",
                        "gc.majorGcs": "#Major GCs",
                        "gc.totalTime": "#GC Run Duration",
                        "thread.count": "#Thread Count"
                    }
                },
                "saphana": {
                    "label": "SAP HANA",
                    "deprecated": false,
                    "metrics": {
                        "stats.usedMemory": "Used Memory",
                        "stats.residentMemory": "Resident Memory",
                        "stats.cpuUsage": "Cpu Usage",
                        "stats.diskUsageData": "Data Size",
                        "stats.diskUsageLog": "Log Size",
                        "stats.diskUsageTrace": "Trace Size",
                        "stats.sessionsTotalCount": "Total",
                        "stats.sessionsIdleCount": "Idle",
                        "stats.sessionsRunningCount": "Running",
                        "stats.sessionsBlockedCount": "Blocked",
                        "stats.sessionsBlockingCount": "Blocking",
                        "stats.sessionsDatabaseUsers": "Database Users",
                        "stats.sessionsApplications": "Running",
                        "stats.sessionsApplicationUsers": "Application Users",
                        "stats.threadsTotalCount": "Total",
                        "stats.threadsActiveCount": "Active",
                        "stats.threadsBlockedCount": "Blocked",
                        "stats.threadsJobWorkerCount": "Total",
                        "stats.threadsJobWorkerActiveCount": "Active",
                        "stats.threadsJobWorkerBlockedCount": "Blocked",
                        "stats.threadsSqlExecutorCount": "Total",
                        "stats.threadsSqlExecutorActiveCount": "Active",
                        "stats.threadsSqlExecutorBlockedCount": "Blocked",
                        "stats.stmtExecutions": "Statement Executions",
                        "stats.stmtCompilations": "Statement Compilations",
                        "stats.updateTransactions": "Update Transactions",
                        "stats.rollbacks": "Rollbacks",
                        "stats.commits": "Commits",
                        "stats.indexServerFinishedRequests": "Finished Requests",
                        "stats.indexServerActiveRequests": "Active Requests",
                        "stats.indexServerPendingRequests": "Pending Requests"
                    }
                },
                "sdklogicalconnection": {
                    "label": "Custom Logical Connections",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "sdklogicalservice": {
                    "label": "Custom Services",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "sdkserviceinstance": {
                    "label": "Custom Service Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "service": {
                    "label": "Services",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate"
                    }
                },
                "solr": {
                    "label": "Solr",
                    "deprecated": false,
                    "metrics": {}
                },
                "sparkapplication": {
                    "label": "Spark Applications",
                    "deprecated": false,
                    "metrics": {
                        "failedJobs": "All Failed Jobs",
                        "completedJobs": "All Completed Jobs",
                        "activeJobs": "All Active Jobs",
                        "pendingStages": "All Pending Stages",
                        "failedStages": "All Failed Stages",
                        "completedStages": "All Completed Stages",
                        "activeStages": "All Active Stages",
                        "completedBatches": "Completed Batches per Second",
                        "schedulingDelay": "Scheduling Delay",
                        "totalDelay": "Total Delay",
                        "processingTime": "Processing Time",
                        "completedOutputOperations": "Completed Output Operations",
                        "failedOutputOperations": "Failed Output Operations",
                        "inputRecords": "Input Records",
                        "activeReceivers": "Inactive Receivers"
                    }
                },
                "sparkstandalone": {
                    "label": "Spark Standalone",
                    "deprecated": false,
                    "metrics": {
                        "workers.aliveWorkers": "Alive Workers",
                        "workers.deadWorkers": "Dead Workers",
                        "workers.decommissionedWorkers": "Decommissioned Workers",
                        "workers.workersInUnknownState": "Workers In Unknown State",
                        "workers.memoryInUseTotal": "Used Memory",
                        "workers.memoryTotal": "Total Memory",
                        "workers.coresInUseTotal": "Used Cores",
                        "workers.coresTotal": "Total Cores"
                    }
                },
                "springbootapplicationcontainer": {
                    "label": "Spring Boot Apps",
                    "deprecated": false,
                    "metrics": {
                        "metrics.requests": "All Requests",
                        "metrics.statusCode.1xx": "Requests with Status Code 1xx",
                        "metrics.statusCode.2xx": "Requests with Status Code 2xx",
                        "metrics.statusCode.3xx": "Requests with Status Code 3xx",
                        "metrics.statusCode.4xx": "Requests with Status Code 4xx",
                        "metrics.statusCode.5xx": "Requests with Status Code 5xx",
                        "metrics.httpsessions.active": "Active Sessions"
                    }
                },
                "tomcatapplicationcontainer": {
                    "label": "Tomcats",
                    "deprecated": false,
                    "metrics": {
                        "totalSessionCount": "Total Session Count"
                    }
                },
                "unknownservice": {
                    "label": "Unknown Services",
                    "deprecated": false,
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "varnish": {
                    "label": "Varnish Nodes",
                    "deprecated": false,
                    "metrics": {
                        "sess_conn": "Accepted client connections",
                        "client_req": "Received client requests",
                        "sess_dropped": "Connections dropped due to a full queue",
                        "cache_hit": "Cache Hits",
                        "cache_miss": "Cache Misses",
                        "cache_hitpass": "Hits pass file",
                        "n_expired": "Expired objects",
                        "n_lru_nuked": "Nuked Objects",
                        "cache_hit_rate": "Cache Hit Rate",
                        "threads": "Threads",
                        "threads_created": "Created",
                        "threads_failed": "Failed",
                        "threads_limited": "Limited",
                        "thread_queue_len": "Queue",
                        "sess_queued": "Queued requests",
                        "backend_conn": "Connections",
                        "backend_recycle": "Recycled",
                        "backend_reuse": "Reused",
                        "backend_fail": "Idle closed",
                        "backend_unhealthy": "Unhealthy",
                        "backend_busy": "Busy",
                        "backend_req": "Requests"
                    }
                },
                "webappserviceinstance": {
                    "label": "Web Service Instances",
                    "deprecated": true,
                    "deprecationReason": "Deprecated: Entities of this type are only available to environments still running Classic Mode.",
                    "metrics": {
                        "count": "Calls",
                        "duration.mean": "Avg. Latency",
                        "duration.min": "Min Latency",
                        "duration.max": "Max Latency",
                        "duration.25th": "Latency 25th",
                        "duration.50th": "Latency 50th",
                        "duration.75th": "Latency 75th",
                        "duration.95th": "Latency 95th",
                        "duration.98th": "Latency 98th",
                        "duration.99th": "Latency 99th",
                        "error_rate": "Error Rate",
                        "instances": "Instances"
                    }
                },
                "weblogicapplicationcontainer": {
                    "label": "WebLogic Servers",
                    "deprecated": false,
                    "metrics": {
                        "threadPool.idleThreads": "Idle Threads",
                        "threadPool.totalThreads": "Total Threads",
                        "threadPool.hoggingThreads": "Hogging Threads",
                        "threadPool.standbyThreads": "Stand by Threads",
                        "threadPool.stuckThreads": "Stuck Threads",
                        "serverLogMessages.warnings": "Warning",
                        "serverLogMessages.errors": "Error",
                        "serverLogMessages.alerts": "Alert",
                        "serverLogMessages.criticals": "Critical",
                        "serverLogMessages.emergencies": "Emergency"
                    }
                },
                "websphereapplicationcontainer": {
                    "label": "WebSpheres",
                    "deprecated": false,
                    "metrics": {
                        "threadPools.webContainer.activeThreads": "Active Threads",
                        "threadPools.webContainer.poolSize": "Pool Size"
                    }
                },
                "webspherelibertyapplicationcontainer": {
                    "label": "WebSphere Liberty Servers",
                    "deprecated": false,
                    "metrics": {
                        "threadPool.activeThreads": "Active Threads",
                        "threadPool.poolSize": "Pool Size"
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=metrics.js.map