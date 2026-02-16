import React from 'react';
import { BinaryFloatingPointVisualizer } from '@/components/BinaryFloatingPointVisualizer';

export const BinaryFloatingPointPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">浮動小数点数 (IEEE 754)</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        コンピュータがどのように小数を表現しているか（IEEE 754 単精度浮動小数点数）を学びましょう。
        符号部、指数部、仮数部のそれぞれの役割を確認できます。
      </p>
      <BinaryFloatingPointVisualizer />
    </div>
  );
};
