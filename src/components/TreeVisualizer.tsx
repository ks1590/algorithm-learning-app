import { motion } from 'framer-motion';

import { useTreeLayout } from '@/hooks/useTreeLayout';
import { AppColors } from '@/utils/theme';

import { TreeNode } from '../algorithms/tree/TreeNode';

interface TreeVisualizerProps {
  root: TreeNode | null;
  activeNode: TreeNode | null;
  visitedNodes: Set<TreeNode>;
}

export function TreeVisualizer({ root, activeNode, visitedNodes }: TreeVisualizerProps) {
  const { nodes, links, totalWidth, totalHeight } = useTreeLayout(root);

  if (!root) return <div className="text-center p-8">No tree generated</div>;

  return (
    <div className="flex justify-center w-full overflow-auto p-4 border rounded-lg min-h-[400px]">
      <svg width={totalWidth} height={totalHeight} viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
        {links.map((link) => (
          <motion.line
            key={`edge-${link.source.data.value}-${link.target.data.value}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke="gray"
            strokeWidth="2"
          />
        ))}
        {nodes.map((node) => {
          const isVisited = visitedNodes.has(node.data);
          const isActive = activeNode === node.data;

          return (
            <g key={`node-${node.data.value}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={
                  isActive
                    ? AppColors.tree.node.active.fill
                    : isVisited
                      ? AppColors.tree.node.visited.fill
                      : AppColors.tree.node.default.fill
                }
                stroke={
                  isActive
                    ? AppColors.tree.node.active.stroke
                    : isVisited
                      ? AppColors.tree.node.visited.stroke
                      : AppColors.tree.node.default.stroke
                }
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={node.x}
                y={node.y}
                dy=".3em"
                textAnchor="middle"
                fill={isActive || isVisited ? 'white' : 'black'}
                className="text-sm font-bold pointer-events-none"
              >
                {node.data.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
