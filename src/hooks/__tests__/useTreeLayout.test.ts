import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TreeNode } from '@/algorithms/tree/TreeNode';
import { useTreeLayout } from '@/hooks/useTreeLayout';

describe('useTreeLayout', () => {
  it('rootがnullの場合、空の配列と0を返すこと', () => {
    const { result } = renderHook(() => useTreeLayout(null));

    expect(result.current.nodes).toEqual([]);
    expect(result.current.links).toEqual([]);
    expect(result.current.totalWidth).toBe(0);
    expect(result.current.totalHeight).toBe(0);
  });

  it('ノードが渡された場合、レイアウトが計算されること', () => {
    // 1. Arrange: 手動で小さな木を作成
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    // 2. Act
    const { result } = renderHook(() => useTreeLayout(root));

    // 3. Assert
    expect(result.current.nodes).toHaveLength(3);
    // root (1), left (2), right (3) - 確実な順序はD3依存だが、数は3

    // エッジ (links) はノード数 - 1 なので 2本になるはず
    expect(result.current.links).toHaveLength(2);

    // X, Y座標が計算されていること (具体的な値はD3の計算に依存するため、存在チェック)
    expect(result.current.nodes[0].x).toBeTypeOf('number');
    expect(result.current.nodes[0].y).toBeTypeOf('number');

    // 幅と高さが0以上になっていること
    expect(result.current.totalWidth).toBeGreaterThan(0);
    expect(result.current.totalHeight).toBeGreaterThan(0);
  });
});
