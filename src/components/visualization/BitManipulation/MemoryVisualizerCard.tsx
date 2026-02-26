import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MemoryVisualizerCardProps {
  bitsArray: string[];
  bitPosition: number;
  setBitPosition: (pos: number) => void;
}

export const MemoryVisualizerCard: React.FC<MemoryVisualizerCardProps> = ({
  bitsArray,
  bitPosition,
  setBitPosition,
}) => {
  return (
    <Card className="overflow-hidden pt-0 gap-0">
      <CardHeader className="bg-yellow-200 border-b-2 border-black p-4">
        <CardTitle className="text-2xl font-bold">32ビット メモリ表現</CardTitle>
        <CardDescription className="text-yellow-950 font-medium mt-1">
          右端（index 0）から左側（index 31）に向かって2進数を視覚化します
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        <div className="flex justify-center gap-[2px] min-w-max pb-4">
          {bitsArray.map((bit, index) => {
            const currentPos = 31 - index;
            // highlight the selected bit position
            const isSelected = currentPos === bitPosition;
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-6 h-10 md:w-8 md:h-12 border-2 border-black font-mono text-lg font-bold flex items-center justify-center cursor-pointer transition-all
                    ${bit === '1' ? 'bg-black text-white' : 'bg-white text-black'}
                    ${isSelected ? 'ring-4 ring-emerald-500 ring-offset-2 z-10' : ''}
                  `}
                  onClick={() => setBitPosition(currentPos)}
                  title={`Bit Position: ${currentPos}`}
                >
                  {bit}
                </div>
                {/* Show markers for every 4 bits or just 0, 8, 16, 24 */}
                <span className="text-[10px] font-mono mt-1 opacity-50">{currentPos % 4 === 0 ? currentPos : ''}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
