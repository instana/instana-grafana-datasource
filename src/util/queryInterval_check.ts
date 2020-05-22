export function isInvalidQueryInterval(windowSize: number, queryIntervalLimit?: number): boolean {
  if (queryIntervalLimit) {
    if (queryIntervalLimit > 0) {
      return Math.floor(windowSize / 1000) * 1000 > queryIntervalLimit;
    }
  }

  return false;
}
