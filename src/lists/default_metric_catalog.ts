export default [
  { key: 'calls', label: 'Call count', description: 'calls', aggregations: [{ key: 'SUM', label: 'SUM' }] },
  {
    key: 'latency',
    label: 'Call latency',
    description: 'latency',
    aggregations: [
      { key: 'MAX', label: 'MAX' },
      { key: 'MEAN', label: 'MEAN' },
      { key: 'MIN', label: 'MIN' },
      { key: 'P25', label: 'P25' },
      { key: 'P50', label: 'P50' },
      { key: 'P75', label: 'P75' },
      { key: 'P90', label: 'P90' },
      { key: 'P95', label: 'P95' },
      { key: 'P98', label: 'P98' },
      { key: 'P99', label: 'P99' },
    ],
  },
  { key: 'errors', label: 'Error rate', description: 'errors', aggregations: [{ key: 'MEAN', label: 'MEAN' }] },
  { key: 'services', label: 'Service Count', description: 'services', aggregations: [{ key: 'DISTINCT_COUNT', label: 'DISTINCT_COUNT' }] },
];
