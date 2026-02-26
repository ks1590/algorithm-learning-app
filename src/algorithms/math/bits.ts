/**
 * Gets the bit at a specific position.
 * @param number Current number
 * @param bitPosition Position of the bit to get (0-indexed from right)
 * @return 1 or 0
 */
export function getBit(number: number, bitPosition: number): number {
  return (number >> bitPosition) & 1;
}

/**
 * Sets the bit at a specific position to 1.
 * @param number Current number
 * @param bitPosition Position of the bit to set
 * @return New number with the bit set
 */
export function setBit(number: number, bitPosition: number): number {
  return number | (1 << bitPosition);
}

/**
 * Clears the bit at a specific position to 0.
 * @param number Current number
 * @param bitPosition Position of the bit to clear
 * @return New number with the bit cleared
 */
export function clearBit(number: number, bitPosition: number): number {
  const mask = ~(1 << bitPosition);
  return number & mask;
}

/**
 * Updates the bit at a specific position to a specific value.
 * @param number Current number
 * @param bitPosition Position of the bit to update
 * @param bitValue 1 or 0
 * @return New number with the bit updated
 */
export function updateBit(number: number, bitPosition: number, bitValue: number): number {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

/**
 * Checks if a number is even.
 * @param number Number to check
 * @return True if even, false otherwise
 */
export function isEven(number: number): boolean {
  return (number & 1) === 0;
}

/**
 * Checks if a number is positive.
 * @param number Number to check
 * @return True if positive, false otherwise (including 0 to false for simplicity or 0 is neither, we define positive as > 0 or 0 is positive? usually >0. Let's do > 0.)
 * Actually, sign bit check. In 32-bit signed integer, sign bit is the 31st bit.
 */
export function isPositive(number: number): boolean {
  if (number === 0) return false;
  // If 31st bit is 0, it's positive. If 1, it's negative.
  return ((number >> 31) & 1) === 0;
}

/**
 * Multiplies a number by 2 using bitwise operators.
 * @param number Number to multiply
 * @return Multiplied number
 */
export function multiplyByTwo(number: number): number {
  return number << 1;
}

/**
 * Divides a number by 2 using bitwise operators.
 * @param number Number to divide
 * @return Divided number
 */
export function divideByTwo(number: number): number {
  return number >> 1;
}

/**
 * Switches the sign of a number.
 * @param number Number to switch sign
 * @return Number with flipped sign
 */
export function switchSign(number: number): number {
  return ~number + 1;
}

/**
 * Multiplies two numbers using bitwise operators (Russian Peasant Multiplication).
 * @param a First number
 * @param b Second number
 * @return Product of a and b
 */
export function multiply(a: number, b: number): number {
  let multiplier = a;
  let multiplicand = b;
  let product = 0;

  // If one of the numbers is negative, wait. Let's handle signs.
  const isResultNegative = (a < 0 && b > 0) || (a > 0 && b < 0);
  multiplier = Math.abs(a);
  multiplicand = Math.abs(b);

  while (multiplier !== 0) {
    if ((multiplier & 1) !== 0) {
      product += multiplicand;
    }
    multiplier = multiplier >> 1;
    multiplicand = multiplicand << 1;
  }

  return isResultNegative ? switchSign(product) : product;
}

/**
 * Counts the number of set bits (1s) in a number.
 * @param number Number to count bits for
 * @return Number of set bits
 */
export function countSetBits(number: number): number {
  let count = 0;
  let num = number;
  while (num !== 0) {
    count += num & 1;
    num = num >>> 1; // Unsigned right shift
  }
  return count;
}

/**
 * Calculates the number of bits required to represent a number.
 * @param number Number to calculate length for
 * @return Bit length
 */
export function bitLength(number: number): number {
  let bitsCounter = 0;
  let num = number;
  while (num !== 0) {
    bitsCounter += 1;
    num = num >>> 1;
  }
  return bitsCounter;
}

/**
 * Checks if a number is a power of two.
 * @param number Number to check
 * @return True if it's a power of two
 */
export function isPowerOfTwo(number: number): boolean {
  if (number <= 0) {
    return false;
  }
  return (number & (number - 1)) === 0;
}
