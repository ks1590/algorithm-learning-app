import { useState, useCallback, useRef, useEffect } from 'react';

import { TreeNode } from '@/algorithms/tree/TreeNode';
import { TREE_ALGORITHMS, type TreeAlgorithmKey } from '@/utils/treeAlgorithms';

export function useTreeAlgorithm() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<TreeNode>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState<TreeAlgorithmKey>('bfs');
  const [nodeCount, setNodeCount] = useState(15);
  const [speed, setSpeed] = useState(500);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateRandomTree = useCallback((count: number) => {
    if (count <= 0) {
      setRoot(null);
      return;
    }

    const nodes: TreeNode[] = [];
    for (let i = 1; i <= count; i++) {
      nodes.push(new TreeNode(i));
    }

    const rootNode = nodes[0];
    const queue: TreeNode[] = [rootNode];
    let currentNodeIndex = 1;

    while (currentNodeIndex < nodes.length) {
      const parent = queue[Math.floor(Math.random() * queue.length)];

      if (!parent.left && Math.random() > 0.5) {
        parent.left = nodes[currentNodeIndex];
        queue.push(nodes[currentNodeIndex]);
        currentNodeIndex++;
      } else if (!parent.right) {
        parent.right = nodes[currentNodeIndex];
        queue.push(nodes[currentNodeIndex]);
        currentNodeIndex++;
      } else if (!parent.left) {
        parent.left = nodes[currentNodeIndex];
        queue.push(nodes[currentNodeIndex]);
        currentNodeIndex++;
      }
    }

    setRoot(rootNode);
    setVisitedNodes(new Set());
    setActiveNode(null);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    generateRandomTree(nodeCount);
  }, [generateRandomTree, nodeCount]);

  const stopAlgorithm = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsRunning(false);
    setActiveNode(null);
  };

  const runAlgorithm = async () => {
    if (isRunning || !root) return;

    stopAlgorithm();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsRunning(true);
    setVisitedNodes(new Set());
    setActiveNode(null);

    const algorithm = TREE_ALGORITHMS[selectedAlgo].func(root);

    try {
      for (const node of algorithm) {
        if (abortController.signal.aborted) break;

        setActiveNode(node);
        setVisitedNodes((prev) => new Set(prev).add(node));

        await new Promise((resolve) => setTimeout(resolve, 1000 - speed));
      }
    } catch {
      console.log('Algorithm stopped');
    } finally {
      if (!abortController.signal.aborted) {
        setIsRunning(false);
        setActiveNode(null);
      }
    }
  };

  const reset = () => {
    stopAlgorithm();
    setVisitedNodes(new Set());
    setActiveNode(null);
  };

  return {
    root,
    activeNode,
    visitedNodes,
    isRunning,
    selectedAlgo,
    setSelectedAlgo,
    nodeCount,
    setNodeCount,
    speed,
    setSpeed,
    generateRandomTree,
    runAlgorithm,
    stopAlgorithm,
    reset,
  };
}
