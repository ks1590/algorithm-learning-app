import * as d3 from 'd3-hierarchy';
import { useMemo } from 'react';

import type { TreeNode } from '@/algorithms/tree/TreeNode';

export function useTreeLayout(root: TreeNode | null) {
  return useMemo(() => {
    if (!root) return { nodes: [], links: [], totalWidth: 0, totalHeight: 0 };

    const initialHierarchy = d3.hierarchy(root, (d) => {
      const children = [];
      if (d.left) children.push(d.left);
      if (d.right) children.push(d.right);
      return children.length > 0 ? children : null;
    });

    const nodeWidth = 60;
    const nodeHeight = 80;

    const treeLayout = d3
      .tree<TreeNode>()
      .nodeSize([nodeWidth, nodeHeight])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.5));

    const hierarchyRoot = treeLayout(initialHierarchy);

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

    const xShift = -minX + padding;
    const yShift = padding;

    return {
      nodes: hierarchyRoot.descendants().map((d) => ({
        ...d,
        x: d.x + xShift,
        y: d.y + yShift,
      })),
      links: hierarchyRoot.links().map((link) => ({
        source: { ...link.source, x: link.source.x + xShift, y: link.source.y + yShift },
        target: { ...link.target, x: link.target.x + xShift, y: link.target.y + yShift },
      })),
      totalWidth: width,
      totalHeight: height,
    };
  }, [root]);
}
