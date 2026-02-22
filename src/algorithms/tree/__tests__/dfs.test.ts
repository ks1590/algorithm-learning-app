import { describe, it, expect } from 'vitest';

import { dfsInOrder, dfsPreOrder, dfsPostOrder } from '@/algorithms/tree/dfs';
import { TreeNode } from '@/algorithms/tree/TreeNode';

describe('dfs (深さ優先探索)', () => {
  // 共通のテスト用ツリー
  //      1
  //     / \
  //    2   3
  //   / \
  //  4   5
  const getTestTree = () => {
    const root = new TreeNode(1);
    const n2 = new TreeNode(2);
    const n3 = new TreeNode(3);
    const n4 = new TreeNode(4);
    const n5 = new TreeNode(5);

    root.setLeft(n2).setRight(n3);
    n2.setLeft(n4).setRight(n5);

    return root;
  };

  describe('dfsInOrder (間順序)', () => {
    it('左 -> 根 -> 右 の順で探索できること', () => {
      const root = getTestTree();
      const generator = dfsInOrder(root);
      const result: (string | number)[] = [];

      for (const node of generator) {
        result.push(node.value);
      }

      // In-order期待順序: 4 -> 2 -> 5 -> 1 -> 3
      expect(result).toEqual([4, 2, 5, 1, 3]);
    });

    it('nullルートの場合は何もyieldしないこと', () => {
      const generator = dfsInOrder(null);
      const result = Array.from(generator);
      expect(result).toEqual([]);
    });
  });

  describe('dfsPreOrder (先行順序)', () => {
    it('根 -> 左 -> 右 の順で探索できること', () => {
      const root = getTestTree();
      const generator = dfsPreOrder(root);
      const result: (string | number)[] = [];

      for (const node of generator) {
        result.push(node.value);
      }

      // Pre-order期待順序: 1 -> 2 -> 4 -> 5 -> 3
      expect(result).toEqual([1, 2, 4, 5, 3]);
    });

    it('nullルートの場合は何もyieldしないこと', () => {
      const generator = dfsPreOrder(null);
      const result = Array.from(generator);
      expect(result).toEqual([]);
    });
  });

  describe('dfsPostOrder (後行順序)', () => {
    it('左 -> 右 -> 根 の順で探索できること', () => {
      const root = getTestTree();
      const generator = dfsPostOrder(root);
      const result: (string | number)[] = [];

      for (const node of generator) {
        result.push(node.value);
      }

      // Post-order期待順序: 4 -> 5 -> 2 -> 3 -> 1
      expect(result).toEqual([4, 5, 2, 3, 1]);
    });

    it('nullルートの場合は何もyieldしないこと', () => {
      const generator = dfsPostOrder(null);
      const result = Array.from(generator);
      expect(result).toEqual([]);
    });
  });
});
