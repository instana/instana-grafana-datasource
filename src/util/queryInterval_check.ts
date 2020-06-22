export function isInvalidQueryInterval(windowSize: number, queryIntervalLimit?: number): boolean {
  if (queryIntervalLimit) {
    if (queryIntervalLimit > 0) {
      let floor = Math.floor(windowSize / 1000) * 1000;
      return floor / 1000 / 60 / 60 > queryIntervalLimit;
    }
  }

  return false;
}
