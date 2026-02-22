import { describe, it, expect } from 'vitest';

import { bfs } from '@/algorithms/tree/bfs';
import { TreeNode } from '@/algorithms/tree/TreeNode';

describe('bfs (幅優先探索)', () => {
  it('木構造を正しく幅優先で探索できること', () => {
    // 1
    // ├── 2
    // │   ├── 4
    // │   └── 5
    // └── 3
    const root = new TreeNode(1);
    const n2 = new TreeNode(2);
    const n3 = new TreeNode(3);
    const n4 = new TreeNode(4);
    const n5 = new TreeNode(5);

    root.setLeft(n2).setRight(n3);
    n2.setLeft(n4).setRight(n5);

    const generator = bfs(root);
    const result: (string | number)[] = [];

    for (const node of generator) {
      result.push(node.value);
    }

    // BFSの期待順序: 1 -> 2 -> 3 -> 4 -> 5
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('1つのノードだけの木を正しく探索できること', () => {
    const root = new TreeNode(1);
    const generator = bfs(root);

    const result: (string | number)[] = [];
    for (const node of generator) {
      result.push(node.value);
    }

    expect(result).toEqual([1]);
  });
});
