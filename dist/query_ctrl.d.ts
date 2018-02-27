/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class InstanaQueryCtrl extends QueryCtrl {
    private templateSrv;
    private backendSrv;
    static templateUrl: string;
    metricsDefinition: {
        "host": {
            "label": string;
            "metrics": {
                "memory.free": string;
                "memory.used": string;
                "load.1min": string;
                "cpu.user": string;
                "cpu.sys": string;
                "cpu.wait": string;
                "cpu.nice": string;
                "cpu.steal": string;
                "cpu.used": string;
                "swap.pgin": string;
                "swap.pgout": string;
                "tcp.established": string;
                "tcp.opens": string;
                "tcp.inSegs": string;
                "tcp.outSegs": string;
                "tcp.establishedResets": string;
                "tcp.resets": string;
                "tcp.fails": string;
                "tcp.errors": string;
                "tcp.retrans": string;
            };
        };
        "activemq": {
            "label": string;
            "metrics": {
                "totalQueuesEnqueueCount": string;
                "totalTopicsDequeueCount": string;
                "totalTopicsEnqueueCount": string;
                "totalConnectionsCount": string;
                "totalConsumerCount": string;
                "totalProducerCount": string;
                "memoryPercentUsage": string;
                "storePercentUsage": string;
            };
        };
        "awsec": {
            "label": string;
            "metrics": {
                "cpu_utilization": string;
                "freeable_memory": string;
                "net_bytes_in": string;
                "net_bytes_out": string;
                "swap_usage": string;
                "curr_connections": string;
                "new_connections": string;
                "curr_items": string;
                "evictions": string;
                "reclaimed": string;
            };
        };
        "awsrds": {
            "label": string;
            "metrics": {
                "cpu_utilization": string;
                "cpu_credit_usage": string;
                "cpu_credit_balance": string;
                "burst_balance": string;
                "db_connections": string;
                "disk_queue_depth": string;
                "freeable_memory": string;
                "free_storage_space": string;
                "replica_lag": string;
                "swap_usage": string;
                "read_iops": string;
                "write_iops": string;
                "read_latency": string;
                "write_latency": string;
                "read_throughput": string;
                "write_throughput": string;
                "net_receive_throughput": string;
                "net_transmit_throughput": string;
            };
        };
        "awssqs": {
            "label": string;
            "metrics": {
                "num_of_msg_delayed": string;
                "num_of_msg_not_visible": string;
                "num_of_msg_visible": string;
                "num_of_empty_receives": string;
                "num_of_msg_received": string;
                "num_of_msg_sent": string;
            };
        };
        "batchserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "browserlogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "browserlogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "uncaughtErrors": string;
                "xhrCalls": string;
                "xhrErrors": string;
                "instances": string;
                "unl": string;
                "red": string;
                "apc": string;
                "dns": string;
                "tcp": string;
                "ssl": string;
                "req": string;
                "rsp": string;
                "dom": string;
                "chi": string;
                "fp": string;
            };
        };
        "cassandracluster": {
            "label": string;
            "metrics": {
                "clientrequests.read.count": string;
                "clientrequests.write.count": string;
                "clientrequests.read.mean": string;
                "clientrequests.read.50": string;
                "clientrequests.read.95": string;
                "clientrequests.read.99": string;
                "clientrequests.write.mean": string;
                "clientrequests.write.50": string;
                "clientrequests.write.95": string;
                "clientrequests.write.99": string;
                "overallDiskSize": string;
                "keyspaceCount": string;
                "nodeCount": string;
            };
        };
        "cassandrakeyspaceserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "cassandranode": {
            "label": string;
            "metrics": {
                "clientrequests.read.mean": string;
                "clientrequests.read.50": string;
                "clientrequests.read.95": string;
                "clientrequests.read.99": string;
                "clientrequests.write.mean": string;
                "clientrequests.write.50": string;
                "clientrequests.write.95": string;
                "clientrequests.write.99": string;
                "clientrequests.read.count": string;
                "clientrequests.write.count": string;
                "stage.mutation.pending": string;
                "stage.read.pending": string;
                "stage.countermutation.pending": string;
                "stage.readrepair.pending": string;
                "stage.requestresponse.pending": string;
                "stage.memtableflushwriter.pending": string;
                "stage.mutation.blocked": string;
                "stage.read.blocked": string;
                "stage.countermutation.blocked": string;
                "stage.readrepair.blocked": string;
                "stage.requestresponse.blocked": string;
                "stage.memtableflushwriter.blocked": string;
                "dropped.MUTATION": string;
                "dropped.READ": string;
                "dropped.COUNTER_MUTATION": string;
                "dropped.READ_REPAIR": string;
                "dropped.REQUEST_RESPONSE": string;
                "compaction.pending": string;
                "cache.counter.hit": string;
                "cache.key.hit": string;
                "cache.row.hit": string;
                "bloomFilterFalse": string;
            };
        };
        "clrruntimeplatform": {
            "label": string;
            "metrics": {
                "mem.gen0GC": string;
                "mem.gen1GC": string;
                "mem.gen2GC": string;
                "threads.lck_cql": string;
                "threads.lck_crs": string;
                "mem.gen1HeapBytes": string;
                "mem.gen2HeapBytes": string;
                "mem.loHeapBytes": string;
            };
        };
        "cloudfoundry": {
            "label": string;
            "metrics": {
                "nodeCount": string;
            };
        };
        "crystalruntimeplatform": {
            "label": string;
            "metrics": {
                "gc.hs": string;
                "gc.fb": string;
                "gc.ub": string;
                "gc.bsgc": string;
            };
        };
        "databaseserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultlogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultlogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "docker": {
            "label": string;
            "metrics": {
                "cpu.total_usage": string;
                "cpu.system_usage": string;
                "cpu.user_usage": string;
                "cpu.throttling_count": string;
                "cpu.throttling_time": string;
                "memory.usage": string;
                "memory.max_usage": string;
                "memory.total_rss": string;
                "memory.total_cache": string;
                "memory.active_anon": string;
                "memory.active_file": string;
                "memory.inactive_anon": string;
                "memory.inactive_file": string;
                "blkio.blk_read": string;
                "blkio.blk_write": string;
                "network.rx.bytes": string;
                "network.tx.bytes": string;
                "network.rx.errors": string;
                "network.rx.dropped": string;
                "network.tx.errors": string;
                "network.tx.dropped": string;
            };
        };
        "dropwizardapplicationcontainer": {
            "label": string;
            "metrics": {
                "metrics.meters.com.instana.filler.topology.spans.SpansStreamInitializer.accepted-from-kafka-spans": string;
                "metrics.meters.com.instana.filler.spanbuffer.ScheduledSpanBatcher.dropped-spans": string;
                "metrics.meters.com.instana.filler.topology.RawMessagesStreamInitializer.dropped-messages": string;
            };
        };
        "ejblogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ejblogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ejbserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "elasticsearchcluster": {
            "label": string;
            "metrics": {
                "query_latency": string;
                "query_count": string;
                "indices_count": string;
                "active_shards": string;
                "active_primaryshards": string;
                "initializing_shards": string;
                "relocating_shards": string;
                "unassigned_shards": string;
                "document_count": string;
                "index_count": string;
                "deleted_count": string;
                "shards.node_active_shards": string;
                "indices.document_count": string;
                "indices.store_size": string;
            };
        };
        "elasticsearchindexserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "elasticsearchnode": {
            "label": string;
            "metrics": {
                "indices.query_latency": string;
                "indices.query_count": string;
                "indices_count": string;
                "shards.node_active_shards": string;
                "shards.node_active_primary_shards": string;
                "indices.document_count": string;
                "indices.index_count": string;
                "indices.deleted_count": string;
                "indices.refresh_count": string;
                "indices.flush_count": string;
                "indices.segment_count": string;
                "indices.refresh_time": string;
                "indices.flush_time": string;
                "threads.search_active": string;
                "threads.index_active": string;
                "threads.bulk_active": string;
                "threads.merge_active": string;
                "threads.flush_active": string;
                "threads.get_active": string;
                "threads.management_active": string;
                "threads.refresh_active": string;
                "threads.search_rejected": string;
                "threads.index_rejected": string;
                "threads.bulk_rejected": string;
                "threads.get_rejected": string;
                "threads.search_queue": string;
                "threads.index_queue": string;
                "threads.bulk_queue": string;
                "threads.merge_queue": string;
                "threads.flush_queue": string;
                "threads.get_queue": string;
                "threads.management_queue": string;
                "threads.refresh_queue": string;
            };
        };
        "etcd": {
            "label": string;
            "metrics": {
                "requests_received": string;
                "requests_sent": string;
                "bytes_per_sec_received": string;
                "bytes_per_sec_sent": string;
                "storage.expire_count": string;
                "storage.watchers": string;
                "storage.compare_and_swap_fail": string;
                "storage.compare_and_swap_success": string;
                "storage.compare_and_delete_fail": string;
                "storage.compare_and_delete_success": string;
                "storage.create_fail": string;
                "storage.create_success": string;
                "storage.delete_fail": string;
                "storage.delete_success": string;
                "storage.gets_fail": string;
                "storage.gets_success": string;
                "storage.sets_fail": string;
                "storage.sets_success": string;
                "storage.update_fail": string;
                "storage.update_success": string;
            };
        };
        "finagleapplicationcontainer": {
            "label": string;
            "metrics": {};
        };
        "ftpserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "glassfishapplicationcontainer": {
            "label": string;
            "metrics": {
                "http_request_count": string;
                "http_error": string;
                "keep_alive_connections": string;
                "keep_alive_flushes": string;
                "keep_alive_hits": string;
                "keep_alive_refusals": string;
                "keep_alive_timeouts": string;
                "file_cache_hits": string;
                "file_cache_misses": string;
                "file_cache_info_hits": string;
                "file_cache_info_misses": string;
                "jdbc_connection_used": string;
                "jdbc_connection_free": string;
                "threads_core": string;
                "threads_executed_tasks": string;
                "threads_current_count": string;
                "threads_current_busy": string;
                "connections_open": string;
                "connections_overflows": string;
                "connections_queued": string;
                "connections_peak_queued": string;
                "connections_ticks_total_queued": string;
                "connections_total": string;
                "http_max_time": string;
                "http_proc_time": string;
                "file_cache_rate": string;
                "file_cache_info_rate": string;
            };
        };
        "golangruntimeplatform": {
            "label": string;
            "metrics": {
                "metrics.memory.pause_ns": string;
                "metrics.goroutine": string;
                "metrics.memory.heap_objects": string;
                "metrics.memory.heap_sys": string;
                "metrics.memory.heap_in_use": string;
                "metrics.memory.alloc": string;
                "metrics.memory.sys": string;
            };
        };
        "hadoopyarn": {
            "label": string;
            "metrics": {
                "activeNodes": string;
                "lostNodes": string;
                "unhealthyNodes": string;
                "decommissionedNodes": string;
                "appsRunning": string;
                "appsPending": string;
                "appsFailed": string;
                "usedMemory": string;
                "availableMemory": string;
                "reservedMemory": string;
                "usedVirtualCores": string;
                "availableVirtualCores": string;
                "reservedVirtualCores": string;
                "containersRunning": string;
            };
        };
        "hadoopyarnnode": {
            "label": string;
            "metrics": {
                "allocatedVCores": string;
                "availableVCores": string;
                "allocatedMem": string;
                "availableMem": string;
            };
        };
        "haproxy": {
            "label": string;
            "metrics": {};
        };
        "httpd": {
            "label": string;
            "metrics": {
                "requests": string;
                "kBytes": string;
                "conns_total": string;
                "conns_async_writing": string;
                "conns_async_keep_alive": string;
                "conns_async_closing": string;
                "worker.waiting": string;
                "worker.starting": string;
                "worker.reading": string;
                "worker.writing": string;
                "worker.keepalive": string;
                "worker.dns": string;
                "worker.closing": string;
                "worker.logging": string;
                "worker.graceful": string;
                "worker.idle": string;
                "cpu_load": string;
                "bytes_per_req": string;
            };
        };
        "instanasgent": {
            "label": string;
            "metrics": {
                "cpu.load": string;
                "memory.used": string;
                "memory.nativeUsed": string;
                "net.rx": string;
                "net.tx": string;
                "sensors.time": string;
                "discovery.time": string;
                "sensors.count": string;
                "discovery.count": string;
            };
        };
        "jnossasapplicationcontainer": {
            "label": string;
            "metrics": {};
        };
        "jbossdatagrid": {
            "label": string;
            "metrics": {
                "hotRod.numberOfLocalConnections": string;
                "hotRod.numberOfGlobalConnections": string;
            };
        };
        "jettyapplicationcontainer": {
            "label": string;
            "metrics": {
                "idleThreads": string;
                "busyThreads": string;
                "threads": string;
                "threadsQueueSize": string;
            };
        };
        "jiraapplication": {
            "label": string;
            "metrics": {
                "instruments.http.sessions": string;
                "instruments.concurrent.requests": string;
                "instruments.dbcp.numIdle": string;
            };
        };
        "jvmruntimeplatform": {
            "label": string;
            "metrics": {
                "threads.new": string;
                "threads.runnable": string;
                "threads.timed-waiting": string;
                "threads.waiting": string;
                "threads.blocked": string;
                "threads.terminated": string;
                "memory.used": string;
            };
        };
        "kafka": {
            "label": string;
            "metrics": {
                "broker.bytesIn": string;
                "broker.bytesOut": string;
                "broker.bytesRejected": string;
                "broker.produceRequests": string;
                "broker.fetchConsumerRequests": string;
                "broker.fetchFollowerRequests": string;
                "broker.totalTimeProduce": string;
                "broker.totalTimeFetchConsumer": string;
                "broker.totalTimeFetchFollower": string;
                "broker.failedFetch": string;
                "broker.failedProduce": string;
                "broker.underReplicatedPartitions": string;
                "broker.offlinePartitionsCount": string;
                "broker.leaderElections": string;
                "broker.uncleanLeaderElections": string;
                "broker.isrShrinks": string;
                "broker.isrExpansions": string;
                "broker.activeControllerCount": string;
                "broker.networkProcessorIdle": string;
                "broker.requestHandlerIdle": string;
                "broker.partitionCount": string;
                "broker.messagesIn": string;
                "logflush.mean": string;
                "logflush.inv": string;
            };
        };
        "kafkacluster": {
            "label": string;
            "metrics": {
                "nodeCount": string;
            };
        };
        "kubernetescluster": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "uncaughtErrors": string;
                "xhrCalls": string;
                "xhrErrors": string;
                "instances": string;
                "unl": string;
                "red": string;
                "apc": string;
                "dns": string;
                "tcp": string;
                "ssl": string;
                "req": string;
                "rsp": string;
                "pro": string;
                "loa": string;
                "fp": string;
            };
        };
        "kubernetespod": {
            "label": string;
            "metrics": {
                "containers.count": string;
            };
        };
        "kubernetesnode": {
            "label": string;
            "metrics": {
                "alloc_cpu": string;
                "alloc_mem": string;
                "alloc_pods": string;
                "cap_cpu": string;
                "cap_mem": string;
                "cap_pods": string;
            };
        };
        "ldapLogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ldapLogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ldapserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalbatch": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalbatchconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalcassandraconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaldatabase": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaldatabaseconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalejbconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalelasticsearchcnnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalelasticsearchindex": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalftpconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalftpservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalhttpconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaljdbcconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalkafkaconsumerconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalkafkapublisherconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessagebroker": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessageconsumer": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessageconsumerconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessagepublisherconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmongodbconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmongodbdatabase": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrabbitmqconsumerconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrabbitmqpublisherconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalredisconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalredisdatabase": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrpcconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrpcendpoint": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalwebapp": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "mariadbdatabase": {
            "label": string;
            "metrics": {
                "status.THREADS_CONNECTED": string;
                "status.MAX_USED_CONNECTIONS": string;
                "status.ABORTED_CONNECTS": string;
                "status.SLOW_QUERIES": string;
                "status.KEY_READ_REQUESTS": string;
                "status.KEY_WRITE_REQUESTS": string;
                "status.KEY_READS": string;
                "status.KEY_WRITES": string;
                "status.ARIA_PAGECACHE_READS": string;
                "status.ARIA_PAGECACHE_WRITES": string;
            };
        };
        "memcached": {
            "label": string;
            "metrics": {
                "cmd_get": string;
                "cmd_set": string;
                "bytes_read": string;
                "bytes_write": string;
                "get_hits": string;
                "get_misses": string;
                "delete_hits": string;
                "delete_misses": string;
                "cmd_flush": string;
                "evictions": string;
                "bytes": string;
                "get_hit_rate": string;
                "delete_hit_rate": string;
                "conn_connected": string;
                "conn_queued": string;
                "conn_yields": string;
            };
        };
        "messagebrokerserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "messageconsumerserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "mongodb": {
            "label": string;
            "metrics": {
                "documents.deleted": string;
                "documents.inserted": string;
                "documents.returned": string;
                "documents.updated": string;
                "connections": string;
            };
        };
        "mongodbdatabaseserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "msiis": {
            "label": string;
            "metrics": {};
        };
        "mssqldatabase": {
            "label": string;
            "metrics": {
                "waitstats.PAGEIOLATCH_EX.wait_time_ms": string;
                "waitstats.PAGEIOLATCH_SH.wait_time_ms": string;
                "waitstats.ASYNC_NETWORK_IO.wait_time_ms": string;
                "waitstats.CXPACKET.wait_time_ms": string;
                "waitstats.WRITELOG.wait_time_ms": string;
                "perfcounters.sqlserver:general statistics\\logins/sec": string;
                "perfcounters.sqlserver:general statistics\\user connections": string;
            };
        };
        "mule": {
            "label": string;
            "metrics": {};
        };
        "mysqldatabase": {
            "label": string;
            "metrics": {
                "status.COM_SELECT": string;
                "status.COM_UPDATE": string;
                "status.COM_INSERT": string;
                "status.COM_DELETE": string;
                "status.COM_OTHER": string;
                "status.SLOW_QUERIES": string;
                "status.COM_SHOW_ERRORS": string;
                "status.DB_QUERY_LATENCY": string;
                "status.THREADS_CONNECTED": string;
                "status.MAX_USED_CONNECTIONS": string;
                "status.ABORTED_CONNECTS": string;
                "status.KEY_READ_REQUESTS": string;
                "status.KEY_WRITE_REQUESTS": string;
                "status.KEY_READS": string;
                "status.KEY_WRITES": string;
            };
        };
        "netcoreruntimeplatform": {
            "label": string;
            "metrics": {
                "mem.gcCount": string;
                "mem.heapSizeGen0": string;
                "mem.heapSizeGen1": string;
                "mem.heapSizeGen2": string;
                "mem.heapSizeGen3": string;
            };
        };
        "nginx": {
            "label": string;
            "metrics": {
                "requests": string;
                "connections.accepted": string;
                "connections.handled": string;
                "connections.active": string;
                "connections.dropped": string;
                "connections.reading": string;
                "connections.writing": string;
                "connections.waiting": string;
            };
        };
        "nodejsruntimeplatform": {
            "label": string;
            "metrics": {
                "gc.gcPause": string;
                "activeHandles": string;
                "activeRequests": string;
                "gc.minorGcs": string;
                "gc.majorGcs": string;
                "memory.rss": string;
                "memory.heapUsed": string;
                "gc.usedHeapSizeAfterGc": string;
                "libuv.max": string;
                "libuv.sum": string;
                "libuv.lag": string;
                "libuv.num": string;
                "healthcheckResult": string;
            };
        };
        "oracledb": {
            "label": string;
            "metrics": {
                "stats.dbTime": string;
                "stats.cpuTime": string;
                "stats.sqlExecuteTime": string;
                "stats.parseTime": string;
                "stats.cpuTimeDbTimeRatio": string;
                "stats.timeWaited.userIO": string;
                "stats.timeWaited.other": string;
                "stats.timeWaited.systemIO": string;
                "stats.timeWaited.concurrency": string;
                "stats.timeWaited.scheduler": string;
                "stats.timeWaited.application": string;
                "stats.timeWaited.commit": string;
                "stats.timeWaited.configuration": string;
                "stats.timeWaited.administrative": string;
                "stats.timeWaited.network": string;
                "stats.timeWaited.queue": string;
                "stats.sqlExecuteCount": string;
                "stats.averageSqlExecuteTime": string;
                "stats.hardParseCount": string;
                "stats.totalParseCount": string;
                "stats.softTotalParsesRatio": string;
                "stats.executesWithoutParsesRatio": string;
                "stats.userCalls": string;
                "stats.recursiveCalls": string;
                "stats.userCommits": string;
                "stats.userRollbacks": string;
                "stats.userLogOns": string;
                "stats.physicalReads": string;
                "stats.sessionLogicalReads": string;
                "stats.bufferCacheHitRatio": string;
                "stats.activeUserSessions": string;
                "stats.inactiveUserSessions": string;
                "stats.backgroundSessions": string;
                "stats.usedSessionsRatio": string;
            };
        };
        "pageresourcelogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "pageresourcelogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "pageresourceserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "phpfpmruntimeplatform": {
            "label": string;
            "metrics": {};
        };
        "postgresqldatabase": {
            "label": string;
            "metrics": {
                "totalCommittedTransactions": string;
            };
        };
        "process": {
            "label": string;
            "metrics": {
                "mem.virtual": string;
                "mem.resident": string;
                "mem.share": string;
                "cpu.user": string;
                "cpu.sys": string;
            };
        };
        "pythonruntimeplatform": {
            "label": string;
            "metrics": {
                "metrics.ru_utime": string;
                "metrics.ru_stime": string;
                "metrics.ru_ixrss": string;
                "metrics.ru_idrss": string;
                "metrics.ru_maxrss": string;
                "metrics.ru_isrss": string;
                "metrics.ru_minflt": string;
                "metrics.ru_majflt": string;
                "metrics.ru_nswap": string;
                "metrics.ru_inblock": string;
                "metrics.ru_oublock": string;
                "metrics.ru_msgsnd": string;
                "metrics.ru_msgrcv": string;
                "metrics.ru_nsignals": string;
                "metrics.ru_nvcsw": string;
                "metrics.ru_nivcsw": string;
                "metrics.rgc.collect0": string;
                "metrics.rgc.collect1": string;
                "metrics.rgc.collect2": string;
                "metrics.rgc.threshold0": string;
                "metrics.rgc.threshold1": string;
                "metrics.rgc.threshold2": string;
                "metrics.alive_threads": string;
                "metrics.dead_threads": string;
                "metrics.daemon_threads": string;
            };
        };
        "rabbitmq": {
            "label": string;
            "metrics": {
                "overview.publish_rate": string;
                "overview.deliver_rate": string;
                "overview.ack_rate": string;
                "overview.messages_ready": string;
                "overview.messages_unacknowledged": string;
                "overview.messages": string;
                "overview.messages_ready_rate": string;
                "overview.messages_unacknowledged_rate": string;
                "overview.consumers": string;
                "overview.connections": string;
            };
        };
        "redisserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "rpcendpointserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "rubyruntimeplatform": {
            "label": string;
            "metrics": {
                "memory.rss_size": string;
                "gc.heap_live": string;
                "gc.heap_free": string;
                "gc.minorGcs": string;
                "gc.majorGcs": string;
                "gc.totalTime": string;
                "thread.count": string;
            };
        };
        "saphana": {
            "label": string;
            "metrics": {
                "stats.usedMemory": string;
                "stats.residentMemory": string;
                "stats.cpuUsage": string;
                "stats.diskUsageData": string;
                "stats.diskUsageLog": string;
                "stats.diskUsageTrace": string;
                "stats.sessionsTotalCount": string;
                "stats.sessionsIdleCount": string;
                "stats.sessionsRunningCount": string;
                "stats.sessionsBlockedCount": string;
                "stats.sessionsBlockingCount": string;
                "stats.sessionsDatabaseUsers": string;
                "stats.sessionsApplications": string;
                "stats.sessionsApplicationUsers": string;
                "stats.threadsTotalCount": string;
                "stats.threadsActiveCount": string;
                "stats.threadsBlockedCount": string;
                "stats.threadsJobWorkerCount": string;
                "stats.threadsJobWorkerActiveCount": string;
                "stats.threadsJobWorkerBlockedCount": string;
                "stats.threadsSqlExecutorCount": string;
                "stats.threadsSqlExecutorActiveCount": string;
                "stats.threadsSqlExecutorBlockedCount": string;
                "stats.stmtExecutions": string;
                "stats.stmtCompilations": string;
                "stats.updateTransactions": string;
                "stats.rollbacks": string;
                "stats.commits": string;
                "stats.indexServerFinishedRequests": string;
                "stats.indexServerActiveRequests": string;
                "stats.indexServerPendingRequests": string;
            };
        };
        "sdklogicalconnection": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "sdklogicalservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "sdkserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "solr": {
            "label": string;
            "metrics": {};
        };
        "sparkapplication": {
            "label": string;
            "metrics": {
                "failedJobs": string;
                "completedJobs": string;
                "activeJobs": string;
                "pendingStages": string;
                "failedStages": string;
                "completedStages": string;
                "activeStages": string;
                "completedBatches": string;
                "schedulingDelay": string;
                "totalDelay": string;
                "processingTime": string;
                "completedOutputOperations": string;
                "failedOutputOperations": string;
                "inputRecords": string;
                "activeReceivers": string;
            };
        };
        "springbootapplicationcontainer": {
            "label": string;
            "metrics": {
                "metrics.requests": string;
                "metrics.statusCode.1xx": string;
                "metrics.statusCode.2xx": string;
                "metrics.statusCode.3xx": string;
                "metrics.statusCode.4xx": string;
                "metrics.statusCode.5xx": string;
                "metrics.httpsessions.active": string;
            };
        };
        "unknownservice": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "varnish": {
            "label": string;
            "metrics": {
                "sess_conn": string;
                "client_req": string;
                "sess_dropped": string;
                "cache_hit": string;
                "cache_miss": string;
                "cache_hitpass": string;
                "n_expired": string;
                "n_lru_nuked": string;
                "cache_hit_rate": string;
                "threads": string;
                "threads_created": string;
                "threads_failed": string;
                "threads_limited": string;
                "thread_queue_len": string;
                "sess_queued": string;
                "backend_conn": string;
                "backend_recycle": string;
                "backend_reuse": string;
                "backend_fail": string;
                "backend_unhealthy": string;
                "backend_busy": string;
                "backend_req": string;
            };
        };
        "webappserviceinstance": {
            "label": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "duration.max": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "weblogicapplicationcontainer": {
            "label": string;
            "metrics": {
                "threadPool.idleThreads": string;
                "threadPool.totalThreads": string;
                "threadPool.hoggingThreads": string;
                "threadPool.standbyThreads": string;
                "threadPool.stuckThreads": string;
                "serverLogMessages.warnings": string;
                "serverLogMessages.errors": string;
                "serverLogMessages.alerts": string;
                "serverLogMessages.criticals": string;
                "serverLogMessages.emergencies": string;
            };
        };
        "webaphereapplicationcontainer": {
            "label": string;
            "metrics": {
                "threadPools.webContainer.activeThreads": string;
                "threadPools.webContainer.poolSize": string;
            };
        };
        "webspherelibertyapplicationcontainer": {
            "label": string;
            "metrics": {
                "threadPool.activeThreads": string;
                "threadPool.poolSize": string;
            };
        };
    };
    uniqueEntityTypes: Array<string>;
    availableMetrics: Array<Object>;
    cacheCallbackRegistered: boolean;
    entitySelectionText: string;
    metricSelectionText: string;
    EMPTY_DROPDOWN_TEXT: string;
    defaults: {};
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any, backendSrv: any);
    onFilterChange(refresh: any): any;
    onEntityTypeSelect(refresh: any): void;
    onMetricSelect(): void;
    onSnapshotRetrieval: (query: any, data: any) => void;
    registerCacheCallback(): void;
}
