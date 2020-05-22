import granularities from "../lists/granularities";
import TimeFilter from "../types/time_filter";
import rollups from "../lists/rollups";
import Selectable from "../types/selectable";

const MAX_DATAPOINTS_ANALYZE = 600;
const MAX_DATAPOINTS_INFRASTRUCTURE = 800;
const UI_DATAPOINTS_ANALYZE = 80;


function currentTime() {
  return Date.now();
}

function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
}

export function getDefaultChartGranularity(windowSize: number): Selectable {
  return getPossibleGranularities(windowSize, UI_DATAPOINTS_ANALYZE)[0];
}

export function getPossibleGranularities(windowSize: number, maxValues = MAX_DATAPOINTS_ANALYZE): Selectable[] {
  let possibleGranularities = granularities.filter(
    granularity => windowSize / 1000 / granularity.value <= maxValues &&
      granularity.value * 1000 <= windowSize
  );

  // window sizes of this length and up have a granularity of at least 1h
  if (windowSize > 48000001) {
    possibleGranularities = possibleGranularities.filter(granularity => granularity.value >= 3600);
  }

  if (windowSize >= 1800000) {
    possibleGranularities = possibleGranularities.filter(granularity => granularity.value >= 60);
  }

  if (possibleGranularities.length > 0) {
    return possibleGranularities.map(granularity => ({
      key: granularity.value.toString(),
      label: granularity.label
    }));
  }

  return [{
    key: granularities[granularities.length - 1].value.toString(),
    label: granularities[granularities.length - 1].label
  }];
}

export function getDefaultMetricRollupDuration(timeFilter: TimeFilter): Selectable {
  return getPossibleRollups(timeFilter)[0];
}

export function getPossibleRollups(timeFilter: TimeFilter): Selectable[] {
  // Ignoring time differences for now since small time differences
  // can be accepted. This time is only used to calculate the rollup.
  const now = currentTime();
  const windowSize = getWindowSize(timeFilter);

  let possibleRollups = rollups
    .filter(rollupDefinition => timeFilter.from >= now - rollupDefinition.availableFor)
    .filter(rollUp => windowSize >= rollUp.rollup && windowSize / rollUp.rollup <= MAX_DATAPOINTS_INFRASTRUCTURE);

  if (possibleRollups.length > 0) {
    return possibleRollups.map(rollup => ({
      key: rollup.rollup.toString(),
      label: rollup.label
    }));
  }

  return [{
    key: rollups[rollups.length - 1].rollup.toString(),
    label: rollups[rollups.length - 1].label
  }];
}
