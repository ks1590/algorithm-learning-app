import { Play, RotateCcw, StopCircle } from 'lucide-react';

import { TreeVisualizer } from '@/components/TreeVisualizer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { TREE_ALGORITHMS, type TreeAlgorithmKey } from '@/constants/treeAlgorithms';
import { useTreeAlgorithm } from '@/hooks/useTreeAlgorithm';
import { AppColors } from '@/utils/theme';

export function TreePage() {
  const {
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
  } = useTreeAlgorithm();

  return (
    <div className="mx-auto space-y-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">木構造アルゴリズム</h1>
      <Card className="rounded-2xl shadow-[8px_8px_0_0_#000]">
        <CardHeader className="border-b-2 border-border pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">アルゴリズム選択</label>
                <Select value={selectedAlgo} onValueChange={(value) => setSelectedAlgo(value as TreeAlgorithmKey)}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TREE_ALGORITHMS).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className="p-4 rounded-lg border-2 border-border"
                style={{ backgroundColor: AppColors.descriptionBox.background }}
              >
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
                    新しいツリーを生成
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
