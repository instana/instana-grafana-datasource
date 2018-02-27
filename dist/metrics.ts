export default {
	"host": {
	  "label": "Hosts",
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
	  "metrics": {
		"totalQueuesEnqueueCount": "All Queues Messages Enqueue",
		"totalTopicsDequeueCount": "All Topics Messages Dequeue",
		"totalTopicsEnqueueCount": "All Topics Messages Enqueue",
		"totalConnectionsCount": "Total Connections",
		"totalConsumerCount": "Total Consumers",
		"totalProducerCount": "Total Producers",
		"memoryPercentUsage": "Memory Usage",
		"storePercentUsage": "Store Usage"
	  }
	},
	"awsec": {
	  "label": "AWS ECs",
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
	"awsrds": {
	  "label": "AWS RDSs",
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
	  "metrics": {
		"num_of_msg_delayed": "Number of messages delayed",
		"num_of_msg_not_visible": "Number of messages not visible",
		"num_of_msg_visible": "Number of messages visible",
		"num_of_empty_receives": "Number of messages empty receives",
		"num_of_msg_received": "Number of messages receives",
		"num_of_msg_sent": "Number of messages sent"
	  }
	},
	"batchserviceinstance": {
	  "label": "Batch Job Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"browserlogicalconnection": {
	  "label": "Website Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"browserlogicalservice": {
	  "label": "Websites",
	  "metrics": {
		"count": "Views",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "(deprecated) Error Rate",
		"uncaughtErrors": "Errors",
		"xhrCalls": "XHR Calls",
		"xhrErrors": "XHR Errors",
		"instances": "Instances",
		"unl": "Unload Time",
		"red": "Redirect Time",
		"apc": "AppCache Time",
		"dns": "DNS Time",
		"tcp": "TCP Time",
		"ssl": "SSL Time",
		"req": "Request Time",
		"rsp": "Response Time",
		"dom": "DOM",
		"chi": "Children",
		"fp": "First Paint Time"
	  }
	},
	"cassandracluster": {
	  "label": "Cassandra Clusters",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"cassandranode": {
	  "label": "Cassandra Nodes",
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
	"clrruntimeplatform": {
	  "label": ".NET Apps",
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
	  "metrics": {
		"nodeCount": "Nodes"
	  }
	},
	"crystalruntimeplatform": {
	  "label": "Crystal Apps",
	  "metrics": {
		"gc.hs": "Size",
		"gc.fb": "Free",
		"gc.ub": "Unused",
		"gc.bsgc": "Bytes Since GC"
	  }
	},
	"databaseserviceinstance": {
	  "label": "Database Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"defaultlogicalconnection": {
	  "label": "Unspecified Logical Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"defaultlogicalservice": {
	  "label": "Services",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"defaultserviceinstance": {
	  "label": "Service Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"docker": {
	  "label": "Docker Containers",
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
	  "metrics": {
		"metrics.meters.com.instana.filler.topology.spans.SpansStreamInitializer.accepted-from-kafka-spans": "Accepted Spans",
		"metrics.meters.com.instana.filler.spanbuffer.ScheduledSpanBatcher.dropped-spans": "Dropped Spans",
		"metrics.meters.com.instana.filler.topology.RawMessagesStreamInitializer.dropped-messages": "Dropped Messages"
	  }
	},
	"ejblogicalconnection": {
	  "label": "Logical EJB Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"ejblogicalservice": {
	  "label": "EJBs",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"ejbserviceinstance": {
	  "label": "EJB Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"elasticsearchcluster": {
	  "label": "Elasticsearch Clusters",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"elasticsearchnode": {
	  "label": "Elasticsearch Nodes",
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
	"etcd": {
	  "label": "Etcd Nodes",
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
	  "metrics": {}
	},
	"ftpserviceinstance": {
	  "label": "FTP Server Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"glassfishapplicationcontainer": {
	  "label": "Glassfish",
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
		"threads_core": "Core threads",
		"threads_executed_tasks": "Executed threads",
		"threads_current_count": "Current threads",
		"threads_current_busy": "Busy threads",
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
	  "metrics": {
		"allocatedVCores": "Allocated Virtual Cores",
		"availableVCores": "Available Virtual Cores",
		"allocatedMem": "Allocated Memory",
		"availableMem": "Available Memory"
	  }
	},
	"haproxy": {
	  "label": "HAProxy",
	  "metrics": {}
	},
	"httpd": {
	  "label": "Apache HTTPds",
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
	"instanasgent": {
	  "label": "Instana Agents",
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
	"jnossasapplicationcontainer": {
	  "label": "JBoss",
	  "metrics": {}
	},
	"jbossdatagrid": {
	  "label": "JBoss Data Grids",
	  "metrics": {
		"hotRod.numberOfLocalConnections": "Number Of Local Connections",
		"hotRod.numberOfGlobalConnections": "Number Of Global Connections"
	  }
	},
	"jettyapplicationcontainer": {
	  "label": "Jetty",
	  "metrics": {
		"idleThreads": "Idle Threads",
		"busyThreads": "Busy Threads",
		"threads": "Total Threads",
		"threadsQueueSize": "Threads Queue Size"
	  }
	},
	"jiraapplication": {
	  "label": "Atlassian JIRAs",
	  "metrics": {
		"instruments.http.sessions": "Current Sessions",
		"instruments.concurrent.requests": "Concurrent Requests",
		"instruments.dbcp.numIdle": "Idle Connections"
	  }
	},
	"jvmruntimeplatform": {
	  "label": "JVMs",
	  "metrics": {
		"threads.new": "New",
		"threads.runnable": "Runnable",
		"threads.timed-waiting": "Timed-Waiting",
		"threads.waiting": "Waiting",
		"threads.blocked": "Blocked",
		"threads.terminated": "Terminated",
		"memory.used": "Used"
	  }
	},
	"kafka": {
	  "label": "Kafka Nodes",
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
	  "metrics": {
		"nodeCount": "Nodes"
	  }
	},
	"kubernetescluster": {
	  "label": "Kubernetes Clusters",
	  "metrics": {
		"count": "Views",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "(deprecated) Error Rate",
		"uncaughtErrors": "Uncaught errors",
		"xhrCalls": "XHR Calls",
		"xhrErrors": "XHR Errors",
		"instances": "Instances",
		"unl": "Unload Time",
		"red": "Redirect Time",
		"apc": "AppCache Time",
		"dns": "DNS Time",
		"tcp": "TCP Time",
		"ssl": "SSL Time",
		"req": "Request Time",
		"rsp": "Response Time",
		"pro": "Processing Time",
		"loa": "Load Time",
		"fp": "First Paint Time"
	  }
	},
	"kubernetespod": {
	  "label": "Kubernetes Pods",
	  "metrics": {
		"containers.count": "Containers"
	  }
	},
	"kubernetesnode": {
	  "label": "Kubernetes Nodes",
	  "metrics": {
		"alloc_cpu": "Allocatable CPU",
		"alloc_mem": "Allocatable Memory",
		"alloc_pods": "Allocatable Pods",
		"cap_cpu": "CPU Capacity",
		"cap_mem": "Memory Capacity",
		"cap_pods": "Pod Capacity"
	  }
	},
	"ldapLogicalconnection": {
	  "label": "LDAP Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"ldapLogicalservice": {
	  "label": "LDAP",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"ldapserviceinstance": {
	  "label": "LDAP Service Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalbatch": {
	  "label": "Batch Jobs",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalbatchconnection": {
	  "label": "Batch Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalcassandraconnection": {
	  "label": "Cassandra Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicaldatabase": {
	  "label": "Databases",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicaldatabaseconnection": {
	  "label": "Database Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalejbconnection": {
	  "label": "EJB Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalelasticsearchcnnection": {
	  "label": "Elasticsearch Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalelasticsearchindex": {
	  "label": "Elasticsearch Indices",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalftpconnection": {
	  "label": "Logical FTP Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalftpservice": {
	  "label": "FTP Servers",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalhttpconnection": {
	  "label": "Http Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicaljdbcconnection": {
	  "label": "JDBC Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalkafkaconsumerconnection": {
	  "label": "Kafka Consumer Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalkafkapublisherconnection": {
	  "label": "Kafka Publisher Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmessagebroker": {
	  "label": "Message Brokers",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmessageconsumer": {
	  "label": "Message Consumers",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmessageconsumerconnection": {
	  "label": "Message Consumer Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmessagepublisherconnection": {
	  "label": "Message Publisher Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmongodbconnection": {
	  "label": "MongoDB Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalmongodbdatabase": {
	  "label": "MongoDB Databases",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalrabbitmqconsumerconnection": {
	  "label": "Rabbit MQ Consumer Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalrabbitmqpublisherconnection": {
	  "label": "Rabbit MQ Publisher Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalredisconnection": {
	  "label": "Redis Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalredisdatabase": {
	  "label": "Redis Databases",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalrpcconnection": {
	  "label": "RPC Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalrpcendpoint": {
	  "label": "RPC Endpoints",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"logicalwebapp": {
	  "label": "Web Services",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"mariadbdatabase": {
	  "label": "MariaDBs",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"messageconsumerserviceinstance": {
	  "label": "Message Consumer Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"mongodb": {
	  "label": "MongoDB Nodes",
	  "metrics": {
		"documents.deleted": "Deleted",
		"documents.inserted": "Inserted",
		"documents.returned": "Returned",
		"documents.updated": "Updated",
		"connections": "Connections"
	  }
	},
	"mongodbdatabaseserviceinstance": {
	  "label": "MongoDB Databases",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"msiis": {
	  "label": "Internet Information Servers",
	  "metrics": {}
	},
	"mssqldatabase": {
	  "label": "MsSQL Instances",
	  "metrics": {
		"waitstats.PAGEIOLATCH_EX.wait_time_ms": "Page IO-Latch EX",
		"waitstats.PAGEIOLATCH_SH.wait_time_ms": "Page IO-Latch SH",
		"waitstats.ASYNC_NETWORK_IO.wait_time_ms": "Async Network IO",
		"waitstats.CXPACKET.wait_time_ms": "CX-Packet",
		"waitstats.WRITELOG.wait_time_ms": "Writelog",
		"perfcounters.sqlserver:general statistics\\logins/sec": "Logins/sec.",
		"perfcounters.sqlserver:general statistics\\user connections": "Connections"
	  }
	},
	"mule": {
	  "label": "Mule ESB",
	  "metrics": {}
	},
	"mysqldatabase": {
	  "label": "MySQL DBs",
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
	  "metrics": {
		"mem.gcCount": "GC Count",
		"mem.heapSizeGen0": "Generation 0",
		"mem.heapSizeGen1": "Generation 1",
		"mem.heapSizeGen2": "Generation 2",
		"mem.heapSizeGen3": "Generation 3"
	  }
	},
	"nginx": {
	  "label": "Nginx",
	  "metrics": {
		"requests": "Requests / s",
		"connections.accepted": "Accepted connections",
		"connections.handled": "Handled connections",
		"connections.active": "Active connections",
		"connections.dropped": "Dropped connections",
		"connections.reading": "Reading",
		"connections.writing": "Writing",
		"connections.waiting": "Waiting"
	  }
	},
	"nodejsruntimeplatform": {
	  "label": "Node.js Apps",
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
	"oracledb": {
	  "label": "OracleDBs",
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
	"pageresourcelogicalconnection": {
	  "label": "Page Resource Connections",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"pageresourcelogicalservice": {
	  "label": "Page Resources",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"pageresourceserviceinstance": {
	  "label": "Page Resource Group Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"phpfpmruntimeplatform": {
	  "label": "PHP-FPM Runtimes",
	  "metrics": {}
	},
	"postgresqldatabase": {
	  "label": "PostgreSQL DBs",
	  "metrics": {
		"totalCommittedTransactions": "Committed Transactions"
	  }
	},
	"process": {
	  "label": "Processes",
	  "metrics": {
		"mem.virtual": "Virtual",
		"mem.resident": "Resident",
		"mem.share": "Share",
		"cpu.user": "User",
		"cpu.sys": "System"
	  }
	},
	"pythonruntimeplatform": {
	  "label": "Python Apps",
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
		"metrics.dead_threads": "Dead Threads",
		"metrics.daemon_threads": "Daemon Threads"
	  }
	},
	"rabbitmq": {
	  "label": "RabbitMQ",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"rpcendpointserviceinstance": {
	  "label": "RPC Endpoint Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"rubyruntimeplatform": {
	  "label": "Ruby Apps",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"sdklogicalservice": {
	  "label": "Custom Services",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"sdkserviceinstance": {
	  "label": "Custom Service Instances",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"solr": {
	  "label": "Solr",
	  "metrics": {}
	},
	"sparkapplication": {
	  "label": "Spark Applications",
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
	"springbootapplicationcontainer": {
	  "label": "Spring Boot Apps",
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
	"unknownservice": {
	  "label": "Unknown Services",
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"varnish": {
	  "label": "Varnish Nodes",
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
	  "metrics": {
		"count": "Calls",
		"duration.mean": "Avg. Latency",
		"duration.min": "Min Latency",
		"duration.25th": "Latency 25th",
		"duration.50th": "Latency 50th",
		"duration.75th": "Latency 75th",
		"duration.95th": "Latency 95th",
		"duration.98th": "Latency 98th",
		"duration.99th": "Latency 99th",
		"duration.max": "Max Latency",
		"error_rate": "Error Rate",
		"instances": "Instances"
	  }
	},
	"weblogicapplicationcontainer": {
	  "label": "WebLogic Servers",
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
		"serverLogMessages.emergencies": "Emergencie"
	  }
	},
	"webaphereapplicationcontainer": {
	  "label": "WebSpheres",
	  "metrics": {
		"threadPools.webContainer.activeThreads": "Active Threads",
		"threadPools.webContainer.poolSize": "Pool Size"
	  }
	},
	"webspherelibertyapplicationcontainer": {
	  "label": "WebSphere Liberty Servers",
	  "metrics": {
		"threadPool.activeThreads": "Active Threads",
		"threadPool.poolSize": "Pool Size"
	  }
	}
}
