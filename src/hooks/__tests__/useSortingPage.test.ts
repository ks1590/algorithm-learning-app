import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useSortingPage } from '@/hooks/useSortingPage';

describe('useSortingPage', () => {
  it('デフォルト値で初期化されること', () => {
    const { result } = renderHook(() => useSortingPage());

    expect(result.current.selectedAlgo).toBe('bubble');
    expect(result.current.arraySize).toBe(100);
    expect(result.current.isComparisonMode).toBe(false);
    expect(result.current.slots).toHaveLength(2);
    expect(result.current.globalSpeed).toBe(50);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toEqual({});
  });

  it('配列のサイズを更新し、配列を再生成すること', () => {
    const { result } = renderHook(() => useSortingPage());

    act(() => {
      result.current.setArraySize(50);
    });

    // 3. Assert
    expect(result.current.arraySize).toBe(50);
    expect(result.current.initialArray).toHaveLength(50);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toEqual({});
  });

  it('比較モードで新しいスロットを追加できること', () => {
    const { result } = renderHook(() => useSortingPage());

    act(() => {
      result.current.addSlot();
    });

    expect(result.current.slots).toHaveLength(3);
    const algos = result.current.slots.map((s) => s.algo);
    // 3つのスロットすべてが異なるアルゴリズムを持つことを確認する（デフォルトのbubble、quick、およびその他のアルゴリズムから可能であれば）
    expect(new Set(algos).size).toBe(3);
  });

  it('スロットを3つ以上追加できないこと', () => {
    const { result } = renderHook(() => useSortingPage());

    act(() => {
      result.current.addSlot(); // 3つ目のスロット
    });
    act(() => {
      result.current.addSlot(); // 4つ目は追加されないはず
    });

    expect(result.current.slots).toHaveLength(3);
  });

  it('スロットを削除できること', () => {
    const { result } = renderHook(() => useSortingPage());
    const initialSlotId = result.current.slots[0].id;

    act(() => {
      result.current.removeSlot(initialSlotId);
    });
    expect(result.current.slots).toHaveLength(1);
    expect(result.current.slots[0].id).not.toBe(initialSlotId);
  });

  it('最後の1つのスロットは削除できないこと', () => {
    // 1. Arrange
    const { result } = renderHook(() => useSortingPage());
    const slotId1 = result.current.slots[0].id;
    const slotId2 = result.current.slots[1].id;

    // 2. Act
    act(() => {
      result.current.removeSlot(slotId1);
    });
    act(() => {
      result.current.removeSlot(slotId2); // 最後の1つを削除しようとする
    });

    // 3. Assert
    expect(result.current.slots).toHaveLength(1);
  });

  it('スロットのアルゴリズムを更新できること', () => {
    // 1. Arrange
    const { result } = renderHook(() => useSortingPage());
    const slotId = result.current.slots[0].id;

    // 2. Act
    act(() => {
      result.current.updateSlotAlgo(slotId, 'merge');
    });

    // 3. Assert
    const updatedSlot = result.current.slots.find((s) => s.id === slotId);
    expect(updatedSlot?.algo).toBe('merge');
  });

  it('アルゴリズムの実行と停止ができ、isRunning状態が更新されること', () => {
    const { result } = renderHook(() => useSortingPage());

    const mockStart = vi.fn();
    const mockStop = vi.fn();

    result.current.visualizerRefs.current = {
      '1': { start: mockStart, stop: mockStop, reset: vi.fn() },
      '2': { start: mockStart, stop: mockStop, reset: vi.fn() },
    };

    act(() => {
      result.current.startAll();
    });

    expect(result.current.isRunning).toBe(true);
    expect(mockStart).toHaveBeenCalledTimes(2);

    act(() => {
      result.current.stopAll();
    });

    expect(result.current.isRunning).toBe(false);
    expect(mockStop).toHaveBeenCalledTimes(2);
  });

  it('ソート完了時間を記録できること', () => {
    const { result } = renderHook(() => useSortingPage());

    act(() => {
      result.current.handleSortFinish('1', 1500);
    });

    act(() => {
      result.current.handleSortFinish('2', 2000);
    });

    expect(result.current.results).toEqual({
      '1': 1500,
      '2': 2000,
    });
  });
});
