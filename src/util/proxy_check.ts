import _ from 'lodash';

// check grafana version (5.3+)
export default () => {
  const version = _.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
  const versions = _.split(version, '.', 2).map((v) => {
    return parseInt(v, 10);
  });
  return version[0] >= 6 || (versions[0] >= 5 && versions[1] >= 3);
};
