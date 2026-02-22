import React from 'react';

import { getExponentValue } from '@/algorithms/math/binary-floating-point';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBinaryFloatingPoint } from '@/hooks/useBinaryFloatingPoint';

export const BinaryFloatingPointVisualizer: React.FC = () => {
  const { numberInput, setNumberInput, data } = useBinaryFloatingPoint('0.15625');

  return (
    <div className="w-full mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>浮動小数点数コンバーター (IEEE 754 単精度)</CardTitle>
          <CardDescription>10進数を入力して、32ビット浮動小数点数表現を確認できます。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="number-input" className="text-sm font-medium">
              10進数
            </label>
            <Input
              id="number-input"
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="数値を入力 (例: 0.15625)"
              className="text-lg"
            />
          </div>

          {data && (
            <div className="space-y-8">
              {/* Binary Representation Bar */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">2進数表現</h3>
                <div className="flex flex-wrap md:flex-nowrap gap-1 text-center font-mono text-sm md:text-base">
                  {/* Sign */}
                  <div className="flex flex-col items-center">
                    <div className="p-2 bg-red-100 border-2 border-red-400 rounded w-10 md:w-12 h-10 md:h-12 flex items-center justify-center font-bold text-red-700">
                      {data.sign}
                    </div>
                    <span className="text-xs text-red-600 mt-1 font-bold">符号部 (Sign)</span>
                    <span className="text-[10px] text-muted-foreground">1ビット</span>
                  </div>

                  {/* Exponent */}
                  <div className="flex flex-col items-center">
                    <div className="flex gap-[1px]">
                      {data.exponent.split('').map((bit, i) => (
                        <div
                          key={`exp-${i}`}
                          className="w-6 md:w-8 h-10 md:h-12 bg-blue-100 border-y-2 border-l-[1px] last:border-r-2 border-blue-400 flex items-center justify-center font-bold text-blue-700 first:rounded-l last:rounded-r"
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-blue-600 mt-1 font-bold">指数部 (Exponent)</span>
                    <span className="text-[10px] text-muted-foreground">8ビット</span>
                  </div>

                  {/* Mantissa */}
                  <div className="flex flex-col items-center overflow-x-auto">
                    <div className="flex gap-[1px]">
                      {data.mantissa.split('').map((bit, i) => (
                        <div
                          key={`man-${i}`}
                          className="w-6 md:w-8 h-10 md:h-12 bg-green-100 border-y-2 border-l-[1px] last:border-r-2 border-green-400 flex items-center justify-center font-bold text-green-700 first:rounded-l last:rounded-r"
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-green-600 mt-1 font-bold">仮数部 (Mantissa)</span>
                    <span className="text-[10px] text-muted-foreground">23ビット</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-red-700">符号部 (Sign)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-mono font-bold text-red-600 mb-1">{data.sign}</div>
                    <p className="text-sm text-muted-foreground">{data.sign === 0 ? '正 (+)' : '負 (-)'}</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-blue-700">指数部 (Exponent)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-mono font-bold text-blue-600 mb-1">{data.exponent}</div>
                    <p className="text-sm text-muted-foreground">10進数換算: {parseInt(data.exponent, 2)}</p>
                    <div className="text-xs text-muted-foreground mt-2 border-t border-blue-200 pt-2">
                      2進数: {parseInt(data.exponent, 2)}
                      <br />
                      バイアス: -127
                      <br />
                      <strong>実際の指数: {getExponentValue(data.exponent)}</strong>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-green-700">仮数部 (Mantissa)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-mono font-bold text-green-600 mb-1 break-all">{data.mantissa}</div>
                    <p className="text-xs text-muted-foreground">
                      有効数字（小数部分）を表します。
                      <br />
                      正規化数では、先頭に隠れた「1」が存在します。
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm md:text-base overflow-x-auto">
                <div className="font-bold mb-2 text-slate-700">計算式:</div>
                <div>
                  (-1)<sup>{data.sign}</sup> × (1 + 0.{data.mantissa}
                  <sub>2</sub>) × 2<sup>({parseInt(data.exponent, 2)} - 127)</sup>
                </div>
                <div className="mt-2 text-slate-600">
                  = {data.sign === 0 ? '+' : '-'}(1.mantissa) × 2<sup>{getExponentValue(data.exponent)}</sup>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
