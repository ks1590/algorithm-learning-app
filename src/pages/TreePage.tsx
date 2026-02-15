
import { useState, useEffect, useCallback, useRef } from 'react';
import { TreeNode } from '@/algorithms/tree/TreeNode';
import { bfs } from '@/algorithms/tree/bfs';
import { dfsInOrder, dfsPreOrder, dfsPostOrder } from '@/algorithms/tree/dfs';
import { Button } from '@/components/ui/button';
import { TreeVisualizer } from '@/components/TreeVisualizer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, RotateCcw, StopCircle } from 'lucide-react';

const TREE_ALGORITHMS = {
  'bfs': {
    name: '幅優先探索 (BFS)',
    func: bfs,
    desc: '根ノードから始まり、近いノードから順にレベルごとに探索していくアルゴリズムです。',
    steps: [
      '根ノードをキューに入れます',
      'キューからノードを取り出し、訪問します',
      'そのノードの子ノードを左から順にキューに入れます',
      'キューが空になるまで繰り返します'
    ]
  },
  'dfs-inorder': {
    name: '深さ優先探索 (通りがけ順 / In-Order)',
    func: dfsInOrder,
    desc: '左部分木、根、右部分木の順に探索します。二分探索木では、値が昇順に訪問されます。',
    steps: [
      '左部分木を再帰的に探索します',
      '現在のノード（根）を訪問します',
      '右部分木を再帰的に探索します'
    ]
  },
  'dfs-preorder': {
    name: '深さ優先探索 (行きがけ順 / Pre-Order)',
    func: dfsPreOrder,
    desc: '根、左部分木、右部分木の順に探索します。木のコピーなどに利用されます。',
    steps: [
      '現在のノード（根）を訪問します',
      '左部分木を再帰的に探索します',
      '右部分木を再帰的に探索します'
    ]
  },
  'dfs-postorder': {
    name: '深さ優先探索 (帰りがけ順 / Post-Order)',
    func: dfsPostOrder,
    desc: '左部分木、右部分木、根の順に探索します。葉から順に処理する場合などに利用されます。',
    steps: [
      '左部分木を再帰的に探索します',
      '右部分木を再帰的に探索します',
      '現在のノード（根）を訪問します'
    ]
  }
};

type AlgorithmKey = keyof typeof TREE_ALGORITHMS;

export function TreePage() {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
    const [visitedNodes, setVisitedNodes] = useState<Set<TreeNode>>(new Set());
    const [isRunning, setIsRunning] = useState(false);
    const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmKey>('bfs');
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

        // Shuffle nodes to make it random insertion
        // For a more balanced-ish random tree, we can just attach randomly
        const rootNode = nodes[0];
        const queue: TreeNode[] = [rootNode];
        let currentNodeIndex = 1;

        while (currentNodeIndex < nodes.length) {
            const parent = queue[Math.floor(Math.random() * queue.length)]; // Pick random parent from queue
            
            // Try to attach left or right
            if (!parent.left && Math.random() > 0.5) {
                parent.left = nodes[currentNodeIndex];
                queue.push(nodes[currentNodeIndex]);
                currentNodeIndex++;
            } else if (!parent.right) {
                 parent.right = nodes[currentNodeIndex];
                 queue.push(nodes[currentNodeIndex]);
                 currentNodeIndex++;
            } else if (!parent.left) { // If right was taken but left is free
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
        
        stopAlgorithm(); // Ensure previous run is stopped
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
                setVisitedNodes(prev => new Set(prev).add(node));
                
                await new Promise(resolve => setTimeout(resolve, 1000 - speed)); // Speed: higher is faster (less delay)
            }
        } catch (e) {
            console.log("Algorithm stopped");
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
        // Regenerate current tree structure? Or just reset visualization?
        // Let's just reset vis
     };


    return (
        <div className="container mx-auto p-4 space-y-8">
            <Card className="rounded-2xl shadow-[8px_8px_0_0_#000]">
                <CardHeader className="border-b-2 border-border pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1 w-full space-y-4">
                             <div>
                                <label className="block text-sm font-bold text-foreground mb-1">アルゴリズム選択</label>
                                <Select 
                                    value={selectedAlgo} 
                                    onValueChange={(value) => setSelectedAlgo(value as AlgorithmKey)}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select Algorithm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(TREE_ALGORITHMS).map(([key, { name }]) => (
                                            <SelectItem key={key} value={key}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="bg-muted p-4 rounded-lg border-2 border-border">
                                <h2 className="font-bold text-foreground mb-2">{TREE_ALGORITHMS[selectedAlgo].name}</h2>
                                <p className="text-sm text-foreground mb-2">{TREE_ALGORITHMS[selectedAlgo].desc}</p>
                                <ol className="list-decimal list-inside text-sm space-y-1">
                                    {TREE_ALGORITHMS[selectedAlgo].steps.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                         <div className="flex-1 w-full space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-1">ノード数: {nodeCount}</label>
                                <div className="flex items-center gap-4">
                                    <Slider 
                                        min={5} 
                                        max={50} 
                                        step={1} 
                                        value={[nodeCount]} 
                                        onValueChange={(vals) => setNodeCount(vals[0])}
                                        disabled={isRunning}
                                        className="flex-1"
                                    />
                                    <Button onClick={() => generateRandomTree(nodeCount)} variant="secondary" disabled={isRunning}>
                                        新しい木を生成
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground mb-1">実行速度</label>
                                <div className="flex items-center gap-4">
                                    <Slider 
                                        min={100} 
                                        max={950} 
                                        step={50} 
                                        value={[speed]} 
                                        onValueChange={(vals) => setSpeed(vals[0])}
                                        className="flex-1"
                                    />
                                     <div className="flex gap-2 justify-center">
                                        <Button onClick={runAlgorithm} disabled={isRunning || !root} size="icon" className="">
                                            <Play className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={stopAlgorithm} disabled={!isRunning} variant="destructive" size="icon">
                                            <StopCircle className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={reset} variant="outline" size="icon">
                                            <RotateCcw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 min-h-[500px] flex items-center justify-center bg-cream">
                    <TreeVisualizer root={root} activeNode={activeNode} visitedNodes={visitedNodes} />
                </CardContent>
            </Card>
        </div>
    );
}
