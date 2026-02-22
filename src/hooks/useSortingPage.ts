import { useState, useCallback, useRef, useEffect } from 'react';

import type { SortingVisualizerHandle } from '@/components/visualization/SortingVisualizer';
import { ALGORITHMS, type AlgorithmKey } from '@/constants/sortingAlgorithms';

export type ComparisonSlot = {
  id: string;
  algo: AlgorithmKey;
};

export function useSortingPage() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmKey>('bubble');
  const [arraySize, setArraySize] = useState(100);
  const [initialArray, setInitialArray] = useState<number[]>(() =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5),
  );
  const [arrayVersion, setArrayVersion] = useState(0);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [slots, setSlots] = useState<ComparisonSlot[]>([
    { id: '1', algo: 'bubble' },
    { id: '2', algo: 'quick' },
  ]);
  const [globalSpeed, setGlobalSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});

  const visualizerRefs = useRef<{ [key: string]: SortingVisualizerHandle | null }>({});

  const generateArray = useCallback(() => {
    const maxVal = Math.max(100, arraySize * 2);
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * (maxVal - 5)) + 5);
    setInitialArray(newArray);
    setArrayVersion((v) => v + 1);

    Object.values(visualizerRefs.current).forEach((ref) => ref?.reset());
    setIsRunning(false);
    setResults({});
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const addSlot = () => {
    if (slots.length >= 3) return;
    const newId = Math.random().toString(36).substr(2, 9);

    const usedAlgos = slots.map((s) => s.algo);
    const availableAlgo =
      (Object.keys(ALGORITHMS) as AlgorithmKey[]).find((algo) => !usedAlgos.includes(algo)) || 'bubble';

    setSlots([...slots, { id: newId, algo: availableAlgo }]);
  };

  const removeSlot = (id: string) => {
    if (slots.length <= 1) return;
    setSlots(slots.filter((s) => s.id !== id));
    delete visualizerRefs.current[id];
  };

  const updateSlotAlgo = (id: string, algo: AlgorithmKey) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, algo } : s)));
  };

  const startAll = () => {
    setResults({});
    Object.values(visualizerRefs.current).forEach((ref) => ref?.start());
    setIsRunning(true);
  };

  const stopAll = () => {
    Object.values(visualizerRefs.current).forEach((ref) => ref?.stop());
    setIsRunning(false);
  };

  const resetAll = () => {
    Object.values(visualizerRefs.current).forEach((ref) => ref?.reset());
    setIsRunning(false);
    setResults({});
  };

  const handleSortFinish = useCallback((id: string, time: number) => {
    setResults((prev) => ({ ...prev, [id]: time }));
  }, []);

  return {
    selectedAlgo,
    setSelectedAlgo,
    arraySize,
    setArraySize,
    initialArray,
    arrayVersion,
    isComparisonMode,
    setIsComparisonMode,
    slots,
    globalSpeed,
    setGlobalSpeed,
    isRunning,
    results,
    visualizerRefs,
    generateArray,
    addSlot,
    removeSlot,
    updateSlotAlgo,
    startAll,
    stopAll,
    resetAll,
    handleSortFinish,
  };
}
