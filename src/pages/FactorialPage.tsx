import React from 'react';

import { FactorialVisualizerCard } from '@/components/visualization/Factorial/FactorialVisualizerCard';
import { InputNumberCard } from '@/components/visualization/Factorial/InputNumberCard';
import { useFactorial } from '@/hooks/useFactorial';

export const FactorialPage: React.FC = () => {
  const { number, handleSetNumber, method, setMethod, result, steps, maxAllowed } = useFactorial();

  return (
    <div className="mx-auto py-8 space-y-8 max-w-6xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-4 space-y-4 shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Factorial</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          階乗の計算プロセスを反復と再帰のアプローチごとに視覚化して学ぶ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Left Column: Input and configuration */}
        <div className="space-y-6 lg:col-span-1 flex flex-col">
          <InputNumberCard number={number} handleSetNumber={handleSetNumber} maxAllowed={maxAllowed} />
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <FactorialVisualizerCard method={method} setMethod={setMethod} result={result} steps={steps} />
        </div>
      </div>
    </div>
  );
};
