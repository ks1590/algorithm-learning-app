/**
 * Calculates the Hamming distance between two strings of equal length.
 * The Hamming distance is the number of positions at which the corresponding symbols are different.
 *
 * @param a - The first string
 * @param b - The second string
 * @returns The Hamming distance, or throws an error if strings have different lengths.
 */
export const hammingDistance = (a: string, b: string): number => {
  if (a.length !== b.length) {
    throw new Error('Strings must be of the same length');
  }

  let distance = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      distance += 1;
    }
  }

  return distance;
};
