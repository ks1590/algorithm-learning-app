import { useState, useEffect, useRef, useCallback } from 'react';

import { binarySearch } from '@/algorithms/search/binarySearch';
import type { BinarySearchStep } from '@/algorithms/search/binarySearch';
import { interpolationSearch } from '@/algorithms/search/interpolationSearch';
import type { InterpolationSearchStep } from '@/algorithms/search/interpolationSearch';
import { jumpSearch } from '@/algorithms/search/jumpSearch';
import type { JumpSearchStep } from '@/algorithms/search/jumpSearch';
import { linearSearch } from '@/algorithms/search/linearSearch';
import type { SearchStep } from '@/algorithms/search/linearSearch';

export type AlgorithmType = 'linear' | 'binary' | 'jump' | 'interpolation';

export function useSearchVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('linear');
  const [isSearching, setIsSearching] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    SearchStep | BinarySearchStep | JumpSearchStep | InterpolationSearchStep | null
  >(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState(500);
  const [elementCount, setElementCount] = useState(20);
  const [message, setMessage] = useState('');

  const isSearchingRef = useRef(false);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const resetSearch = useCallback(() => {
    setIsSearching(false);
    isSearchingRef.current = false;
    setCurrentStep(null);
    setFoundIndex(null);
    setMessage('');
  }, []);

  const generateArray = useCallback(() => {
    const uniqueNumbers = new Set<number>();
    const maxVal = Math.max(100, elementCount * 3);

    while (uniqueNumbers.size < elementCount) {
      uniqueNumbers.add(Math.floor(Math.random() * maxVal));
    }

    const newArray = Array.from(uniqueNumbers);

    if (algorithm === 'binary' || algorithm === 'jump' || algorithm === 'interpolation') {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    resetSearch();
  }, [elementCount, algorithm, resetSearch]);

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementCount]);

  useEffect(() => {
    if (algorithm === 'binary' || algorithm === 'jump' || algorithm === 'interpolation') {
      setArray((prev) => [...prev].sort((a, b) => a - b));
      resetSearch();
    }
  }, [algorithm, resetSearch]);

  const handleStart = async () => {
    if (!target) {
      setMessage('探索する数値を入力してください');
      return;
    }
    const targetNum = parseInt(target);
    if (isNaN(targetNum)) {
      setMessage('無効な数値です');
      return;
    }

    resetSearch();
    setIsSearching(true);
    isSearchingRef.current = true;
    setMessage('探索中...');

    if (algorithm === 'linear') {
      const generator = linearSearch(array, targetNum);
      for (const step of generator) {
        if (!isSearchingRef.current) break;

        setCurrentStep(step);

        if (step.found) {
          setFoundIndex(step.currentIndex);
          setMessage(`インデックス ${step.currentIndex} で見つかりました！`);
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        if (step.done && !step.found) {
          setMessage('見つかりませんでした。');
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, speedRef.current));
      }
    } else if (algorithm === 'binary') {
      const generator = binarySearch(array, targetNum);
      for (const step of generator) {
        if (!isSearchingRef.current) break;

        setCurrentStep(step);

        if (step.found) {
          setFoundIndex(step.mid);
          setMessage(`インデックス ${step.mid} で見つかりました！`);
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        if (step.done && !step.found) {
          setMessage('見つかりませんでした。');
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, speedRef.current));
      }
    } else if (algorithm === 'jump') {
      const generator = jumpSearch(array, targetNum);
      for (const step of generator) {
        if (!isSearchingRef.current) break;

        setCurrentStep(step);

        if (step.found) {
          setFoundIndex(step.index);
          setMessage(`インデックス ${step.index} で見つかりました！`);
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        if (step.done && !step.found) {
          setMessage('見つかりませんでした。');
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, speedRef.current));
      }
    } else if (algorithm === 'interpolation') {
      const generator = interpolationSearch(array, targetNum);
      for (const step of generator) {
        if (!isSearchingRef.current) break;

        setCurrentStep(step);

        if (step.found) {
          setFoundIndex(step.pos);
          setMessage(`インデックス ${step.pos} で見つかりました！`);
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        if (step.done && !step.found) {
          setMessage('見つかりませんでした。');
          setIsSearching(false);
          isSearchingRef.current = false;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, speedRef.current));
      }
    }
  };

  const getBarColor = useCallback(
    (index: number) => {
      if (foundIndex === index) return 'bg-green-500';

      if (currentStep) {
        if (algorithm === 'linear') {
          const step = currentStep as SearchStep;
          if (step.currentIndex === index) return 'bg-yellow-500';
        } else if (algorithm === 'binary') {
          const step = currentStep as BinarySearchStep;
          if (index === step.mid) return 'bg-yellow-500';
          if (index >= step.left && index <= step.right) return 'bg-blue-200';
          return 'bg-gray-200 opacity-50';
        } else if (algorithm === 'jump') {
          const step = currentStep as JumpSearchStep;
          if (step.type === 'jump') {
            if (index === step.index) return 'bg-yellow-500';
            if (index < step.index) return 'bg-gray-200 opacity-50';
          } else {
            if (index === step.index) return 'bg-orange-500';
          }
        } else if (algorithm === 'interpolation') {
          const step = currentStep as InterpolationSearchStep;
          if (index === step.pos) return 'bg-purple-500';
          if (index >= step.low && index <= step.high) return 'bg-blue-200';
          return 'bg-gray-200 opacity-50';
        }
      }
      return 'bg-primary';
    },
    [algorithm, currentStep, foundIndex],
  );

  return {
    array,
    target,
    setTarget,
    algorithm,
    setAlgorithm,
    isSearching,
    currentStep,
    foundIndex,
    speed,
    setSpeed,
    elementCount,
    setElementCount,
    message,
    handleStart,
    resetSearch,
    generateArray,
    getBarColor,
  };
}
