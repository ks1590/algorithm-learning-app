
import { TreeNode } from '../algorithms/tree/TreeNode';
import { motion } from "framer-motion"
import * as d3 from 'd3-hierarchy';
import { useMemo } from 'react';

interface TreeVisualizerProps {
  root: TreeNode | null;
  activeNode: TreeNode | null;
  visitedNodes: Set<TreeNode>;
}

export function TreeVisualizer({ root, activeNode, visitedNodes }: TreeVisualizerProps) {
  if (!root) return <div className="text-center p-8">No tree generated</div>;

  const { nodes, links, totalWidth, totalHeight } = useMemo(() => {
    // 1. Convert to D3 hierarchy
    const hierarchyRoot = d3.hierarchy(root, (d) => {
        const children = [];
        if (d.left) children.push(d.left);
        if (d.right) children.push(d.right);
        return children.length > 0 ? children : null;
    });

    // 2. Configure tree layout
    // nodeSize allows us to specify fixed spacing between nodes
    const nodeWidth = 60; // Horizontal space
    const nodeHeight = 80; // Vertical space
    
    const treeLayout = d3.tree<TreeNode>()
        .nodeSize([nodeWidth, nodeHeight]) 
        .separation((a, b) => {
            // Give a bit more space for non-siblings to keep branches distinct
            return a.parent === b.parent ? 1.2 : 1.5; 
        });
    
    treeLayout(hierarchyRoot);

    // 3. Calculate bounds to shift chart into view
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    hierarchyRoot.each((node) => {
        if (node.x < minX) minX = node.x;
        if (node.x > maxX) maxX = node.x;
        if (node.y > maxY) maxY = node.y;
    });

    const padding = 50;
    const width = maxX - minX + padding * 2;
    const height = maxY + padding * 2;
    
    // Shift all nodes so minX is at padding
    const xShift = -minX + padding;
    const yShift = padding;

    return {
        nodes: hierarchyRoot.descendants().map(d => ({
            ...d,
            x: d.x + xShift,
            y: d.y + yShift
        })),
        links: hierarchyRoot.links().map(link => ({
            source: { ...link.source, x: link.source.x + xShift, y: link.source.y + yShift },
            target: { ...link.target, x: link.target.x + xShift, y: link.target.y + yShift }
        })),
        totalWidth: width,
        totalHeight: height
    };
  }, [root]);


  return (
    <div className="flex justify-center overflow-auto p-4 border rounded-lg min-h-[400px]">
        <svg width={totalWidth} height={totalHeight} viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
            {links.map((link, i) => (
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
                            fill={isActive ? "#ef4444" : isVisited ? "#3b82f6" : "#ffffff"}
                            stroke={isActive ? "#b91c1c" : isVisited ? "#1d4ed8" : "#000000"}
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
                            fill={isActive || isVisited ? "white" : "black"}
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
