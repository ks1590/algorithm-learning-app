import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useSearchVisualizer } from '@/hooks/useSearchVisualizer';

describe('useSearchVisualizer', () => {
  it('デフォルト値で初期化されること', () => {
    const { result } = renderHook(() => useSearchVisualizer());

    // 初期化直後は useEffect が走って array が生成される
    expect(result.current.array.length).toBeGreaterThan(0);
    expect(result.current.target).toBe('');
    expect(result.current.algorithm).toBe('linear');
    expect(result.current.isSearching).toBe(false);
    expect(result.current.foundIndex).toBeNull();
  });

  it('アルゴリズムを更新し、配列がソートされること', () => {
    const { result } = renderHook(() => useSearchVisualizer());

    act(() => {
      result.current.setAlgorithm('binary');
    });

    expect(result.current.algorithm).toBe('binary');

    // binary探索に変更されると配列がソートされるはずなので確認
    const isSorted = result.current.array.every((val, i, arr) => !i || arr[i - 1] <= val);
    expect(isSorted).toBe(true);
  });

  it('ターゲット入力値が更新されること', () => {
    const { result } = renderHook(() => useSearchVisualizer());

    act(() => {
      result.current.setTarget('42');
    });

    expect(result.current.target).toBe('42');
  });

  it('探索のリセットが正しく行われること', () => {
    const { result } = renderHook(() => useSearchVisualizer());

    act(() => {
      result.current.setTarget('42');
      // 内部状態を変更したと仮定
      result.current.resetSearch();
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.currentStep).toBeNull();
    expect(result.current.foundIndex).toBeNull();
    expect(result.current.message).toBe('');
  });

  it('無効なターゲットの場合は探索が開始されないこと', async () => {
    const { result } = renderHook(() => useSearchVisualizer());

    await act(async () => {
      await result.current.handleStart();
    });

    expect(result.current.message).toBe('探索する数値を入力してください');
    expect(result.current.isSearching).toBe(false);
  });
});
