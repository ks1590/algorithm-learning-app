import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { usePalindrome } from '../usePalindrome';

describe('usePalindrome', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => usePalindrome());

    expect(result.current.inputString).toBe('racecar');
    expect(result.current.result).toBe(true);
    expect(result.current.steps.length).toBeGreaterThan(0);
  });

  it('should calculate steps correctly for a palindrome', () => {
    const { result } = renderHook(() => usePalindrome());

    act(() => {
      result.current.handleSetInputString('aba');
      result.current.calculate();
    });

    expect(result.current.result).toBe(true);
    expect(result.current.steps).toEqual([
      { leftIndex: 0, rightIndex: 2, leftChar: 'a', rightChar: 'a', isMatch: true },
      { leftIndex: 1, rightIndex: 1, leftChar: 'b', rightChar: 'b', isMatch: true },
    ]);
  });

  it('should identify a non-palindrome correctly and stop at mismatch', () => {
    const { result } = renderHook(() => usePalindrome());

    act(() => {
      result.current.handleSetInputString('abca');
      result.current.calculate();
    });

    expect(result.current.result).toBe(false);
    expect(result.current.steps).toEqual([
      { leftIndex: 0, rightIndex: 3, leftChar: 'a', rightChar: 'a', isMatch: true },
      { leftIndex: 1, rightIndex: 2, leftChar: 'b', rightChar: 'c', isMatch: false },
    ]);
  });

  it('should handle empty string', () => {
    const { result } = renderHook(() => usePalindrome());

    act(() => {
      result.current.handleSetInputString('');
      result.current.calculate();
    });

    expect(result.current.result).toBe(null);
    expect(result.current.steps).toEqual([]);
  });
});
