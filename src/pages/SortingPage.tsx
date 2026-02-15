import React, { useState, useEffect, useCallback, useRef } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubble-sort/bubbleSort';
import { selectionSort } from '../algorithms/sorting/selection-sort/selectionSort';
import { insertionSort } from '../algorithms/sorting/insertion-sort/insertionSort';
import { mergeSort } from '../algorithms/sorting/merge-sort/mergeSort';
import { quickSort } from '../algorithms/sorting/quick-sort/quickSort';
import { SortingVisualizer } from '../components/visualization/SortingVisualizer';
import type { SortingVisualizerHandle } from '../components/visualization/SortingVisualizer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from "@/components/ui/switch"
import { Navigation } from '../components/Navigation';
import { Plus, Trash2, Play, RotateCcw, StopCircle } from 'lucide-react';

const ALGORITHMS = {
  // ... (ALGORITHMS object remains unchanged)
  'bubble': { 
    name: 'バブルソート (Bubble Sort)', 
    func: bubbleSort, 
    desc: '隣り合う要素を比較し、順序が逆であれば入れ替える単純なアルゴリズムです。',
    steps: [
      '隣り合う要素を比較します',
      '左の要素が右より大きければ交換します',
      'これを端まで繰り返すと、最大値が右端に確定します',
      '確定した部分を除いて、繰り返します'
    ]
  },
  'selection': { 
    name: '選択ソート (Selection Sort)', 
    func: selectionSort, 
    desc: '未ソート部分から最小値を見つけ、未ソート部分の先頭と交換するアルゴリズムです。',
    steps: [
      '未ソート部分から最小値を探します',
      '見つけた最小値を、未ソート部分の先頭と交換します',
      'ソート済み範囲を1つ広げます',
      '全てがソートされるまで繰り返します'
    ]
  },
  'insertion': { 
    name: '挿入ソート (Insertion Sort)', 
    func: insertionSort, 
    desc: '整列済みの部分列に、新しい要素を適切な位置に挿入していくアルゴリズムです。',
    steps: [
      '未ソート部分の先頭の要素を取り出します',
      'ソート済み部分の適切な位置にその要素を挿入します',
      'これを未ソート部分がなくなるまで繰り返します'
    ]
  },
  'merge': { 
    name: 'マージソート (Merge Sort)', 
    func: mergeSort, 
    desc: 'リストを分割し、整列しながら併合（マージ）する分割統治法のアルゴリズムです。',
    steps: [
      'リストを半分に分割し続けます（要素が1つになるまで）',
      '分割されたリストを、順序を整えながら併合（マージ）します',
      '全てが1つのリストにまとまるまで繰り返します'
    ]
  },
  'quick': { 
    name: 'クイックソート (Quick Sort)', 
    func: quickSort, 
    desc: 'ピボットを選び、ピボットより小さい要素と大きい要素に分割する分割統治法のアルゴリズムです。',
    steps: [
      '基準となる要素（ピボット）を1つ選びます',
      'ピボットより小さい値を左に、大きい値を右に移動します',
      '分割された左右のリストに対して、同様に繰り返します（再帰）'
    ]
  },
};

type AlgorithmKey = keyof typeof ALGORITHMS;

type ComparisonSlot = {
  id: string;
  algo: AlgorithmKey;
};

export const SortingPage: React.FC = () => {
    // ... (State remains unchanged)
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmKey>('bubble');
  const [arraySize, setArraySize] = useState(250);
  const [initialArray, setInitialArray] = useState<number[]>(() => Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5));
  const [arrayVersion, setArrayVersion] = useState(0);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [slots, setSlots] = useState<ComparisonSlot[]>([
    { id: '1', algo: 'bubble' },
    { id: '2', algo: 'quick' }
  ]);
  const [globalSpeed, setGlobalSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  const visualizerRefs = useRef<{ [key: string]: SortingVisualizerHandle | null }>({});

  const generateArray = useCallback(() => {
    const maxVal = Math.max(100, arraySize * 2);
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * (maxVal - 5)) + 5);
    setInitialArray(newArray);
    setArrayVersion(v => v + 1);
    
    Object.values(visualizerRefs.current).forEach(ref => ref?.reset());
    setIsRunning(false);
  }, [arraySize]);

  useEffect(() => {
    // eslint-disable-next-line
    generateArray();
  }, [generateArray]);

  const addSlot = () => {
    if (slots.length >= 3) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setSlots([...slots, { id: newId, algo: 'bubble' }]);
  };

  const removeSlot = (id: string) => {
    if (slots.length <= 1) return;
    setSlots(slots.filter(s => s.id !== id));
    delete visualizerRefs.current[id];
  };

  const updateSlotAlgo = (id: string, algo: AlgorithmKey) => {
    setSlots(slots.map(s => s.id === id ? { ...s, algo } : s));
  };

  const startAll = () => {
    Object.values(visualizerRefs.current).forEach(ref => ref?.start());
    setIsRunning(true);
  };

  const stopAll = () => {
    Object.values(visualizerRefs.current).forEach(ref => ref?.stop());
    setIsRunning(false);
  };

  const resetAll = () => {
    Object.values(visualizerRefs.current).forEach(ref => ref?.reset());
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className={`mx-auto space-y-8 transition-all duration-300 ${isComparisonMode ? 'max-w-[95vw]' : 'max-w-6xl'}`}>
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black text-primary tracking-tight">ALGORITHM LEARNING</h1>
          <div className="flex justify-center mb-4">
             <Navigation />
          </div>
          <div className="flex justify-center items-center gap-4">
             <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border-2 border-border shadow-[4px_4px_0_0_#000]">
                <span className="text-sm font-bold text-foreground">単体モード</span>
                <Switch 
                    checked={isComparisonMode}
                    onCheckedChange={setIsComparisonMode}
                />
                <span className="text-sm font-bold text-foreground">比較モード</span>
             </div>
          </div>
        </header>

        <Card className="rounded-2xl shadow-[8px_8px_0_0_#000]">
          <CardHeader className="border-b-2 border-border pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-6 w-full">
                   {isComparisonMode && (
                       <div className="flex items-center gap-4 bg-muted p-2 rounded-lg border-2 border-border">
                           <Button onClick={isRunning ? stopAll : startAll} size="icon" className="h-10 w-10">
                               {isRunning ? <StopCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                           </Button>
                           <Button onClick={resetAll} variant="secondary" size="icon" className="h-10 w-10">
                               <RotateCcw className="h-5 w-5" />
                           </Button>
                           <div className="flex items-center gap-2 px-2">
                                <span className="text-xs font-bold">速度</span>
                                <Slider 
                                    min={1} 
                                    max={100} 
                                    step={1} 
                                    value={[globalSpeed]} 
                                    onValueChange={(vals) => setGlobalSpeed(vals[0])}
                                    className="w-24"
                                />
                           </div>
                       </div>
                   )}

                   <div className="flex flex-1 items-center gap-4 min-w-[300px]">
                      <div className="flex-1">
                          <label className="block text-sm font-bold text-foreground mb-1">配列のサイズ: {arraySize}</label>
                          <Slider 
                              min={5} 
                              max={500} 
                              step={5}
                              value={[arraySize]}
                              onValueChange={(vals) => setArraySize(vals[0])}
                              className="w-full py-4"
                          />
                       </div>
                       <Button onClick={generateArray} variant="secondary" className="whitespace-nowrap h-10 mt-5">
                          新しい配列
                       </Button>
                   </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6 bg-cream">
            {isComparisonMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slots.map((slot) => (
                        <div key={slot.id} className="flex flex-col gap-4 p-4 bg-white rounded-xl border-2 border-border relative">
                            <div className="flex justify-between items-center">
                                <Select 
                                  value={slot.algo} 
                                  onValueChange={(value) => updateSlotAlgo(slot.id, value as AlgorithmKey)}
                                >
                                  <SelectTrigger className="w-[180px] h-9">
                                    <SelectValue placeholder="Select Algorithm" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(ALGORITHMS).map(([key, { name }]) => (
                                      <SelectItem key={key} value={key}>{name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button 
                                    onClick={() => removeSlot(slot.id)} 
                                    variant="destructive" 
                                    size="icon"
                                    className="h-9 w-9"
                                    disabled={slots.length <= 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <SortingVisualizer 
                                ref={(el) => { if (el) visualizerRefs.current[slot.id] = el; }}
                                key={`${slot.algo}-${arrayVersion}-${slot.id}`}
                                algorithm={ALGORITHMS[slot.algo].func}
                                initialArray={initialArray}
                                algorithmName={ALGORITHMS[slot.algo].name}
                                speed={globalSpeed}
                                hideControls={true}
                                removeShadow={true}
                                className="p-0 border-none shadow-none"
                            />
                        </div>
                    ))}
                    {slots.length < 3 && (
                        <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-xl">
                            <Button onClick={addSlot} variant="ghost" className="h-20 w-20 rounded-full border-2 border-border hover:bg-muted">
                                <Plus className="h-10 w-10" />
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div className="w-full md:w-auto max-w-sm mb-6">
                        <label className="block text-sm font-bold text-foreground mb-2">アルゴリズム選択</label>
                        <Select 
                        value={selectedAlgo} 
                        onValueChange={(value) => setSelectedAlgo(value as AlgorithmKey)}
                        >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(ALGORITHMS).map(([key, { name }]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="bg-muted p-6 rounded-xl border-2 border-border">
                    <h2 className="text-lg font-black text-foreground mb-4">{ALGORITHMS[selectedAlgo].name}</h2>
                    <p className="text-foreground font-medium leading-relaxed mb-4">
                        {ALGORITHMS[selectedAlgo].desc}
                    </p>
                    <div className="bg-white p-4 rounded-lg border-2 border-border">
                        <h3 className="font-bold text-foreground mb-2">手順:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-foreground font-medium">
                            {ALGORITHMS[selectedAlgo].steps.map((step, idx) => (
                                <li key={idx} className="pl-1 marker:font-bold">{step}</li>
                            ))}
                        </ol>
                    </div>
                    </div>

                    <div className="mt-8">
                    <SortingVisualizer 
                        key={`${selectedAlgo}-${arrayVersion}`}
                        algorithm={ALGORITHMS[selectedAlgo].func}
                        initialArray={initialArray}
                        algorithmName={ALGORITHMS[selectedAlgo].name}
                    />
                    </div>
                </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
