/**
 * Util method to validate query intervals which are too big.
 *
 * @param windowSize in ms
 * @param queryIntervalLimit in ms
 */
export function isInvalidQueryInterval(windowSize: number, queryIntervalLimit?: number): boolean {
  if (queryIntervalLimit) {
    if (queryIntervalLimit > 0) {
      return windowSize > queryIntervalLimit;
    }
    return false;
  }

  return false;
}
