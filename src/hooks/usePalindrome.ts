import { useState, useCallback, useEffect } from 'react';

import { isPalindrome } from '@/algorithms/string/palindrome/palindrome';

export interface PalindromeStep {
  leftIndex: number;
  rightIndex: number;
  leftChar: string;
  rightChar: string;
  isMatch: boolean;
}

export const usePalindrome = () => {
  const [inputString, setInputString] = useState('racecar');
  const [steps, setSteps] = useState<PalindromeStep[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const calculate = useCallback(() => {
    if (!inputString) {
      setSteps([]);
      setResult(null);
      return;
    }

    const newSteps: PalindromeStep[] = [];
    let left = 0;
    let right = inputString.length - 1;
    let isPalin = true;

    while (left < right) {
      const isMatch = inputString[left] === inputString[right];
      newSteps.push({
        leftIndex: left,
        rightIndex: right,
        leftChar: inputString[left],
        rightChar: inputString[right],
        isMatch,
      });

      if (!isMatch) {
        isPalin = false;
        break; // Stop when mismatch is found for visualization
      }

      left += 1;
      right -= 1;
    }

    // For even length palindromes, the loop finishes when left >= right.
    // For odd length palindromes, left === right at the center.
    // We can add a step for the center if left === right to highlight it.
    if (isPalin && left === right) {
      newSteps.push({
        leftIndex: left,
        rightIndex: right,
        leftChar: inputString[left],
        rightChar: inputString[right],
        isMatch: true,
      });
    }

    setSteps(newSteps);
    setResult(isPalindrome(inputString));
  }, [inputString]);

  const handleSetInputString = (val: string) => {
    setInputString(val);
    setSteps([]);
    setResult(null);
  };

  useEffect(() => {
    if (inputString !== null) {
      calculate();
    }
  }, [inputString, calculate]);

  return {
    inputString,
    handleSetInputString,
    calculate,
    steps,
    result,
  };
};
