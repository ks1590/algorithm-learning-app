import React from 'react';

import { getExponentValue } from '@/algorithms/math/binary-floating-point';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBinaryFloatingPoint } from '@/hooks/useBinaryFloatingPoint';

export const BinaryFloatingPointVisualizer: React.FC = () => {
  const { numberInput, setNumberInput, data } = useBinaryFloatingPoint('0.15625');

  return (
    <div className="w-full mx-auto space-y-8">
      <Card className="overflow-hidden pt-0 gap-0 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <CardHeader className="bg-[#FFD23F] border-b-2 border-black p-4">
          <CardTitle className="text-2xl font-bold">浮動小数点数コンバーター (IEEE 754 単精度)</CardTitle>
          <CardDescription className="text-yellow-950 font-medium">
            10進数を入力して、32ビット浮動小数点数表現を確認できます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="number-input" className="text-xl font-bold pt-4">
              10進数
            </label>
            <Input
              id="number-input"
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="数値を入力 (例: 0.15625)"
              className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#FF66C4]"
            />
          </div>

          {data && (
            <div className="space-y-8">
              {/* Binary Representation Bar */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2進数表現</h3>
                <div className="flex flex-wrap md:flex-nowrap gap-1 text-center font-mono text-sm md:text-base">
                  {/* Sign */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#FF66C4] border-2 border-black rounded w-10 md:w-12 h-10 md:h-12 flex items-center justify-center font-bold text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      {data.sign}
                    </div>
                    <span className="text-xs text-pink-700 mt-2 font-bold">符号部 (Sign)</span>
                    <span className="text-[10px] text-muted-foreground">1ビット</span>
                  </div>

                  {/* Exponent */}
                  <div className="flex flex-col items-center">
                    <div className="flex gap-[1px]">
                      {data.exponent.split('').map((bit, i) => (
                        <div
                          key={`exp-${i}`}
                          className="w-6 md:w-8 h-10 md:h-12 bg-[#8E9DFF] border-y-2 border-l-2 last:border-r-2 border-black flex items-center justify-center font-bold text-black first:rounded-l last:rounded-r shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-indigo-700 mt-2 font-bold">指数部 (Exponent)</span>
                    <span className="text-[10px] text-muted-foreground">8ビット</span>
                  </div>

                  {/* Mantissa */}
                  <div className="flex flex-col items-center overflow-x-auto">
                    <div className="flex gap-[1px]">
                      {data.mantissa.split('').map((bit, i) => (
                        <div
                          key={`man-${i}`}
                          className="w-6 md:w-8 h-10 md:h-12 bg-[#d9f99d] border-y-2 border-l-2 last:border-r-2 border-black flex items-center justify-center font-bold text-black first:rounded-l last:rounded-r shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-lime-800 mt-2 font-bold">仮数部 (Mantissa)</span>
                    <span className="text-[10px] text-muted-foreground">23ビット</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-[#FFE2E2] overflow-hidden">
                  <CardHeader className="pb-2 border-b-2 border-black">
                    <CardTitle className="text-sm font-bold text-black">符号部 (Sign)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-mono font-bold text-rose-600 mb-1">{data.sign}</div>
                    <p className="text-sm text-black font-medium">{data.sign === 0 ? '正 (+)' : '負 (-)'}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-[#E2E2FF] overflow-hidden">
                  <CardHeader className="pb-2 border-b-2 border-black">
                    <CardTitle className="text-sm font-bold text-black">指数部 (Exponent)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-mono font-bold text-indigo-600 mb-1">{data.exponent}</div>
                    <p className="text-sm text-black font-medium">10進数換算: {parseInt(data.exponent, 2)}</p>
                    <div className="text-xs text-black font-medium mt-2 border-t border-black pt-2">
                      2進数: {parseInt(data.exponent, 2)}
                      <br />
                      バイアス: -127
                      <br />
                      <strong>実際の指数: {getExponentValue(data.exponent)}</strong>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-[#E2FFE2] overflow-hidden">
                  <CardHeader className="pb-2 border-b-2 border-black">
                    <CardTitle className="text-sm font-bold text-black">仮数部 (Mantissa)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 overflow-x-auto">
                    <div className="text-sm font-mono font-bold text-lime-700 mb-1 break-all">{data.mantissa}</div>
                    <p className="text-xs text-black font-medium">
                      有効数字（小数部分）を表します。
                      <br />
                      正規化数では、先頭に隠れた「1」が存在します。
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] p-6 rounded-xl font-mono text-sm md:text-base overflow-x-auto">
                <div className="font-bold text-xl mb-4 text-black border-b-2 border-black pb-2 inline-block">
                  計算式:
                </div>
                <div className="font-bold text-lg p-3 bg-gray-100 rounded border-2 border-black">
                  (-1)<sup>{data.sign}</sup> × (1 + 0.{data.mantissa}
                  <sub>2</sub>) × 2<sup>({parseInt(data.exponent, 2)} - 127)</sup>
                </div>
                <div className="mt-4 font-black flex items-center text-xl text-teal-700">
                  <span className="mr-2">=</span>
                  {data.sign === 0 ? '+' : '-'}(1.mantissa) × 2<sup>{getExponentValue(data.exponent)}</sup>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
