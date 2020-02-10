export default [
  {
    'key': 'cpu.used', // metric.key
    'value': 'cpu.count', // value of the metric found in GET /snapshots/{snapshotId}
    'label': 'cpu.max' // label that shall be shown as target in graph
  },
  {
    'key': 'memory.used',
    'value': 'memory.total',
    'label': 'memory.max'
  },
  {
    'key': 'openFiles.used',
    'value': 'openFiles.max',
    'label': 'openFiles.max'
  }
];
