import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { SortingAlgorithm } from '@/algorithms/types';
import { useSortingVisualizer } from '@/hooks/useSortingVisualizer';

describe('useSortingVisualizer', () => {
  // ダミーのソートアルゴリズムジェネレーター
  const mockAlgorithm: SortingAlgorithm = function* (arr: number[]) {
    // 1ステップだけ実行して終わる単純なモック
    yield { array: arr, comparing: [0, 1] as [number, number], sortedIndices: [], swapping: false };
  };

  const initialArray = [5, 3, 8, 1];

  it('デフォルト値で初期化されること', () => {
    const { result } = renderHook(() => useSortingVisualizer(mockAlgorithm, initialArray));

    expect(result.current.array).toEqual(initialArray);
    expect(result.current.comparing).toEqual([-1, -1]);
    expect(result.current.sortedIndices).toEqual([]);
    expect(result.current.isSorting).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  it('開始処理が正しく呼び出されること', () => {
    const { result } = renderHook(() => useSortingVisualizer(mockAlgorithm, initialArray));

    act(() => {
      result.current.start();
    });

    expect(result.current.isSorting).toBe(true);
  });

  it('停止処理が正しく呼び出されること', () => {
    const { result } = renderHook(() => useSortingVisualizer(mockAlgorithm, initialArray));

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.stop();
    });

    expect(result.current.isSorting).toBe(false);
  });

  it('リセット処理が正しく呼び出されること', () => {
    const { result } = renderHook(() => useSortingVisualizer(mockAlgorithm, initialArray));

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.isSorting).toBe(false);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.array).toEqual(initialArray);
    expect(result.current.comparing).toEqual([-1, -1]);
  });
});
