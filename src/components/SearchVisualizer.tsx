import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, XCircle, Search } from "lucide-react";
import { linearSearch } from '../algorithms/search/linearSearch';
import type { SearchStep } from '../algorithms/search/linearSearch';
import { binarySearch } from '../algorithms/search/binarySearch';
import type { BinarySearchStep } from '../algorithms/search/binarySearch';
import { jumpSearch } from '../algorithms/search/jumpSearch';
import type { JumpSearchStep } from '../algorithms/search/jumpSearch';
import { interpolationSearch } from '../algorithms/search/interpolationSearch';
import type { InterpolationSearchStep } from '../algorithms/search/interpolationSearch';
import { AppColors } from '@/utils/theme';

type AlgorithmType = 'linear' | 'binary' | 'jump' | 'interpolation';

const SEARCH_ALGORITHMS = {
  'linear': {
    name: '線形探索 (Linear Search)',
    desc: '配列の先頭から順番に、探している値が見つかるまで一つずつ要素を確認していく最も単純な探索アルゴリズムです。',
    steps: [
      '配列の最初の要素から順番に確認します',
      '現在の要素が探している値と一致するか確認します',
      '一致すれば探索終了（発見）です',
      '配列の最後まで見つからなければ探索終了（未発見）です'
    ]
  },
  'binary': {
    name: '二分探索 (Binary Search)',
    desc: 'ソート済みの配列に対して、探索範囲を半分に絞り込みながら値を探索する効率的なアルゴリズムです。',
    steps: [
      '配列の中央の要素を確認します',
      '中央の要素が探している値であれば探索終了です',
      '探している値が中央より小さければ左半分を、大きければ右半分を次の探索範囲にします',
      '探索範囲がなくなるまで繰り返します'
    ]
  },
  'jump': {
    name: 'ジャンプ探索 (Jump Search)',
    desc: 'ソート済みの配列に対して、一定の間隔（ブロック）でジャンプしながら探索し、範囲を絞り込んでから線形探索を行うアルゴリズムです。',
    steps: [
      '固定のステップ数で配列をジャンプしながら進みます',
      '探している値より大きい要素が見つかるか、配列の末尾に到達するまでジャンプします',
      '直前のジャンプ位置から、現在の位置まで線形探索を行います'
    ]
  },
  'interpolation': {
    name: '補間探索 (Interpolation Search)',
    desc: 'ソート済みの配列に対して、値の分布を考慮して探索位置（プローブ位置）を計算し、効率的に探索するアルゴリズムです。辞書を引くような感覚に近いです。',
    steps: [
      '探索範囲の最小値と最大値を使って、値がありそうな位置（プローブ位置）を計算します',
      'その位置の要素を確認します',
      '探している値より小さければ右側を、大きければ左側を次の探索範囲にします',
      '値が見つかるか、探索範囲がなくなるまで繰り返します'
    ]
  }
};

export function SearchVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('linear');
  const [isSearching, setIsSearching] = useState(false);
  const [currentStep, setCurrentStep] = useState<SearchStep | BinarySearchStep | JumpSearchStep | InterpolationSearchStep | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState(500);
  const [elementCount, setElementCount] = useState(20);
  const [message, setMessage] = useState('');
  
  // Refs for controlling the search loop
  const isSearchingRef = useRef(false);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    generateArray();
  }, [elementCount]); // Regenerate when count changes

  // When switching to binary search, sort the array
  useEffect(() => {
    if (algorithm === 'binary' || algorithm === 'jump' || algorithm === 'interpolation') {
        setArray(prev => [...prev].sort((a, b) => a - b));
        resetSearch();
    }
  }, [algorithm]);

  const generateArray = () => {
    const uniqueNumbers = new Set<number>();
    const maxVal = Math.max(100, elementCount * 3); // Ensure enough range for unique numbers
    
    while (uniqueNumbers.size < elementCount) {
        uniqueNumbers.add(Math.floor(Math.random() * maxVal));
    }
    
    const newArray = Array.from(uniqueNumbers);
    
    if (algorithm === 'binary' || algorithm === 'jump' || algorithm === 'interpolation') {
        newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    resetSearch();
  };

  const resetSearch = () => {
    setIsSearching(false);
    isSearchingRef.current = false;
    setCurrentStep(null);
    setFoundIndex(null);
    setMessage('');
  };

  const handleStart = async () => {
    if (!target) {
        setMessage('探索する数値を入力してください');
        return;
    }
    const targetNum = parseInt(target);
    if (isNaN(targetNum)) {
        setMessage('無効な数値です');
        return;
    }

    resetSearch();
    setIsSearching(true);
    isSearchingRef.current = true;
    setMessage('探索中...');

    if (algorithm === 'linear') {
        const generator = linearSearch(array, targetNum);
        for (const step of generator) {
            if (!isSearchingRef.current) break;
            
            setCurrentStep(step);
            
            if (step.found) {
                setFoundIndex(step.currentIndex);
                setMessage(`インデックス ${step.currentIndex} で見つかりました！`);
                setIsSearching(false);
                isSearchingRef.current = false;
                break;
            }
            
            if (step.done && !step.found) {
                setMessage('見つかりませんでした。');
                setIsSearching(false);
                isSearchingRef.current = false;
                break;
            }
            
            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }
    } else if (algorithm === 'binary') {
        const generator = binarySearch(array, targetNum);
        for (const step of generator) {
            if (!isSearchingRef.current) break;

            setCurrentStep(step);

             if (step.found) {
                // binary search step doesn't have a simple 'currentIndex'
                // but 'mid' is where it was found
                 setFoundIndex(step.mid);
                 setMessage(`インデックス ${step.mid} で見つかりました！`);
                 setIsSearching(false);
                 isSearchingRef.current = false;
                 break;
             }
 
              if (step.done && !step.found) {
                 setMessage('見つかりませんでした。');
                setIsSearching(false);
                isSearchingRef.current = false;
                break;
            }

            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }
    } else if (algorithm === 'jump') {
        const generator = jumpSearch(array, targetNum);
        for (const step of generator) {
            if (!isSearchingRef.current) break;

            setCurrentStep(step);

             if (step.found) {
                 setFoundIndex(step.index);
                 setMessage(`インデックス ${step.index} で見つかりました！`);
                 setIsSearching(false);
                 isSearchingRef.current = false;
                 break;
             }
 
             if (step.done && !step.found) {
                 setMessage('見つかりませんでした。');
                setIsSearching(false);
                isSearchingRef.current = false;
                break;
            }
            
            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }
    } else if (algorithm === 'interpolation') {
         const generator = interpolationSearch(array, targetNum);
        for (const step of generator) {
            if (!isSearchingRef.current) break;

            setCurrentStep(step);

             if (step.found) {
                 setFoundIndex(step.pos);
                 setMessage(`インデックス ${step.pos} で見つかりました！`);
                 setIsSearching(false);
                 isSearchingRef.current = false;
                 break;
             }
 
             if (step.done && !step.found) {
                  setMessage('見つかりませんでした。');
                setIsSearching(false);
                isSearchingRef.current = false;
                break;
            }
            
            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }
    }
  };

  const getBarColor = (index: number) => {
    if (foundIndex === index) return "bg-green-500";
    
    if (currentStep) {
        if (algorithm === 'linear') {
            const step = currentStep as SearchStep;
            if (step.currentIndex === index) return "bg-yellow-500";
        } else if (algorithm === 'binary') {
            const step = currentStep as BinarySearchStep;
            if (index === step.mid) return "bg-yellow-500";
            if (index >= step.left && index <= step.right) return "bg-blue-200";
            return "bg-gray-200 opacity-50"; // Dim items outside range
        } else if (algorithm === 'jump') {
            const step = currentStep as JumpSearchStep;
            if (step.type === 'jump') {
                if (index === step.index) return "bg-yellow-500"; // Jump point
                if (index < step.index) return "bg-gray-200 opacity-50"; // Skipped blocks
            } else {
                 if (index === step.index) return "bg-orange-500"; // Linear check
                 // The block we are searching in is roughly [prev_jump ... current_limit]
                 // We can't perfectly visual that scope easily without more state, but highlighting the current check is good enough.
            }
        } else if (algorithm === 'interpolation') {
            const step = currentStep as InterpolationSearchStep;
            if (index === step.pos) return "bg-purple-500"; // Probe position
            if (index >= step.low && index <= step.high) return "bg-blue-200"; // Current range
            return "bg-gray-200 opacity-50";
        }
    }
    return "bg-primary";
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-[8px_8px_0_0_#000]">
        <CardHeader className="border-b-2 border-border pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1 w-full space-y-4">
                    <div>
                        <label className="text-sm font-bold block mb-2">アルゴリズム選択</label>
                        <Select 
                            value={algorithm} 
                            onValueChange={(v) => setAlgorithm(v as AlgorithmType)}
                            disabled={isSearching}
                        >
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="アルゴリズムを選択" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(SEARCH_ALGORITHMS).map(([key, { name }]) => (
                                    <SelectItem key={key} value={key}>{name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-4 rounded-lg border-2 border-border" style={{ backgroundColor: AppColors.descriptionBox.background }}>
                        <h2 className="font-bold text-foreground mb-2">{SEARCH_ALGORITHMS[algorithm].name}</h2>
                        <p className="text-sm text-foreground mb-4">{SEARCH_ALGORITHMS[algorithm].desc}</p>
                        <div className="bg-white p-3 rounded-lg border-2 border-border">
                            <h3 className="font-bold text-xs mb-2">手順:</h3>
                            <ol className="list-decimal list-inside text-sm space-y-1">
                                {SEARCH_ALGORITHMS[algorithm].steps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-6">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">探索する数値</label>
                            <Input 
                                type="number" 
                                value={target} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(e.target.value)}
                                placeholder="数値"
                                className="w-[100px] bg-white"
                                disabled={isSearching}
                            />
                        </div>

                        <Button onClick={generateArray} disabled={isSearching} variant="outline" className="bg-white">
                            新しい配列を生成
                        </Button>

                        <Button onClick={handleStart} disabled={isSearching} className="w-24">
                            {isSearching ? '探索中' : '探索開始'}
                        </Button>

                        <Button onClick={resetSearch} disabled={!isSearching && !foundIndex && !message} variant="secondary">
                            リセット
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">要素数: {elementCount}</label>
                            <Slider 
                                value={[elementCount]} 
                                onValueChange={(val) => setElementCount(val[0])} 
                                min={10} 
                                max={100} 
                                step={1} 
                                disabled={isSearching}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold">速度 (ms): {speed}</label>
                            <Slider 
                                value={[speed]} 
                                onValueChange={(val) => setSpeed(val[0])} 
                                min={50} 
                                max={1000} 
                                step={50} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 bg-cream min-h-[300px]">

            <div className="h-[80px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {message && (
                        <motion.div
                            key={message}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`
                                flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-lg border-2 border-black
                                ${foundIndex !== null ? 'bg-[#FFD23F] text-black' : 
                                  message.includes('見つかりませんでした') ? 'bg-gray-200 text-gray-500' : 
                                  'bg-white text-black'}
                            `}
                        >
                            {foundIndex !== null ? (
                                <Sparkles className="w-6 h-6 animate-pulse text-primary" />
                            ) : message.includes('見つかりませんでした') ? (
                                <XCircle className="w-6 h-6" />
                            ) : (
                                <Search className="w-6 h-6 animate-bounce" />
                            )}
                            {message}
                            {foundIndex !== null && <Sparkles className="w-6 h-6 animate-pulse text-primary" />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8 min-h-[100px] items-start">
                {array.map((value, index) => (
                    <div key={`${index}-${value}`} className="flex flex-col items-center gap-1">
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`
                                flex items-center justify-center w-10 h-10 rounded-md text-white font-bold transition-colors duration-300 shadow-sm
                                ${getBarColor(index)}
                            `}
                        >
                            {value}
                        </motion.div>
                        <span className="text-xs text-muted-foreground font-mono">[{index}]</span>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
