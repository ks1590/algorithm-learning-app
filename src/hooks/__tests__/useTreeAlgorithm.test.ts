import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TreeNode } from '@/algorithms/tree/TreeNode';
import { useTreeAlgorithm } from '@/hooks/useTreeAlgorithm';

describe('useTreeAlgorithm', () => {
  it('デフォルト値で初期化されること', () => {
    const { result } = renderHook(() => useTreeAlgorithm());

    expect(result.current.root).toBeInstanceOf(TreeNode);
    expect(result.current.activeNode).toBeNull();
    expect(result.current.visitedNodes.size).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.selectedAlgo).toBe('bfs');
    expect(result.current.nodeCount).toBe(15);
    expect(result.current.speed).toBe(500);
  });

  it('指定されたノード数でランダムな木を生成できること', () => {
    const { result } = renderHook(() => useTreeAlgorithm());

    act(() => {
      result.current.generateRandomTree(5);
    });

    expect(result.current.root).toBeInstanceOf(TreeNode);
    expect(result.current.root?.value).toBe(1);
  });

  it('選択されたアルゴリズムを更新できること', () => {
    const { result } = renderHook(() => useTreeAlgorithm());

    act(() => {
      result.current.setSelectedAlgo('dfs-inorder');
    });

    expect(result.current.selectedAlgo).toBe('dfs-inorder');
  });

  it('アルゴリズムを実行し、期待通り状態が更新・停止されること', async () => {
    const { result } = renderHook(() => useTreeAlgorithm());

    act(() => {
      result.current.generateRandomTree(3);
    });

    act(() => {
      result.current.runAlgorithm();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.stopAlgorithm();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.activeNode).toBeNull();
  });

  it('状態を正しくリセットできること', () => {
    const { result } = renderHook(() => useTreeAlgorithm());

    act(() => {
      result.current.generateRandomTree(5);
    });

    act(() => {
      result.current.visitedNodes.add(result.current.root!);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.visitedNodes.size).toBe(0);
    expect(result.current.activeNode).toBeNull();
    expect(result.current.isRunning).toBe(false);
  });
});
