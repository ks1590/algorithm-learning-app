import { TreeNode } from './TreeNode';

export function* dfsInOrder(root: TreeNode | null): Generator<TreeNode> {
    if (root) {
        if (root.left) {
            yield* dfsInOrder(root.left);
        }
        yield root;
        if (root.right) {
            yield* dfsInOrder(root.right);
        }
    }
}

export function* dfsPreOrder(root: TreeNode | null): Generator<TreeNode> {
    if (root) {
        yield root;
        if (root.left) {
            yield* dfsPreOrder(root.left);
        }
        if (root.right) {
            yield* dfsPreOrder(root.right);
        }
    }
}

export function* dfsPostOrder(root: TreeNode | null): Generator<TreeNode> {
    if (root) {
        if (root.left) {
            yield* dfsPostOrder(root.left);
        }
        if (root.right) {
            yield* dfsPostOrder(root.right);
        }
        yield root;
    }
}
