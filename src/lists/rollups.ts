export default [
  {
    availableFor: 1000 * 60 * 60 * 24, // 1d
    rollup: 1000, // 1s
    label: '1s',
  },
  {
    availableFor: 1000 * 60 * 60 * 24, // 1d
    rollup: 1000 * 5, // 5s
    label: '5s',
  },
  {
    availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
    rollup: 1000 * 60, // 1m
    label: '1min',
  },
  {
    availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
    rollup: 1000 * 60 * 5, // 5m
    label: '5min',
  },
  {
    availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // 1 year aka forever
    rollup: 1000 * 60 * 60, // 1h
    label: '1h',
  },
];
