import { UIPair } from '@app/core/models/ui-pair';

/**
 * sorts UiPair array alphabeticaly
 * @param a UiPair
 * @param b UiPair
 */
export function sortUiPair(a: UIPair, b: UIPair) {
  let letterA = a.label.toLowerCase(), letterB = b.label.toLowerCase();
  if ( letterA < letterB ) {
    return -1;
  }
  if ( letterA > letterB ) {
    return 1;
  }
  return 0;
}
