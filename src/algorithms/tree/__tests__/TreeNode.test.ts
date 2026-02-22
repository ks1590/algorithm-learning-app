import { describe, it, expect } from 'vitest';

import { TreeNode, TreeNodeValue } from '@/algorithms/tree/TreeNode';

describe('TreeNodeValue', () => {
  it('初期値が正しく設定されること', () => {
    const nodeValue = new TreeNodeValue('test');
    expect(nodeValue.value).toBe('test');
  });

  it('toString()が正しい文字列表現を返すこと', () => {
    const nodeValueStr = new TreeNodeValue('test');
    expect(nodeValueStr.toString()).toBe('test');

    const nodeValueNum = new TreeNodeValue(42);
    expect(nodeValueNum.toString()).toBe('42');
  });
});

describe('TreeNode', () => {
  it('初期値が正しく設定されること', () => {
    const node = new TreeNode(10);
    expect(node.value).toBe(10);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
    expect(node.parent).toBeNull();
  });

  it('setLeft()で左の子ノードを正しく設定・解除できること', () => {
    const root = new TreeNode(1);
    const leftChild = new TreeNode(2);

    root.setLeft(leftChild);
    expect(root.left).toBe(leftChild);
    expect(leftChild.parent).toBe(root);

    // 別のノードに置き換える
    const newLeft = new TreeNode(3);
    root.setLeft(newLeft);
    expect(root.left).toBe(newLeft);
    expect(newLeft.parent).toBe(root);
    expect(leftChild.parent).toBeNull(); // 古いノードの親参照が解除されていること

    // nullに設定して解除
    root.setLeft(null);
    expect(root.left).toBeNull();
    expect(newLeft.parent).toBeNull();
  });

  it('setRight()で右の子ノードを正しく設定・解除できること', () => {
    const root = new TreeNode(1);
    const rightChild = new TreeNode(2);

    root.setRight(rightChild);
    expect(root.right).toBe(rightChild);
    expect(rightChild.parent).toBe(root);

    // 別のノードに置き換える
    const newRight = new TreeNode(3);
    root.setRight(newRight);
    expect(root.right).toBe(newRight);
    expect(newRight.parent).toBe(root);
    expect(rightChild.parent).toBeNull(); // 古いノードの親参照が解除されていること

    // nullに設定して解除
    root.setRight(null);
    expect(root.right).toBeNull();
    expect(newRight.parent).toBeNull();
  });

  it('heightプロパティが正しく計算されること', () => {
    const root = new TreeNode(1);
    expect(root.height).toBe(0); // 子がいない場合は0

    const left = new TreeNode(2);
    root.setLeft(left);
    expect(root.height).toBe(1);

    const leftLeft = new TreeNode(3);
    left.setLeft(leftLeft);
    expect(root.height).toBe(2);

    const right = new TreeNode(4);
    root.setRight(right);
    expect(root.height).toBe(2); // 深い方に合わせる
  });
});
