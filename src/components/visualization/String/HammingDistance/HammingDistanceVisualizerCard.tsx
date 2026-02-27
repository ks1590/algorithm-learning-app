import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DistanceStep } from '@/hooks/useHammingDistance';

interface HammingDistanceVisualizerCardProps {
  stringA: string;
  stringB: string;
  steps: DistanceStep[];
  result: number | null;
  calculate: () => void;
  error: string | null;
}

export const HammingDistanceVisualizerCard: React.FC<HammingDistanceVisualizerCardProps> = ({
  stringA,
  stringB,
  steps,
  result,
  calculate,
  error,
}) => {
  useEffect(() => {
    // 最初のレンダリング時に計算を実行する
    if (!error && steps.length === 0 && stringA && stringB) {
      calculate();
    }
  }, [error, steps.length, stringA, stringB, calculate]);

  return (
    <Card className="flex flex-col h-full overflow-hidden border-2 border-black shadow-[4px_4px_0_0_#000]">
      <CardHeader className="bg-slate-100 border-b-2 border-black p-4 flex flex-row items-center justify-between shrink-0">
        <div>
          <CardTitle className="text-2xl font-bold">視覚化</CardTitle>
        </div>
        <Button
          onClick={calculate}
          disabled={!!error || !stringA || !stringB}
          className="bg-black text-white hover:bg-slate-800 font-bold border-2 border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          計算する
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-6 flex flex-col items-center justify-center min-h-[400px] overflow-auto bg-white relative">
        {result !== null && (
          <div className="absolute top-4 right-6 bg-yellow-300 border-2 border-black px-4 py-2 font-bold transform rotate-[-2deg] shadow-[2px_2px_0_0_#000]">
            距離 = {result}
          </div>
        )}

        {/* 文字列の視覚化表示 */}
        <div className="flex flex-col gap-8 w-full max-w-2xl mt-8">
          <div className="flex gap-2 flex-wrap justify-center">
            {steps.map((step, i) => (
              <div key={`a-${i}`} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-12 h-16 flex items-center justify-center text-2xl font-mono font-bold border-2 border-black shadow-[2px_2px_0_0_#000] transition-transform group-hover:-translate-y-1 ${step.isDifferent ? 'bg-red-200' : 'bg-green-200'}`}
                >
                  {step.charA}
                </div>
                <div className="h-6 w-px bg-black opacity-30"></div>
                <div
                  className={`w-12 h-16 flex items-center justify-center text-2xl font-mono font-bold border-2 border-black shadow-[2px_2px_0_0_#000] transition-transform group-hover:translate-y-1 ${step.isDifferent ? 'bg-red-200' : 'bg-green-200'}`}
                >
                  {step.charB}
                </div>
                <div className="h-6 flex items-center justify-center">
                  {step.isDifferent && <span className="text-xs text-red-600 font-bold">diff</span>}
                </div>
              </div>
            ))}
          </div>
          {steps.length === 0 && !error && (
            <div className="text-center text-muted-foreground font-medium">計算ボタンを押して結果を表示します</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
