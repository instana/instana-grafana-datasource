import granularities from "../lists/granularities";
import Granularity from "../types/granularity";
import TimeFilter from "../types/time_filter";
import Rollup from "../types/rollup";
import rollups from "../lists/rollups";

const MAX_DATAPOINTS_ANALYZE = 600;
const MAX_DATAPOINTS_INFRASTRUCTURE = 800;
const UI_DATAPOINTS_ANALYZE = 80;


function currentTime() {
  return Date.now();
}

function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
}

export function getDefaultChartGranularity(windowSize: number): Granularity {
  const defaultGranularity = getPossibleGranularities(windowSize, UI_DATAPOINTS_ANALYZE)[0];
  return defaultGranularity || granularities[granularities.length - 1];
}

export function getPossibleGranularities(windowSize: number, maxValues = MAX_DATAPOINTS_ANALYZE): Granularity[] {
  const possibleGranularities = granularities.filter(
    granularity => windowSize / 1000 / granularity.value <= maxValues &&
      granularity.value * 1000 <= windowSize
  );

  if (possibleGranularities.length > 0) {
    return possibleGranularities;
  }

  return [granularities[granularities.length - 1]];
}

export function getDefaultMetricRollupDuration(timeFilter: TimeFilter): Rollup {
  let defaultRollUp = getPossibleRollups(timeFilter)[0];
  return defaultRollUp || rollups[rollups.length - 1];
}

export function getPossibleRollups(timeFilter: TimeFilter): Rollup[] {
  // Ignoring time differences for now since small time differences
  // can be accepted. This time is only used to calculate the rollup.
  const now = currentTime();
  const windowSize = getWindowSize(timeFilter);

  let possibleRollups = rollups
    .filter(rollupDefinition => timeFilter.from >= now - rollupDefinition.availableFor)
    .filter(rollUp => windowSize >= rollUp.rollup && windowSize / rollUp.rollup <= MAX_DATAPOINTS_INFRASTRUCTURE);

  if (possibleRollups.length > 0) {
    return possibleRollups;
  }

  return [rollups[rollups.length - 1]];
}
