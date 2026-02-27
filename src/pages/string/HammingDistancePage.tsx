import React from 'react';

import { HammingDistanceVisualizerCard } from '@/components/visualization/String/HammingDistance/HammingDistanceVisualizerCard';
import { InputStringCard } from '@/components/visualization/String/HammingDistance/InputStringCard';
import { useHammingDistance } from '@/hooks/useHammingDistance';

export const HammingDistancePage: React.FC = () => {
  const { stringA, stringB, handleSetStringA, handleSetStringB, steps, result, error } = useHammingDistance();

  return (
    <div className="mx-auto py-2 md:py-8 space-y-4 md:space-y-8 max-w-6xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-2 md:mb-4 space-y-2 md:space-y-4 shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Hamming Distance</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          二つの文字列間の距離（異なる文字の数）を計算して視覚化する
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 flex-1 min-h-0">
        <div className="space-y-4 md:space-y-6 lg:col-span-1 flex flex-col">
          <InputStringCard
            stringA={stringA}
            stringB={stringB}
            handleSetStringA={handleSetStringA}
            handleSetStringB={handleSetStringB}
            error={error}
          />
        </div>
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <HammingDistanceVisualizerCard
            stringA={stringA}
            stringB={stringB}
            steps={steps}
            result={result}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
