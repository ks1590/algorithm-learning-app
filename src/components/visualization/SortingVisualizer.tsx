import React, { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import type { AlgorithmStep, SortingAlgorithm } from '../../algorithms/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export type SortingVisualizerHandle = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type SortingVisualizerProps = {
  algorithm: SortingAlgorithm;
  initialArray: number[];
  algorithmName: string;
  speed?: number; // External speed control
  hideControls?: boolean; // Hide local controls for comparison mode
  className?: string;
  removeShadow?: boolean;
};

export const SortingVisualizer = forwardRef<SortingVisualizerHandle, SortingVisualizerProps>(({ 
  algorithm, 
  initialArray, 
  algorithmName,
  speed,
  hideControls = false,
  className,
  removeShadow = false
}, ref) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [localSpeed, setLocalSpeed] = useState(50);
  
  // Use external speed if provided, otherwise local
  const currentSpeed = speed !== undefined ? speed : localSpeed;
  
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

  const start = useCallback(() => {
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
  }, [array, isFinished, initialArray, algorithm]);

  const stop = useCallback(() => {
    setIsSorting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    start,
    stop,
    reset
  }));

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
      const delay = Math.max(10, 510 - (currentSpeed * 5));
      
      intervalRef.current = window.setInterval(step, delay);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSorting, currentSpeed, step]);

  // Sync with initialArray changes
  useEffect(() => {
      reset();
  }, [initialArray, reset]);


  return (
    <div className={`flex flex-col items-center gap-4 w-full mx-auto py-4 ${className}`}>
      {!hideControls && <h3 className="text-3xl font-black tracking-tight">{algorithmName}</h3>}
      
      <div className={`flex items-end justify-center w-full h-64 bg-white rounded-xl border-2 border-border p-4 ${array.length > 50 ? 'gap-0' : 'gap-1'}`}>
        {array.map((value, idx) => {
            const isComparing = comparing.includes(idx);
            const isSorted = sortedIndices.includes(idx);
            
            // Color logic
            let bgClass = 'bg-primary'; // Pink
            if (isFinished) bgClass = 'bg-accent'; // Teal
            else if (isComparing) bgClass = 'bg-secondary'; // Yellow
            else if (isSorted) bgClass = 'bg-accent'; // Teal
            
            const height = `${Math.max(5, (value / Math.max(...initialArray, 1)) * 100)}%`;
            
            return (
                <div 
                    key={idx}
                    className={`flex-1 transition-none ${array.length > 50 ? '' : 'border-2 border-border'} ${bgClass}`}
                    style={{ height }}
                    title={value.toString()}
                ></div>
            );
        })}
      </div>
      
      {!hideControls && (
        <div className="flex flex-wrap items-center justify-center gap-8 w-full mt-4">
            <div className="flex gap-4">
                <Button onClick={isSorting ? stop : start} className="w-32">
                {isSorting ? '一時停止' : isFinished ? 'もう一度' : '開始'}
                </Button>
                <Button variant="secondary" onClick={reset} className="w-32">
                リセット
                </Button>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl border-2 border-border shadow-[4px_4px_0_0_#000]">
                <span className="text-sm font-bold">速度</span>
                <span className="text-xs font-bold">遅</span>
                <Slider 
                    min={1} 
                    max={100} 
                    step={1} 
                    value={[localSpeed]} 
                    onValueChange={(vals) => setLocalSpeed(vals[0])}
                    className="w-40 cursor-pointer"
                />
                <span className="text-xs font-bold">速</span>
            </div>
        </div>
      )}
    </div>
  );
});

SortingVisualizer.displayName = 'SortingVisualizer';
