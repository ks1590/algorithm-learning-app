/**
 * Factorial using iterative approach.
 *
 * @param {number} number
 * @return {number}
 */
export function factorial(number: number): number {
  if (number < 0) {
    throw new Error('負の数の階乗は定義されていません');
  }
  let result = 1;
  for (let i = 2; i <= number; i += 1) {
    result *= i;
  }
  return result;
}

/**
 * Factorial using recursive approach.
 *
 * @param {number} number
 * @return {number}
 */
export function factorialRecursive(number: number): number {
  if (number < 0) {
    throw new Error('負の数の階乗は定義されていません');
  }
  return number > 1 ? number * factorialRecursive(number - 1) : 1;
}
