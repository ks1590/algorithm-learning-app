import React from 'react';

import { BitwiseOperationsCard } from '@/components/visualization/BitManipulation/BitwiseOperationsCard';
import { InputNumberCard } from '@/components/visualization/BitManipulation/InputNumberCard';
import { MemoryVisualizerCard } from '@/components/visualization/BitManipulation/MemoryVisualizerCard';
import { useBitManipulation } from '@/hooks/useBitManipulation';

export const BitManipulationPage: React.FC = () => {
  const {
    number,
    handleSetNumber,
    bitPosition,
    setBitPosition,
    bitValue,
    setBitValue,
    operationResult,
    bitsArray,
    isNumberEven,
    isNumberPowerOfTwo,
    numberSetBits,
    actions,
  } = useBitManipulation();

  return (
    <div className="mx-auto py-8 space-y-8 max-w-6xl">
      <div className="text-center mb-8 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Bit Manipulation</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          ビット演算の仕組みを直感的に動かしながら学ぶ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Number State and Quick Actions */}
        <div className="space-y-6 lg:col-span-1">
          <InputNumberCard
            number={number}
            handleSetNumber={handleSetNumber}
            isNumberEven={isNumberEven}
            isNumberPowerOfTwo={isNumberPowerOfTwo}
            numberSetBits={numberSetBits}
            actions={actions}
          />
        </div>

        {/* Right Column: Visualization and Operations */}
        <div className="space-y-6 lg:col-span-2">
          {/* Visualizer */}
          <MemoryVisualizerCard bitsArray={bitsArray} bitPosition={bitPosition} setBitPosition={setBitPosition} />

          {/* Bit Operations */}
          <BitwiseOperationsCard
            bitPosition={bitPosition}
            setBitPosition={setBitPosition}
            bitValue={bitValue}
            setBitValue={setBitValue}
            operationResult={operationResult}
            actions={actions}
          />
        </div>
      </div>
    </div>
  );
};
