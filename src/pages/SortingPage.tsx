import { Plus, Trash2, Play, RotateCcw, StopCircle } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ALGORITHMS, type AlgorithmKey } from '@/constants/sortingAlgorithms';
import { useSortingPage } from '@/hooks/useSortingPage';
import { AppColors } from '@/utils/theme';

import { SortingVisualizer } from '../components/visualization/SortingVisualizer';

export const SortingPage: React.FC = () => {
  const {
    selectedAlgo,
    setSelectedAlgo,
    arraySize,
    setArraySize,
    initialArray,
    arrayVersion,
    isComparisonMode,
    setIsComparisonMode,
    slots,
    globalSpeed,
    setGlobalSpeed,
    isRunning,
    results,
    visualizerRefs,
    generateArray,
    addSlot,
    removeSlot,
    updateSlotAlgo,
    startAll,
    stopAll,
    resetAll,
    handleSortFinish,
  } = useSortingPage();

  const getComparisonSummary = () => {
    if (Object.keys(results).length < 2) return null;

    // Sort results by time
    const sortedResults = Object.entries(results)
      .map(([id, time]) => {
        const slot = slots.find((s) => s.id === id);
        return {
          id,
          algoName: slot ? ALGORITHMS[slot.algo].name.split(' ')[0] : 'Unknown',
          time,
        };
      })
      .sort((a, b) => a.time - b.time);

    if (sortedResults.length < 2) return null;

    const winner = sortedResults[0];
    const comparisons = sortedResults.slice(1).map((res) => {
      const ratio = (res.time / winner.time).toFixed(1);
      return `${winner.algoName}は${res.algoName}より約${ratio}倍速いです。`;
    });

    return (
      <div className="mt-8 p-6 bg-white rounded-xl border-2 border-border shadow-[4px_4px_0_0_#000]">
        <h3 className="text-xl font-black mb-4">🏆 結果概要</h3>
        <div className="space-y-2">
          <p className="font-bold text-lg text-primary">
            最速: {winner.algoName} ({(winner.time / 1000).toFixed(3)}秒)
          </p>
          {comparisons.map((comp, idx) => (
            <p key={idx} className="text-foreground font-medium">
              • {comp}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`mx-auto space-y-8 transition-all duration-300 ${isComparisonMode ? 'max-w-[95vw]' : 'max-w-7xl'}`}>
      <h1 className="text-3xl font-bold mb-8">ソートアルゴリズム</h1>
      <header className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border-2 border-border shadow-[4px_4px_0_0_#000]">
            <span className="text-sm font-bold text-foreground">単体モード</span>
            <Switch checked={isComparisonMode} onCheckedChange={setIsComparisonMode} />
            <span className="text-sm font-bold text-foreground">比較モード</span>
          </div>
        </div>
      </header>

      <Card className="rounded-2xl shadow-[8px_8px_0_0_#000]">
        <CardHeader className="border-b-2 border-border pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 w-full">
              {isComparisonMode && (
                <div
                  className="flex items-center gap-4 bg-muted p-2 rounded-lg border-2 border-border"
                  style={{ backgroundColor: AppColors.descriptionBox.background }}
                >
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
                    max={200}
                    step={5}
                    value={[arraySize]}
                    onValueChange={(vals) => setArraySize(vals[0])}
                    className="max-w-[300px] py-4"
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex flex-col gap-4 p-4 bg-white rounded-xl border-2 border-border relative"
                  >
                    <div className="flex justify-between items-center">
                      <Select
                        value={slot.algo}
                        onValueChange={(value) => updateSlotAlgo(slot.id, value as AlgorithmKey)}
                      >
                        <SelectTrigger className="w-[240px] h-9">
                          <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ALGORITHMS).map(([key, { name }]) => {
                            const isSelected = slots.some((s) => s.algo === key && s.id !== slot.id);
                            return (
                              <SelectItem key={key} value={key} disabled={isSelected}>
                                {name} {isSelected && '(選択済み)'}
                              </SelectItem>
                            );
                          })}
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
                      ref={(el) => {
                        if (el) visualizerRefs.current[slot.id] = el;
                      }}
                      key={`${slot.algo}-${arrayVersion}-${slot.id}`}
                      algorithm={ALGORITHMS[slot.algo].func}
                      initialArray={initialArray}
                      algorithmName={ALGORITHMS[slot.algo].name}
                      speed={globalSpeed}
                      hideControls={true}
                      removeShadow={true}
                      className="p-0 border-none shadow-none"
                      onFinish={(time) => handleSortFinish(slot.id, time)}
                    />
                  </div>
                ))}
                {slots.length < 3 && (
                  <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-xl">
                    <Button
                      onClick={addSlot}
                      variant="ghost"
                      className="h-20 w-20 rounded-full border-2 border-border hover:bg-muted"
                    >
                      <Plus className="h-10 w-10" />
                    </Button>
                  </div>
                )}
              </div>
              {getComparisonSummary()}
            </>
          ) : (
            <>
              <div className="w-full md:w-auto max-w-sm mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">アルゴリズム選択</label>
                <Select value={selectedAlgo} onValueChange={(value) => setSelectedAlgo(value as AlgorithmKey)}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ALGORITHMS).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className="bg-muted p-6 rounded-xl border-2 border-border"
                style={{ backgroundColor: AppColors.descriptionBox.background }}
              >
                <h2 className="text-lg font-black text-foreground mb-4">{ALGORITHMS[selectedAlgo].name}</h2>
                <p className="text-foreground font-medium leading-relaxed mb-4">{ALGORITHMS[selectedAlgo].desc}</p>
                <div className="bg-white p-4 rounded-lg border-2 border-border">
                  <h3 className="font-bold text-foreground mb-2">手順:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-foreground font-medium">
                    {ALGORITHMS[selectedAlgo].steps.map((step, idx) => (
                      <li key={idx} className="pl-1 marker:font-bold">
                        {step}
                      </li>
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
  );
};
