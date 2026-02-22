import { useState, useEffect, useRef, useCallback } from 'react';

import type { AlgorithmStep, SortingAlgorithm } from '@/algorithms/types';

export function useSortingVisualizer(
  algorithm: SortingAlgorithm,
  initialArray: number[],
  speed?: number,
  onFinish?: (elapsedTime: number) => void,
) {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [localSpeed, setLocalSpeed] = useState(50);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const currentSpeed = speed !== undefined ? speed : localSpeed;

  const generatorRef = useRef<Generator<AlgorithmStep, void, unknown> | null>(null);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setIsSorting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setArray([...initialArray]);
    setComparing([-1, -1]);
    setSortedIndices([]);
    setIsFinished(false);
    setElapsedTime(null);
    generatorRef.current = null;
    startTimeRef.current = null;
  }, [initialArray]);

  const start = useCallback(() => {
    let currentArray = array;
    if (isFinished) {
      currentArray = [...initialArray];
      setArray(currentArray);
      setComparing([-1, -1]);
      setSortedIndices([]);
      setIsFinished(false);
      setElapsedTime(null);
      generatorRef.current = null;
    }

    if (!generatorRef.current) {
      generatorRef.current = algorithm(currentArray);
    }

    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    setIsSorting(true);
  }, [array, isFinished, initialArray, algorithm]);

  const stop = useCallback(() => {
    setIsSorting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const step = useCallback(() => {
    if (!generatorRef.current) return;

    const { value, done } = generatorRef.current.next();

    if (done) {
      setIsSorting(false);
      setIsFinished(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const endTime = performance.now();
      if (startTimeRef.current) {
        const duration = endTime - startTimeRef.current;
        setElapsedTime(duration);
        if (onFinish) {
          onFinish(duration);
        }
      }
      return;
    }

    if (value) {
      setArray(value.array);
      setComparing(value.comparing);
      setSortedIndices(value.sortedIndices);
    }
  }, [onFinish]);

  useEffect(() => {
    if (isSorting) {
      const maxDelay = 200;
      const minDelay = 1;
      const delay = Math.max(minDelay, maxDelay - (currentSpeed - 1) * ((maxDelay - minDelay) / 99));

      intervalRef.current = window.setInterval(step, delay);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSorting, currentSpeed, step]);

  useEffect(() => {
    reset();
  }, [initialArray, reset]);

  return {
    array,
    comparing,
    sortedIndices,
    isSorting,
    isFinished,
    localSpeed,
    setLocalSpeed,
    elapsedTime,
    start,
    stop,
    reset,
  };
}
