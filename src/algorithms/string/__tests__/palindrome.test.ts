import { describe, it, expect } from 'vitest';

import { isPalindrome } from '../palindrome/palindrome';

describe('isPalindrome', () => {
  it('should return true for valid palindromes', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
    expect(isPalindrome('aa')).toBe(true);
    expect(isPalindrome('aba')).toBe(true);
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('madam')).toBe(true);
    expect(isPalindrome('12321')).toBe(true);
  });

  it('should return false for invalid palindromes', () => {
    expect(isPalindrome('ab')).toBe(false);
    expect(isPalindrome('abc')).toBe(false);
    expect(isPalindrome('racecars')).toBe(false);
    expect(isPalindrome('madaM')).toBe(false); // Case sensitive
  });
});
