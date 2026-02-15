import { TreeNode } from './TreeNode';

export function* bfs(root: TreeNode) {
  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      yield node;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}
