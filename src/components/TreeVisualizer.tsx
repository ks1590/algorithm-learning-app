
import { TreeNode } from '../algorithms/tree/TreeNode';
import { motion } from "framer-motion"

interface TreeVisualizerProps {
  root: TreeNode | null;
  activeNode: TreeNode | null;
  visitedNodes: Set<TreeNode>;
}

export function TreeVisualizer({ root, activeNode, visitedNodes }: TreeVisualizerProps) {
  if (!root) return <div className="text-center p-8">No tree generated</div>;

  // First pass: Collect all nodes and edges
  const nodes: React.ReactNode[] = [];
  const edges: React.ReactNode[] = [];

  const traverse = (node: TreeNode, x: number, y: number, level: number, parentX?: number, parentY?: number) => {
    const isVisited = visitedNodes.has(node);
    const isActive = activeNode === node;

    // Line to parent
    if (parentX !== undefined && parentY !== undefined) {
      edges.push(
        <motion.line
          key={`edge-${node.value}`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          x1={parentX}
          y1={parentY}
          x2={x}
          y2={y}
          stroke="gray"
          strokeWidth="2"
        />
      );
    }

    // Node circle and text
    nodes.push(
      <g key={`node-${node.value}`}>
        <motion.circle
          cx={x}
          cy={y}
          r="20"
          fill={isActive ? "#ef4444" : isVisited ? "#3b82f6" : "#ffffff"}
          stroke={isActive ? "#b91c1c" : isVisited ? "#1d4ed8" : "#000000"}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <text x={x} y={y} dy=".3em" textAnchor="middle" fill={isActive || isVisited ? "white" : "black"}>
          {node.value}
        </text>
      </g>
    );

    // Recursive rendering of children
    if (node.left) traverse(node.left, x - 100 / (level + 1), y + 60, level + 1, x, y);
    if (node.right) traverse(node.right, x + 100 / (level + 1), y + 60, level + 1, x, y);
  };

  traverse(root, 400, 40, 0);

  return (
    <div className="flex justify-center overflow-auto p-4 border rounded-lg min-h-[400px]">
        <svg width="800" height="600" viewBox="0 0 800 600">
            {edges}
            {nodes}
        </svg>
    </div>
  );
}
