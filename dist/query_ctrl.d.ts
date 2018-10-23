/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class InstanaQueryCtrl extends QueryCtrl {
    private templateSrv;
    private backendSrv;
    private $q;
    static templateUrl: string;
    metricsDefinition: {
        "host": {
            "label": string;
            "deprecated": boolean;
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
                "topPID": string;
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
            "deprecated": boolean;
            "metrics": {
                "totalQueuesEnqueueCount": string;
                "totalQueuesDequeueCount": string;
                "totalTopicsDequeueCount": string;
                "totalTopicsEnqueueCount": string;
                "totalConnectionsCount": string;
                "totalConsumerCount": string;
                "totalProducerCount": string;
                "memoryPercentUsage": string;
                "storePercentUsage": string;
            };
        };
        "application": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
            };
        };
        "awsdynamodb": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "provisioned_read": string;
                "consumed_read": string;
                "throttled_get": string;
                "throttled_scan": string;
                "throttled_query": string;
                "throttled_batch_get": string;
                "provisioned_write": string;
                "consumed_write": string;
                "throttled_put": string;
                "throttled_update": string;
                "throttled_delete": string;
                "throttled_batch_write": string;
                "lat_get_max": string;
                "lat_get_min": string;
                "lat_get_avg": string;
                "lat_get_sum": string;
                "lat_get_sc": string;
                "lat_put_max": string;
                "lat_put_min": string;
                "lat_put_avg": string;
                "lat_put_sum": string;
                "lat_put_sc": string;
                "lat_query_max": string;
                "lat_query_min": string;
                "lat_query_avg": string;
                "lat_query_sum": string;
                "lat_query_sc": string;
                "lat_scan_max": string;
                "lat_scan_min": string;
                "lat_scan_avg": string;
                "lat_scan_sum": string;
                "lat_scan_sc": string;
                "lat_up_max": string;
                "lat_up_min": string;
                "lat_up_avg": string;
                "lat_up_sum": string;
                "lat_up_sc": string;
                "lat_del_max": string;
                "lat_del_min": string;
                "lat_del_avg": string;
                "lat_del_sum": string;
                "lat_del_sc": string;
                "lat_batch_get_max": string;
                "lat_batch_get_min": string;
                "lat_batch_get_avg": string;
                "lat_batch_get_sum": string;
                "lat_batch_get_sc": string;
                "lat_batch_write_max": string;
                "lat_batch_write_min": string;
                "lat_batch_write_avg": string;
                "lat_batch_write_sum": string;
                "lat_batch_write_sc": string;
                "scan_ret_item_max": string;
                "scan_ret_item_min": string;
                "scan_ret_item_avg": string;
                "scan_ret_item_sum": string;
                "query_ret_item_max": string;
                "query_ret_item_min": string;
                "query_ret_item_avg": string;
                "query_ret_item_sum": string;
                "con_check_fail": string;
                "user_err": string;
                "sys_err_get": string;
                "sys_err_scan": string;
                "sys_err_query": string;
                "sys_err_batch_get": string;
                "sys_err_put": string;
                "sys_err_update": string;
                "sys_err_delete": string;
                "sys_err_batch_write": string;
                "ttl": string;
            };
        };
        "awsec": {
            "label": string;
            "deprecated": boolean;
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
        "awselb": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "processed_bytes": string;
                "new_flow_count": string;
                "client_reset_count": string;
                "elb_reset_count": string;
                "target_reset_count": string;
                "active_connection_count": string;
                "new_connection_count": string;
                "rejected_connection_count": string;
                "elb_4XX_count": string;
                "elb_5XX_count": string;
            };
        };
        "awskinesis": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "get_records_records": string;
                "get_records_success": string;
                "put_records_records": string;
                "put_records_success": string;
                "get_records_age_ms": string;
                "get_records_latency": string;
                "get_records_bytes": string;
                "incoming_records": string;
                "incoming_bytes": string;
                "put_records_latency": string;
                "put_records_bytes": string;
                "read_provisioned_throughput_exceeded": string;
                "write_provisioned_throughput_exceeded": string;
            };
        };
        "awslambda": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "invocations": string;
                "errors": string;
                "dead_letter_error": string;
                "duration": string;
                "duration_maximum": string;
                "duration_minimum": string;
                "duration_sum": string;
                "throttles": string;
                "iterator_age": string;
                "iterator_age_minimum": string;
                "iterator_age_maximum": string;
                "iterator_age_sum": string;
                "concurrent_executions": string;
                "concurrent_executions_maximum": string;
                "concurrent_executions_minimum": string;
                "concurrent_executions_sum": string;
                "unreserved_concurrent_executions": string;
            };
        };
        "awsrds": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {
                "num_of_msg_delayed": string;
                "num_of_msg_not_visible": string;
                "num_of_msg_visible": string;
                "num_of_empty_receives": string;
                "num_of_msg_received": string;
                "num_of_msg_sent": string;
            };
        };
        "awss3": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "all_requests": string;
                "get_requests": string;
                "put_requests": string;
                "delete_requests": string;
                "head_requests": string;
                "post_requests": string;
                "list_requests": string;
                "bytes_downloaded": string;
                "bytes_uploaded": string;
                "4xx_errors": string;
                "5xx_errors": string;
            };
        };
        "azureappservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "art": string;
                "h2x": string;
                "h4x": string;
                "h5x": string;
                "trs": string;
                "qrs": string;
                "bts": string;
                "btr": string;
                "g0c": string;
                "g1c": string;
                "g2c": string;
            };
        };
        "azurecosmosdb": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "h2": string;
                "h3": string;
                "tr": string;
                "ds": string;
                "is": string;
                "dc": string;
                "rl": string;
                "rlc": string;
                "wl": string;
                "wlc": string;
                "sc": string;
                "as": string;
            };
        };
        "azurerediscache": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "connectedclients": string;
                "totalcommandsprocessed": string;
                "cachehits": string;
                "cachemisses": string;
                "getcommands": string;
                "setcommands": string;
                "operationsPerSecond": string;
                "evictedkeys": string;
                "totalkeys": string;
                "expiredkeys": string;
                "usedmemory": string;
                "usedmemoryRss": string;
                "serverLoad": string;
                "cacheWrite": string;
                "cacheRead": string;
                "percentProcessorTime": string;
            };
        };
        "batchserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "browserlogicalservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.50th": string;
                "duration.90th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
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
                "bac": string;
                "fro": string;
                "fp": string;
                "uncaughtErrors": string;
                "xhrCalls": string;
                "xhrErrors": string;
            };
        };
        "cassandracluster": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "cassandranode": {
            "label": string;
            "deprecated": boolean;
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
        "ceph": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "num_mons": string;
                "num_active_mons": string;
                "num_osds": string;
                "num_up_osds": string;
                "num_in_osds": string;
                "commit_latency_ms": string;
                "apply_latency_ms": string;
                "num_near_full_osds": string;
                "num_full_osds": string;
                "num_pgs": string;
                "num_pools": string;
                "num_objects": string;
                "aggregate_pct_used": string;
                "read_bytes_sec": string;
                "write_bytes_sec": string;
                "read_op_per_sec": string;
                "write_op_per_sec": string;
            };
        };
        "clickhousedatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "Merge": string;
                "ReplicatedFetch": string;
                "ReplicatedSend": string;
                "ReplicatedChecks": string;
                "BackgroundPoolTask": string;
                "DiskSpaceReservedForMerge": string;
                "DistributedSend": string;
                "QueryPreempted": string;
                "TCPConnection": string;
                "HTTPConnection": string;
                "InterserverConnection": string;
                "OpenFileForRead": string;
                "OpenFileForWrite": string;
                "Read": string;
                "Write": string;
                "SendExternalTables": string;
                "QueryThread": string;
                "ReadonlyReplica": string;
                "LeaderReplica": string;
                "MemoryTracking": string;
                "MemoryTrackingInBackgroundProcessingPool": string;
                "MemoryTrackingForMerges": string;
                "LeaderElection": string;
                "EphemeralNode": string;
                "ZooKeeperWatch": string;
                "DelayedInserts": string;
                "ContextLockWait": string;
                "StorageBufferRows": string;
                "StorageBufferBytes": string;
                "DictCacheRequests": string;
                "Revision": string;
                "RWLockWaitingReaders": string;
                "RWLockWaitingWriters": string;
                "RWLockActiveReaders": string;
                "RWLockActiveWriters": string;
                "Query": string;
                "SelectQuery": string;
                "InsertQuery": string;
                "FileOpen": string;
                "Seek": string;
                "ReadBufferFromFileDescriptorRead": string;
                "ReadBufferFromFileDescriptorReadBytes": string;
                "WriteBufferFromFileDescriptorWrite": string;
                "WriteBufferFromFileDescriptorWriteBytes": string;
                "ReadCompressedBytes": string;
                "CompressedReadBufferBlocks": string;
                "CompressedReadBufferBytes": string;
                "IOBufferAllocs": string;
                "IOBufferAllocBytes": string;
                "ArenaAllocChunks": string;
                "ArenaAllocBytes": string;
                "FunctionExecute": string;
                "TableFunctionExecute": string;
                "MarkCacheHits": string;
                "MarkCacheMisses": string;
                "CreatedReadBufferOrdinary": string;
                "CreatedWriteBufferOrdinary": string;
                "ReplicatedPartMerges": string;
                "InsertedRows": string;
                "InsertedBytes": string;
                "DuplicatedInsertedBlocks": string;
                "ZooKeeperInit": string;
                "ZooKeeperTransactions": string;
                "ZooKeeperList": string;
                "ZooKeeperCreate": string;
                "ZooKeeperRemove": string;
                "ZooKeeperExists": string;
                "ZooKeeperGet": string;
                "ZooKeeperSet": string;
                "ZooKeeperMulti": string;
                "ZooKeeperClose": string;
                "ZooKeeperWatchResponse": string;
                "ZooKeeperExceptions": string;
                "ZooKeeperWaitMicroseconds": string;
                "ZooKeeperBytesSent": string;
                "ZooKeeperBytesReceived": string;
                "DistributedConnectionStaleReplica": string;
                "SlowRead": string;
                "ReplicaPartialShutdown": string;
                "SelectedParts": string;
                "SelectedRanges": string;
                "SelectedMarks": string;
                "MergedRows": string;
                "MergedUncompressedBytes": string;
                "MergesTimeMilliseconds": string;
                "MergeTreeDataWriterRows": string;
                "MergeTreeDataWriterUncompressedBytes": string;
                "MergeTreeDataWriterCompressedBytes": string;
                "MergeTreeDataWriterBlocks": string;
                "MergeTreeDataWriterBlocksAlreadySorted": string;
                "CannotRemoveEphemeralNode": string;
                "LeaderElectionAcquiredLeadership": string;
                "RegexpCreated": string;
                "ContextLock": string;
                "RWLockAcquiredReadLocks": string;
                "RWLockAcquiredWriteLocks": string;
                "RWLockReadersWaitMilliseconds": string;
                "RWLockWritersWaitMilliseconds": string;
            };
        };
        "clrruntimeplatform": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {
                "nodeCount": string;
            };
        };
        "consul": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "consul.runtime.free_count": string;
                "consul.runtime.heap_objects": string;
                "consul.runtime.sys_bytes": string;
                "consul.runtime.malloc_count": string;
                "consul.session_ttl.active": string;
                "consul.autopilot.healthy": string;
                "consul.runtime.total_gc_runs": string;
                "consul.runtime.num_goroutines": string;
                "consul.runtime.alloc_bytes": string;
                "consul.autopilot.failure_tolerance": string;
                "consul.runtime.total_gc_pause_ns": string;
                "raft.appliedIndex": string;
                "raft.commitIndex": string;
                "raft.fsmPending": string;
                "raft.lastLogIndex": string;
                "raft.lastLogTerm": string;
                "raft.lastSnapshotIndex": string;
                "raft.lastSnapshotTerm": string;
                "raft.numPeers": string;
                "raft.term": string;
            };
        };
        "couchbasecluster": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "cluster.usedDisk": string;
                "cluster.usedMemory": string;
                "cluster.ops": string;
                "cluster.cmd_get": string;
                "cluster.cmd_set": string;
                "cluster.curr_items": string;
            };
        };
        "couchbasenode": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "node.mem_used": string;
                "node.couch_docs_actual_disk_size": string;
                "node.ep_diskqueue_fill": string;
                "node.ep_diskqueue_drain": string;
                "node.disk_write_queue": string;
            };
        };
        "crystalruntimeplatform": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "gc.hs": string;
                "gc.fb": string;
                "gc.ub": string;
                "gc.bsgc": string;
            };
        };
        "databaseserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultentity20": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
            };
        };
        "defaultlogicalconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultlogicalservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "defaultserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "docker": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {};
        };
        "ejblogicalconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ejblogicalservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ejbserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "elasticsearchcluster": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "elasticsearchnode": {
            "label": string;
            "deprecated": boolean;
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
        "endpoint": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
            };
        };
        "etcd": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {};
        };
        "f5": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "ftpserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "glassfishapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
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
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {
                "allocatedVCores": string;
                "availableVCores": string;
                "allocatedMem": string;
                "availableMem": string;
            };
        };
        "haproxy": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "hazelcastcluster": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "isClusterSafe": string;
                "nodeCount": string;
            };
        };
        "hazelcastnode": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "nodeMetrics.clientEndpointCount": string;
                "nodeMetrics.eventQueueSize": string;
                "nodeMetrics.migrationQueueSize": string;
                "isLiteMember": string;
                "isLocalMemberSafe": string;
                "distributedObjects.cacheCount": string;
                "distributedObjects.mapCount": string;
                "distributedObjects.replicatedMapCount": string;
                "distributedObjects.multiMapCount": string;
                "distributedObjects.queueCount": string;
                "distributedObjects.listCount": string;
                "distributedObjects.setCount": string;
                "distributedObjects.topicCount": string;
                "distributedObjects.executorCount": string;
                "distributedObjects.otherCount": string;
                "executorServiceQueueSize.asyncExecutor": string;
                "executorServiceQueueSize.clientExecutor": string;
                "executorServiceQueueSize.queryExecutor": string;
                "executorServiceQueueSize.scheduledExecutor": string;
                "executorServiceQueueSize.systemExecutor": string;
                "executorServiceQueueSize.ioExecutor": string;
            };
        };
        "httpd": {
            "label": string;
            "deprecated": boolean;
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
        "instanaagent": {
            "label": string;
            "deprecated": boolean;
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
        "jbossasapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "jbossdatagrid": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "hotRod.numberOfLocalConnections": string;
                "hotRod.numberOfGlobalConnections": string;
            };
        };
        "jettyapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "idleThreads": string;
                "busyThreads": string;
                "threads": string;
                "threadsQueueSize": string;
            };
        };
        "jiraapplication": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "instruments.http.sessions": string;
                "instruments.concurrent.requests": string;
                "instruments.dbcp.numIdle": string;
            };
        };
        "jvmruntimeplatform": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "threads.new": string;
                "threads.runnable": string;
                "threads.timed-waiting": string;
                "threads.waiting": string;
                "threads.blocked": string;
                "memory.used": string;
            };
        };
        "kafka": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {
                "nodeCount": string;
            };
        };
        "kubernetescluster": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "allocatedCapacityPodsRatio": string;
                "requiredCapacityCPURatio": string;
                "limitCapacityCPURatio": string;
                "requiredCapacityMemoryRatio": string;
                "limitCapacityMemoryRatio": string;
                "requiredCPU": string;
                "limitCPU": string;
                "nodes.capacity_cpu": string;
                "requiredMemory": string;
                "limitMemory": string;
                "nodes.capacity_mem": string;
                "podsRunning": string;
                "podsPending": string;
                "pods.count": string;
                "nodes.capacity_pods": string;
                "nodes.OutOfDisk.True": string;
                "nodes.MemoryPressure.True": string;
                "nodes.DiskPressure.True": string;
                "nodes.KubeletReady.False": string;
                "availableReplicas": string;
                "desiredReplicas": string;
                "nodes.count": string;
            };
        };
        "kubernetespod": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "containers.count": string;
                "cpuRequests": string;
                "cpuLimits": string;
                "memoryRequests": string;
                "memoryLimits": string;
            };
        };
        "kubernetesnode": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "allocatedPods": string;
                "cap_pods": string;
                "required_mem": string;
                "limit_mem": string;
                "cap_mem": string;
                "required_cpu": string;
                "limit_cpu": string;
                "cap_cpu": string;
                "alloc_pods_percentage": string;
                "required_cpu_percentage": string;
                "limit_cpu_percentage": string;
                "required_mem_percentage": string;
                "limit_mem_percentage": string;
            };
        };
        "kubernetesdeployment": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "availableReplicas": string;
                "desiredReplicas": string;
                "phase.Pending.count": string;
                "conditions.PodScheduled.False": string;
                "conditions.Ready.False": string;
                "duration": string;
                "pods.count": string;
                "pods.required_mem": string;
                "pods.limit_mem": string;
                "pods.required_cpu": string;
                "pods.limit_cpu": string;
            };
        };
        "kubernetesnamespace": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "cap_requests_memory": string;
                "used_requests_memory": string;
                "cap_limits_memory": string;
                "used_limits_memory": string;
                "cap_requests_cpu": string;
                "used_requests_cpu": string;
                "cap_limits_cpu": string;
                "used_limits_cpu": string;
                "used_pods": string;
                "cap_pods": string;
                "used_pods_percentage": string;
                "required_cpu_percentage": string;
                "limit_cpu_percentage": string;
                "required_mem_percentage": string;
                "limit_mem_percentage": string;
            };
        };
        "openshiftdeploymentconfig": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "availableReplicas": string;
                "desiredReplicas": string;
                "phase.Pending.count": string;
                "conditions.PodScheduled.False": string;
                "conditions.Ready.False": string;
                "duration": string;
                "pods.count": string;
                "pods.required_mem": string;
                "pods.limit_mem": string;
                "pods.required_cpu": string;
                "pods.limit_cpu": string;
            };
        };
        "ldaplogicalconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ldaplogicalservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "ldapserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalbatch": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalbatchconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalcassandraconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaldatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaldatabaseconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalejbconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalelasticsearchconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalelasticsearchindex": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalftpconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalftpservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalhttpconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicaljdbcconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalkafkaconsumerconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalkafkapublisherconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessagebroker": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessageconsumer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessageconsumerconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmessagepublisherconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmongodbconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmongodbdatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmsmqconsumerconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalmsmqpublisherconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalneo4jconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalneo4jdatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrabbitmqconsumerconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrabbitmqpublisherconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalredisconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalredisdatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrpcconnection": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalrpcendpoint": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "logicalwebapp": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "mariadbdatabase": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "messageconsumerserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "mongodb": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "documents.deleted": string;
                "documents.inserted": string;
                "documents.returned": string;
                "documents.updated": string;
                "connections": string;
                "repl.apply_ops": string;
                "repl.apply_bathes": string;
                "repl.apply_bathes_total_ms": string;
                "repl.buffer_count": string;
                "repl.buffer_size_bytes": string;
                "repl.network_ops": string;
                "repl.network_bytes": string;
                "repl.preload_docs_num": string;
                "repl.preload_docs_total_ms": string;
                "repl.preload_idx_num": string;
                "repl.preload_idx_total_ms": string;
                "repl.replication_lag": string;
            };
        };
        "mongodbdatabaseserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "mongodbreplicaset": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "nodeCount": string;
                "documents.deleted": string;
                "documents.inserted": string;
                "documents.returned": string;
                "documents.updated": string;
                "connections": string;
                "repl.apply_ops": string;
                "repl.apply_bathes": string;
                "repl.apply_bathes_total_ms": string;
                "repl.buffer_count": string;
                "repl.buffer_size_bytes": string;
                "repl.network_ops": string;
                "repl.network_bytes": string;
                "repl.preload_docs_num": string;
                "repl.preload_docs_total_ms": string;
                "repl.preload_idx_num": string;
                "repl.preload_idx_total_ms": string;
                "repl.replication_lag": string;
            };
        };
        "msiis": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "mssqldatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "generalstats._total.user_connections": string;
                "waitstats.PAGEIOLATCH_EX.wait_time_ms": string;
                "waitstats.PAGEIOLATCH_SH.wait_time_ms": string;
                "waitstats.ASYNC_NETWORK_IO.wait_time_ms": string;
                "waitstats.CXPACKET.wait_time_ms": string;
                "waitstats.WRITELOG.wait_time_ms": string;
                "iostats._total.num_of_bytes_read": string;
                "iostats._total.num_of_bytes_written": string;
                "perfcounters.databases._total.write_transactions_sec": string;
                "perfcounters.sql_errors.user_errors.errors_sec": string;
                "perfcounters.sql_errors.db_offline_errors.errors_sec": string;
                "perfcounters.sql_errors.kill_connection_errors.errors_sec": string;
            };
        };
        "mule": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "mysqldatabase": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "metrics": {
                "metrics.gcCount": string;
                "metrics.exceptionThrownCount": string;
                "metrics.contentionCount": string;
                "metrics.heapSizeGen0": string;
                "metrics.heapSizeGen1": string;
                "metrics.heapSizeGen2": string;
                "metrics.heapSizeGen3": string;
            };
        };
        "neo4jserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "nginx": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "requests": string;
                "connections.accepted": string;
                "connections.handled": string;
                "connections.active": string;
                "connections.dropped": string;
                "connections.reading": string;
                "connections.writing": string;
                "connections.waiting": string;
                "nginx_plus.processes.respawned": string;
                "nginx_plus.http.upstreams.peers.failed": string;
                "nginx_plus.http.server_zones.5xx_responses": string;
                "nginx_plus.http.caches.miss.responses": string;
                "nginx_plus.http.caches.hit.responses": string;
                "nginx_plus.http.caches.size": string;
                "nginx_plus.http.caches.max_size": string;
                "nginx_plus.http.caches.cold": string;
                "nginx_plus.ssl.handshakes": string;
                "nginx_plus.ssl.handshakes_failed": string;
                "nginx_plus.ssl.session_reuses": string;
            };
        };
        "nodejsruntimeplatform": {
            "label": string;
            "deprecated": boolean;
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
        "nomadscheduler": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "nomad.client.allocated.cpu": string;
                "nomad.client.allocated.disk": string;
                "nomad.client.allocated.iops": string;
                "nomad.client.allocated.memory": string;
                "nomad.client.allocations.blocked": string;
                "nomad.client.allocations.migrating": string;
                "nomad.client.allocations.pending": string;
                "nomad.client.allocations.running": string;
                "nomad.client.allocations.terminal": string;
                "nomad.client.unallocated.cpu": string;
                "nomad.client.unallocated.disk": string;
                "nomad.client.unallocated.iops": string;
                "nomad.client.unallocated.memory": string;
                "nomad.nomad.blocked_evals.total_blocked": string;
                "nomad.nomad.blocked_evals.total_escaped": string;
                "nomad.nomad.blocked_evals.total_quota_limit": string;
                "nomad.nomad.broker._core.ready": string;
                "nomad.nomad.broker._core.unacked": string;
                "nomad.nomad.broker.total_blocked": string;
                "nomad.nomad.broker.total_ready": string;
                "nomad.nomad.broker.total_unacked": string;
                "nomad.nomad.broker.total_waiting": string;
                "nomad.nomad.heartbeat.active": string;
                "nomad.nomad.plan.queue_depth": string;
                "nomad.nomad.vault.distributed_tokens_revoking": string;
                "nomad.runtime.alloc_bytes": string;
                "nomad.runtime.free_count": string;
                "nomad.runtime.heap_objects": string;
                "nomad.runtime.malloc_count": string;
                "nomad.runtime.num_goroutines": string;
                "nomad.runtime.sys_bytes": string;
                "nomad.runtime.total_gc_pause_ns": string;
                "nomad.runtime.total_gc_runs": string;
                "nomad.uptime": string;
            };
        };
        "oracledb": {
            "label": string;
            "deprecated": boolean;
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
        "ping": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "duration": string;
            };
        };
        "phpfpmruntimeplatform": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "postgresqldatabase": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "totalCommittedTransactions": string;
                "max_conn_pct": string;
                "total_active_connections": string;
            };
        };
        "process": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "mem.virtual": string;
                "mem.resident": string;
                "mem.share": string;
                "cpu.user": string;
                "cpu.sys": string;
                "ctx_switches.voluntary": string;
                "ctx_switches.nonvoluntary": string;
            };
        };
        "pythonruntimeplatform": {
            "label": string;
            "deprecated": boolean;
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
                "metrics.dummy_threads": string;
                "metrics.daemon_threads": string;
            };
        };
        "rabbitmq": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "rpcendpointserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "rubyruntimeplatform": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "sdklogicalservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "sdkserviceinstance": {
            "label": string;
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "service": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
            };
        };
        "solr": {
            "label": string;
            "deprecated": boolean;
            "metrics": {};
        };
        "sparkapplication": {
            "label": string;
            "deprecated": boolean;
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
        "sparkstandalone": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "workers.aliveWorkers": string;
                "workers.deadWorkers": string;
                "workers.decommissionedWorkers": string;
                "workers.workersInUnknownState": string;
                "workers.memoryInUseTotal": string;
                "workers.memoryTotal": string;
                "workers.coresInUseTotal": string;
                "workers.coresTotal": string;
            };
        };
        "springbootapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
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
        "tomcatapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "totalSessionCount": string;
            };
        };
        "unknownservice": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "varnish": {
            "label": string;
            "deprecated": boolean;
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
            "deprecated": boolean;
            "deprecationReason": string;
            "metrics": {
                "count": string;
                "duration.mean": string;
                "duration.min": string;
                "duration.max": string;
                "duration.25th": string;
                "duration.50th": string;
                "duration.75th": string;
                "duration.95th": string;
                "duration.98th": string;
                "duration.99th": string;
                "error_rate": string;
                "instances": string;
            };
        };
        "weblogicapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
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
        "websphereapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "threadPools.webContainer.activeThreads": string;
                "threadPools.webContainer.poolSize": string;
            };
        };
        "webspherelibertyapplicationcontainer": {
            "label": string;
            "deprecated": boolean;
            "metrics": {
                "threadPool.activeThreads": string;
                "threadPool.poolSize": string;
            };
        };
    };
    uniqueEntityTypes: Array<string>;
    allCustomMetrics: Array<Object>;
    availableMetrics: Array<Object>;
    snapshots: Array<string>;
    entitySelectionText: string;
    metricSelectionText: string;
    previousMetricCategory: string;
    EMPTY_DROPDOWN_TEXT: string;
    BUILT_IN_METRICS: string;
    CUSTOM_METRICS: string;
    defaults: {};
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any, backendSrv: any, $q: any);
    onFilterChange(refresh: any): any;
    onMetricCategorySelect(): void;
    filterForEntityType(refresh: any): void;
    filterForCustom(refresh: any): void;
    filterEntityTypes(): void;
    onEntityTypeSelect(refresh: any): void;
    onMetricsFilter(refresh: any): void;
    checkMetricAndRefresh(refresh: any): void;
    selectionReset(): void;
    resetEntityTypeSelection(): void;
    resetMetricSelection(): void;
    adjustEntitySelectionPlaceholder(): void;
    adjustMetricSelectionPlaceholder(): void;
    onMetricSelect(): void;
}
