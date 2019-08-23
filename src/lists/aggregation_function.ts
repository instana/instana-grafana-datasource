import _ from 'lodash';

export default [
  {
    label: "SUM",
    calculate: function (data) {
      return _.sum(data);
    }
  },
  {
    label: "MEAN",
    calculate: function (data) {
      return _.mean(data);
    }
  },
  {
    label: "MIN",
    calculate: function (data) {
      return _.min(data);
    }
  },
  {
    label: "MAX",
    calculate: function (data) {
      return _.max(data);
    }
  }
];
