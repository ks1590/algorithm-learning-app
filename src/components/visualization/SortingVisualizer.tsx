import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { AlgorithmStep, SortingAlgorithm } from '../../algorithms/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

type SortingVisualizerProps = {
  algorithm: SortingAlgorithm;
  initialArray: number[];
  algorithmName: string;
};

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ 
  algorithm, 
  initialArray, 
  algorithmName 
}) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  // Speed: delay in ms. Lower is faster.
  // Range slider: 1 (slow) to 100 (fast).
  // Map 1-100 to delay.
  // Delay = 500 - (value * 5) ?
  // If value=1, delay=495. value=100, delay=0.
  const [speedVal, setSpeedVal] = useState(50);
  
  const generatorRef = useRef<Generator<AlgorithmStep, void, unknown> | null>(null);
  const intervalRef = useRef<number | null>(null);

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
    generatorRef.current = null;
  }, [initialArray]);

  const start = () => {
    let currentArray = array;
    if (isFinished) {
      currentArray = [...initialArray];
      setArray(currentArray);
      setComparing([-1, -1]);
      setSortedIndices([]);
      setIsFinished(false);
      generatorRef.current = null;
    }
    
    if (!generatorRef.current) {
        generatorRef.current = algorithm(currentArray);
    }
    
    setIsSorting(true);
  };

  const stop = () => {
    setIsSorting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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
      return;
    }
    
    if (value) {
      setArray(value.array);
      setComparing(value.comparing);
      setSortedIndices(value.sortedIndices);
    }
  }, []);

  useEffect(() => {
    if (isSorting) {
      // Calculate delay based on speedVal
      // speedVal 1 (slow) -> 100 (fast)
      // Delay: 1 -> 500ms, 100 -> 10ms
      const delay = Math.max(10, 510 - (speedVal * 5));
      
      intervalRef.current = window.setInterval(step, delay);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSorting, speedVal, step]);



  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-4">
      <h3 className="text-2xl font-bold">{algorithmName}</h3>
      
      <div className="flex items-end justify-center w-full h-80 bg-gray-50 rounded-lg p-4 border border-gray-200 gap-1">
        {array.map((value, idx) => {
            const isComparing = comparing.includes(idx);
            const isSorted = sortedIndices.includes(idx);
            
            // Color logic
            let bgClass = 'bg-blue-400';
            if (isFinished) bgClass = 'bg-green-500';
            else if (isComparing) bgClass = 'bg-yellow-400';
            else if (isSorted) bgClass = 'bg-green-300';
            
            const height = `${Math.max(5, (value / Math.max(...initialArray, 1)) * 100)}%`;
            
            return (
                <div 
                    key={idx}
                    className={`flex-1 rounded-t transition-all duration-100 ${bgClass}`}
                    style={{ height }}
                    title={value.toString()}
                ></div>
            );
        })}
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-6 w-full">
        <div className="flex gap-2">
            <Button onClick={isSorting ? stop : start}>
              {isSorting ? '一時停止' : isFinished ? 'もう一度' : '開始'}
            </Button>
            <Button variant="secondary" onClick={reset}>
              リセット
            </Button>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-gray-200">
            <span className="text-sm font-medium text-gray-700">速度:</span>
            <span className="text-xs text-gray-500">遅</span>
            <Slider 
                min={1} 
                max={100} 
                step={1} 
                value={[speedVal]} 
                onValueChange={(vals) => setSpeedVal(vals[0])}
                className="w-32 cursor-pointer"
            />
            <span className="text-xs text-gray-500">速</span>
        </div>
      </div>
    </div>
  );
};
