import granularities from "../lists/granularities";
import Granularity from "../types/granularity";
import TimeFilter from "../types/time_filter";
import Rollup from "../types/rollup";
import rollups from "../lists/rollups";

//const MAX_ALLOWED_DATA_POINTS = 1000;
const maximumNumberOfUsefulDataPoints = 800;

function currentTime() {
  return Date.now();
}

function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
}

export function getChartGranularity(windowSize: number,
                                    maximumNumberOfUsefulDataPoints: number): Granularity {
  const granularity = granularities.find(
    granularity => windowSize / 1000 / granularity.value <= maximumNumberOfUsefulDataPoints
  );
  return granularity || granularities[granularities.length - 1];
}

export function getPossibleGranularities(windowSize: number): Granularity[] {
  const possibleGranularities = granularities.filter(
    granularity => windowSize / 1000 / granularity.value <= maximumNumberOfUsefulDataPoints &&
      granularity.value * 1000 <= windowSize
  );

  return possibleGranularities || [granularities[granularities.length - 1]];
}

export function getDefaultMetricRollupDuration(timeFilter: TimeFilter, minRollup = 1000): Rollup {
  // Ignoring time differences for now since small time differences
  // can be accepted. This time is only used to calculate the rollup.
  const now = currentTime();
  const windowSize = getWindowSize(timeFilter);

  let availableRollupDefinitions = rollups.filter(
    rollupDefinition => timeFilter.from >= now - rollupDefinition.availableFor
  );
  if (minRollup > 1000) {
    availableRollupDefinitions = availableRollupDefinitions.filter(
      rollupDefinition => rollupDefinition.rollup != null && rollupDefinition.rollup >= minRollup
    );
  }

  for (let i = 0, len = availableRollupDefinitions.length; i < len; i++) {
    // this works because the rollupDurationThresholds array is sorted by rollup
    // the first rollup matching the requirements is returned
    const rollupDefinition = availableRollupDefinitions[i];
    const rollup = rollupDefinition && rollupDefinition.rollup ? rollupDefinition.rollup : 1000;
    if (windowSize / rollup <= maximumNumberOfUsefulDataPoints) {
      return rollupDefinition;
    }
  }

  return rollups[rollups.length - 1];
}

export function getPossibleRollups(timeFilter: TimeFilter): Rollup[] {
  // Ignoring time differences for now since small time differences
  // can be accepted. This time is only used to calculate the rollup.
  const now = currentTime();
  const windowSize = getWindowSize(timeFilter);

  return rollups
    .filter(rollupDefinition => timeFilter.from >= now - rollupDefinition.availableFor)
    .filter(rollUp => windowSize >= rollUp.rollup && windowSize / rollUp.rollup <= maximumNumberOfUsefulDataPoints);
}
