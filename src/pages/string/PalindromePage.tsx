import React from 'react';

import { InputStringCard } from '@/components/visualization/String/Palindrome/InputStringCard';
import { PalindromeVisualizerCard } from '@/components/visualization/String/Palindrome/PalindromeVisualizerCard';
import { usePalindrome } from '@/hooks/usePalindrome';

export const PalindromePage: React.FC = () => {
  const { inputString, handleSetInputString, steps, result } = usePalindrome();

  return (
    <div className="mx-auto py-2 md:py-8 space-y-4 md:space-y-8 max-w-6xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-2 md:mb-4 space-y-2 md:space-y-4 shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Palindrome</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          文字列が前から読んでも後ろから読んでも同じ（回文）かを判定します
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 flex-1 min-h-0">
        <div className="space-y-4 md:space-y-6 lg:col-span-1 flex flex-col">
          <InputStringCard inputString={inputString} handleSetInputString={handleSetInputString} />
        </div>
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <PalindromeVisualizerCard inputString={inputString} steps={steps} result={result} />
        </div>
      </div>
    </div>
  );
};
