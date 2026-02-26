import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { FactorialMethod, FactorialStep } from '@/hooks/useFactorial';

interface FactorialVisualizerCardProps {
  method: FactorialMethod;
  setMethod: (method: FactorialMethod) => void;
  result: number | null;
  steps: FactorialStep[];
}

export const FactorialVisualizerCard: React.FC<FactorialVisualizerCardProps> = ({
  method,
  setMethod,
  result,
  steps,
}) => {
  return (
    <Card className="overflow-hidden pt-0 gap-0 h-full flex flex-col">
      <CardHeader className="bg-yellow-200 border-b-2 border-black p-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">計算プロセスの視覚化</CardTitle>
            <CardDescription className="text-yellow-950 font-medium mt-1">
              反復（Iterative）と再帰（Recursive）のアプローチの違いを確認できます
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={method === 'iterative' ? 'default' : 'outline'}
              onClick={() => setMethod('iterative')}
              className={`border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold ${
                method === 'iterative' ? 'bg-[#FF66C4] text-black' : 'bg-white text-black'
              }`}
            >
              反復 (Loop)
            </Button>
            <Button
              variant={method === 'recursive' ? 'default' : 'outline'}
              onClick={() => setMethod('recursive')}
              className={`border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold ${
                method === 'recursive' ? 'bg-[#8E9DFF] text-black' : 'bg-white text-black'
              }`}
            >
              再帰 (Recursion)
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Result Area */}
        <div className="bg-[#3DCCC7] text-black p-6 rounded-xl border-2 border-black flex flex-col items-center justify-center shrink-0">
          <span className="text-xl font-bold text-teal-950 mb-2">計算結果</span>
          {result !== null ? (
            <span className="text-4xl md:text-5xl font-black font-mono break-all text-center">
              {result.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          ) : (
            <span className="text-xl text-red-700 font-bold bg-white px-4 py-2 rounded border-2 border-black">
              範囲外の値です
            </span>
          )}
        </div>

        {/* Steps Visualization */}
        <div className="flex-1 overflow-y-auto border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
          <div className="space-y-4">
            {steps.map((stepInfo, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              >
                <div className="bg-blue-200 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold text-blue-900 shrink-0">
                  {stepInfo.step}
                </div>
                <div className="flex-1 overflow-x-auto pb-1">
                  <div className="font-mono text-lg font-bold whitespace-nowrap">{stepInfo.expression}</div>
                </div>
                <div className="font-mono text-xl font-black text-emerald-600 shrink-0">
                  = {stepInfo.currentValue.toLocaleString()}
                </div>
              </div>
            ))}
            {steps.length === 0 && (
              <div className="text-center text-muted-foreground font-medium py-8">ステップが表示されません</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
