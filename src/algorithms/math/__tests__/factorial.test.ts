import { describe, it, expect } from 'vitest';

import { factorial, factorialRecursive } from '../factorial';

describe('factorial', () => {
  it('should calculate factorial using iterative approach', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(8)).toBe(40320);
    expect(factorial(10)).toBe(3628800);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow('負の数の階乗は定義されていません');
  });
});

describe('factorialRecursive', () => {
  it('should calculate factorial using recursive approach', () => {
    expect(factorialRecursive(0)).toBe(1);
    expect(factorialRecursive(1)).toBe(1);
    expect(factorialRecursive(5)).toBe(120);
    expect(factorialRecursive(8)).toBe(40320);
    expect(factorialRecursive(10)).toBe(3628800);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => factorialRecursive(-1)).toThrow('負の数の階乗は定義されていません');
  });
});
