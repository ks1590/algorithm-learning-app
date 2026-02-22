import { useImperativeHandle, forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useSortingVisualizer } from '@/hooks/useSortingVisualizer';

import type { SortingAlgorithm } from '../../algorithms/types';

export type SortingVisualizerHandle = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type SortingVisualizerProps = {
  algorithm: SortingAlgorithm;
  initialArray: number[];
  algorithmName: string;
  speed?: number; // 外部からの速度制御
  hideControls?: boolean; // 比較モード用にローカルコントロールを隠す
  className?: string;
  removeShadow?: boolean;
  onFinish?: (elapsedTime: number) => void;
};

export const SortingVisualizer = forwardRef<SortingVisualizerHandle, SortingVisualizerProps>(
  ({ algorithm, initialArray, algorithmName, speed, hideControls = false, className, onFinish }, ref) => {
    const {
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
    } = useSortingVisualizer(algorithm, initialArray, speed, onFinish);

    // 親コンポーネントにメソッドを公開
    useImperativeHandle(ref, () => ({
      start,
      stop,
      reset,
    }));

    return (
      <div className={`flex flex-col items-center gap-4 w-full mx-auto py-4 ${className}`}>
        <div className="flex justify-between items-center w-full px-4">
          {!hideControls && <h3 className="text-3xl font-black tracking-tight">{algorithmName}</h3>}
          {(isSorting || elapsedTime !== null) && (
            <div className="bg-black text-white px-3 py-1 rounded-md font-mono text-sm shadow-md ml-auto">
              {isSorting ? '計測中...' : `Time: ${(elapsedTime! / 1000).toFixed(3)}秒`}
            </div>
          )}
        </div>

        <div className={`flex items-end justify-center w-full h-64 bg-white rounded-xl border-2 border-border p-4`}>
          {array.map((value, idx) => {
            const isComparing = comparing.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            // 色のロジック
            let bgClass = 'bg-muted'; // ペリウィンクル
            if (isFinished)
              bgClass = 'bg-primary'; // ピンク
            else if (isComparing)
              bgClass = 'bg-secondary'; // イエロー
            else if (isSorted) bgClass = 'bg-primary'; // ピンク

            const height = `${Math.max(5, (value / Math.max(...initialArray, 1)) * 100)}%`;

            return (
              <div
                key={idx}
                className={`flex-1 transition-none ${bgClass}`}
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
  },
);

SortingVisualizer.displayName = 'SortingVisualizer';
