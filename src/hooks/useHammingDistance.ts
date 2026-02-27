import { useState, useCallback, useEffect } from 'react';

import { hammingDistance } from '@/algorithms/string/hammingDistance';

export interface DistanceStep {
  index: number;
  charA: string;
  charB: string;
  isDifferent: boolean;
  currentDistance: number;
}

export const useHammingDistance = () => {
  const [stringA, setStringA] = useState('karolin');
  const [stringB, setStringB] = useState('kathrin');
  const [steps, setSteps] = useState<DistanceStep[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(() => {
    if (stringA.length !== stringB.length) {
      setError('2つの文字列の長さが一致しません');
      setSteps([]);
      setResult(null);
      return;
    }

    setError(null);
    let currentDist = 0;
    const newSteps: DistanceStep[] = [];

    for (let i = 0; i < stringA.length; i++) {
      const isDiff = stringA[i] !== stringB[i];
      if (isDiff) {
        currentDist += 1;
      }
      newSteps.push({
        index: i,
        charA: stringA[i],
        charB: stringB[i],
        isDifferent: isDiff,
        currentDistance: currentDist,
      });
    }

    setSteps(newSteps);
    try {
      setResult(hammingDistance(stringA, stringB));
    } catch {
      setResult(null);
    }
  }, [stringA, stringB]);

  const handleSetStringA = (val: string) => {
    setStringA(val);
    if (val.length !== stringB.length) {
      setError('2つの文字列の長さが一致しません');
    } else {
      setError(null);
    }
    setSteps([]);
    setResult(null);
  };

  const handleSetStringB = (val: string) => {
    setStringB(val);
    if (stringA.length !== val.length) {
      setError('2つの文字列の長さが一致しません');
      setSteps([]);
      setResult(null);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (!error && stringA && stringB) {
      calculate();
    }
  }, [stringA, stringB, error, calculate]);

  return {
    stringA,
    stringB,
    handleSetStringA,
    handleSetStringB,
    calculate,
    steps,
    result,
    error,
  };
};
