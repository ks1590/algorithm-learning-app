
import { useState } from 'react';
import { TreeNode } from '@/algorithms/tree/TreeNode';
import { bfs } from '@/algorithms/tree/bfs';
import { dfsInOrder, dfsPreOrder, dfsPostOrder } from '@/algorithms/tree/dfs';
import { Button } from '@/components/ui/button';
import { TreeVisualizer } from '@/components/TreeVisualizer';

export function TreePage() {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
    const [visitedNodes, setVisitedNodes] = useState<Set<TreeNode>>(new Set());
    const [isRunning, setIsRunning] = useState(false);

    const generateTree = () => {
        const rootNode = new TreeNode(1);
        const left = new TreeNode(2);
        const right = new TreeNode(3);
        const leftLeft = new TreeNode(4);
        const leftRight = new TreeNode(5);
        const rightRight = new TreeNode(6);
        
        rootNode.left = left;
        rootNode.right = right;
        left.left = leftLeft;
        left.right = leftRight;
        right.right = rightRight;
        
        setRoot(rootNode);
        setVisitedNodes(new Set());
        setActiveNode(null);
    };

    const runAlgorithm = async (algorithm: Generator<TreeNode>) => {
        if (isRunning) return;
        setIsRunning(true);
        setVisitedNodes(new Set());
        setActiveNode(null);

        for (const node of algorithm) {
            setActiveNode(node);
            setVisitedNodes(prev => new Set(prev).add(node));
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        setActiveNode(null);
        setIsRunning(false);
    };

    return (
        <div className="container mx-auto p-4">
            
            <div className="flex gap-4 my-4">
                <Button onClick={generateTree} disabled={isRunning}>Generate Tree</Button>
                <Button onClick={() => root && runAlgorithm(bfs(root))} disabled={!root || isRunning}>BFS</Button>
                <Button onClick={() => root && runAlgorithm(dfsInOrder(root))} disabled={!root || isRunning}>DFS InOrder</Button>
                <Button onClick={() => root && runAlgorithm(dfsPreOrder(root))} disabled={!root || isRunning}>DFS PreOrder</Button>
                <Button onClick={() => root && runAlgorithm(dfsPostOrder(root))} disabled={!root || isRunning}>DFS PostOrder</Button>
            </div>

            <TreeVisualizer root={root} activeNode={activeNode} visitedNodes={visitedNodes} />
        </div>
    );
}
