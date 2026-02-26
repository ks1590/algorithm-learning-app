import { describe, it, expect } from 'vitest';

import {
  getBit,
  setBit,
  clearBit,
  updateBit,
  isEven,
  isPositive,
  multiplyByTwo,
  divideByTwo,
  switchSign,
  multiply,
  countSetBits,
  bitLength,
  isPowerOfTwo,
} from '../bits';

describe('Bitwise Algorithms', () => {
  it('getBit', () => {
    // 1(10) = 0001
    // 2(10) = 0010
    // 3(10) = 0011
    expect(getBit(1, 0)).toBe(1);
    expect(getBit(1, 1)).toBe(0);
    expect(getBit(2, 0)).toBe(0);
    expect(getBit(2, 1)).toBe(1);
    expect(getBit(3, 1)).toBe(1);
    expect(getBit(3, 2)).toBe(0);
  });

  it('setBit', () => {
    expect(setBit(1, 0)).toBe(1);
    expect(setBit(1, 1)).toBe(3);
    expect(setBit(1, 2)).toBe(5);
    expect(setBit(10, 2)).toBe(14); // 1010 | 0100 = 1110 (14)
  });

  it('clearBit', () => {
    expect(clearBit(1, 0)).toBe(0);
    expect(clearBit(1, 1)).toBe(1);
    expect(clearBit(10, 1)).toBe(8); // 1010 & 1101 = 1000 (8)
    expect(clearBit(10, 3)).toBe(2); // 1010 & 0111 = 0010 (2)
  });

  it('updateBit', () => {
    expect(updateBit(10, 1, 1)).toBe(10); // 1010 update bit 1 to 1 -> 1010 (10)
    expect(updateBit(10, 1, 0)).toBe(8); // 1010 update bit 1 to 0 -> 1000 (8)
    expect(updateBit(10, 2, 1)).toBe(14); // 1010 update bit 2 to 1 -> 1110 (14)
  });

  it('isEven', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(-2)).toBe(true);
  });

  it('isPositive', () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(2)).toBe(true);
    expect(isPositive(0)).toBe(false); // as defined in implementation
    expect(isPositive(-1)).toBe(false);
  });

  it('multiplyByTwo', () => {
    expect(multiplyByTwo(0)).toBe(0);
    expect(multiplyByTwo(1)).toBe(2);
    expect(multiplyByTwo(3)).toBe(6);
    expect(multiplyByTwo(10)).toBe(20);
    expect(multiplyByTwo(-2)).toBe(-4);
  });

  it('divideByTwo', () => {
    expect(divideByTwo(0)).toBe(0);
    expect(divideByTwo(1)).toBe(0);
    expect(divideByTwo(2)).toBe(1);
    expect(divideByTwo(6)).toBe(3);
    expect(divideByTwo(10)).toBe(5);
  });

  it('switchSign', () => {
    expect(switchSign(0)).toBe(0);
    expect(switchSign(1)).toBe(-1);
    expect(switchSign(-1)).toBe(1);
    expect(switchSign(32)).toBe(-32);
    expect(switchSign(-32)).toBe(32);
  });

  it('multiply', () => {
    expect(multiply(0, 0)).toBe(0);
    expect(multiply(2, 0)).toBe(0);
    expect(multiply(0, 2)).toBe(0);
    expect(multiply(1, 2)).toBe(2);
    expect(multiply(2, 1)).toBe(2);
    expect(multiply(2, 2)).toBe(4);
    expect(multiply(-2, 2)).toBe(-4);
    expect(multiply(2, -2)).toBe(-4);
    expect(multiply(-2, -2)).toBe(4);
    expect(multiply(7, 3)).toBe(21);
    expect(multiply(11, 13)).toBe(143);
  });

  it('countSetBits', () => {
    expect(countSetBits(0)).toBe(0);
    expect(countSetBits(1)).toBe(1);
    expect(countSetBits(2)).toBe(1); // 0010
    expect(countSetBits(3)).toBe(2); // 0011
    expect(countSetBits(5)).toBe(2); // 0101
    expect(countSetBits(21)).toBe(3); // 10101
    expect(countSetBits(255)).toBe(8); // 11111111
  });

  it('bitLength', () => {
    expect(bitLength(0)).toBe(0);
    expect(bitLength(1)).toBe(1);
    expect(bitLength(2)).toBe(2); // 10
    expect(bitLength(3)).toBe(2); // 11
    expect(bitLength(4)).toBe(3); // 100
    expect(bitLength(10)).toBe(4); // 1010
  });

  it('isPowerOfTwo', () => {
    expect(isPowerOfTwo(0)).toBe(false);
    expect(isPowerOfTwo(1)).toBe(true); // 2^0
    expect(isPowerOfTwo(2)).toBe(true); // 2^1
    expect(isPowerOfTwo(3)).toBe(false);
    expect(isPowerOfTwo(4)).toBe(true); // 2^2
    expect(isPowerOfTwo(5)).toBe(false);
    expect(isPowerOfTwo(16)).toBe(true); // 2^4
    expect(isPowerOfTwo(1024)).toBe(true); // 2^10
  });
});
