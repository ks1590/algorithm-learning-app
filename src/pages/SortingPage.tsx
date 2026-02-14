import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubble-sort/bubbleSort';
import { selectionSort } from '../algorithms/sorting/selection-sort/selectionSort';
import { insertionSort } from '../algorithms/sorting/insertion-sort/insertionSort';
import { mergeSort } from '../algorithms/sorting/merge-sort/mergeSort';
import { quickSort } from '../algorithms/sorting/quick-sort/quickSort';
import { SortingVisualizer } from '../components/visualization/SortingVisualizer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const ALGORITHMS = {
  'bubble': { name: 'バブルソート (Bubble Sort)', func: bubbleSort, desc: '隣り合う要素を比較し、順序が逆であれば入れ替える単純なアルゴリズム。' },
  'selection': { name: '選択ソート (Selection Sort)', func: selectionSort, desc: '未ソート部分から最小値を見つけ、未ソート部分の先頭と交換するアルゴリズム。' },
  'insertion': { name: '挿入ソート (Insertion Sort)', func: insertionSort, desc: '整列済みの部分列に、新しい要素を適切な位置に挿入していくアルゴリズム。' },
  'merge': { name: 'マージソート (Merge Sort)', func: mergeSort, desc: 'リストを分割し、整列しながら併合（マージ）する分割統治法のアルゴリズム。' },
  'quick': { name: 'クイックソート (Quick Sort)', func: quickSort, desc: 'ピボットを選び、ピボットより小さい要素と大きい要素に分割する分割統治法のアルゴリズム。' },
};

type AlgorithmKey = keyof typeof ALGORITHMS;

export const SortingPage: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmKey>('bubble');
  const [arraySize, setArraySize] = useState(20);
  const [initialArray, setInitialArray] = useState<number[]>(() => Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5));
  const [arrayVersion, setArrayVersion] = useState(0);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 95) + 5);
    setInitialArray(newArray);
    setArrayVersion(v => v + 1);
  }, [arraySize]);

  useEffect(() => {
    // eslint-disable-next-line
    generateArray();
  }, [generateArray]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">アルゴリズム学習</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            視覚的にアルゴリズムの動作を理解しましょう。まずはソートアルゴリズムから。
          </p>
        </header>

        <Card className="rounded-xl shadow-lg">
          <CardHeader className="border-b border-gray-100 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">アルゴリズム選択</label>
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

              <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="flex-1 md:flex-none">
                      <label className="block text-sm font-medium text-gray-700 mb-1">配列のサイズ: {arraySize}</label>
                      <Slider 
                          min={5} 
                          max={50} 
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
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-lg font-bold text-blue-900 mb-2">{ALGORITHMS[selectedAlgo].name}</h2>
              <p className="text-blue-800 text-sm leading-relaxed">
                  {ALGORITHMS[selectedAlgo].desc}
              </p>
            </div>

            <div className="mt-8">
              <SortingVisualizer 
                  key={`${selectedAlgo}-${arrayVersion}`}
                  algorithm={ALGORITHMS[selectedAlgo].func}
                  initialArray={initialArray}
                  algorithmName={ALGORITHMS[selectedAlgo].name}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
