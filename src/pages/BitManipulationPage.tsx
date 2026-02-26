import React, { useState } from 'react';

import {
  getBit,
  setBit,
  clearBit,
  updateBit,
  isEven,
  isPowerOfTwo,
  countSetBits,
  switchSign,
  multiplyByTwo,
  divideByTwo,
} from '@/algorithms/math/bits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const BitManipulationPage: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [bitPosition, setBitPosition] = useState<number>(0);
  const [bitValue, setBitValue] = useState<number>(1);
  const [operationResult, setOperationResult] = useState<string | null>(null);

  // Animate changes or something simple? Just standard nice Neo-brutalism design UI.

  // 32 bit representation
  const bitsText = (number >>> 0).toString(2).padStart(32, '0');
  const bitsArray = bitsText.split('');

  const handleSetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setNumber(val);
      setOperationResult(null);
    } else if (e.target.value === '' || e.target.value === '-') {
      setNumber(0); // or handle negative input gently
    }
  };

  const handleGetBit = () => {
    const res = getBit(number, bitPosition);
    setOperationResult(`${bitPosition}ビット目は「${res}」です`);
  };

  const handleSetBit = () => {
    const res = setBit(number, bitPosition);
    setNumber(res);
    setOperationResult(`${bitPosition}ビット目を「1」にセットしました`);
  };

  const handleClearBit = () => {
    const res = clearBit(number, bitPosition);
    setNumber(res);
    setOperationResult(`${bitPosition}ビット目をクリア(0)しました`);
  };

  const handleUpdateBit = () => {
    const res = updateBit(number, bitPosition, bitValue);
    setNumber(res);
    setOperationResult(`${bitPosition}ビット目を「${bitValue}」に更新しました`);
  };

  const handleMultiplyByTwo = () => {
    setNumber(multiplyByTwo(number));
    setOperationResult(`2倍にしました (左シフト)`);
  };

  const handleDivideByTwo = () => {
    setNumber(divideByTwo(number));
    setOperationResult(`2で割りました (右シフト)`);
  };

  const handleSwitchSign = () => {
    setNumber(switchSign(number));
    setOperationResult(`符号を反転しました`);
  };

  // derived values
  const isNumberEven = isEven(number);
  const isNumberPowerOfTwo = isPowerOfTwo(number);
  const numberSetBits = countSetBits(number);

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
          <Card className="overflow-hidden pt-0 gap-0">
            <CardHeader className="bg-emerald-200 border-b-2 border-black p-4">
              <CardTitle className="text-2xl font-bold">10進数入力</CardTitle>
              <CardDescription className="text-emerald-950 font-medium">基数となる整数を入力</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-number" className="text-lg font-bold">
                  10進数
                </Label>
                <Input
                  id="base-number"
                  type="number"
                  value={number}
                  onChange={handleSetNumber}
                  className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#10b981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 border-2 border-black rounded-xl bg-purple-100 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold mb-1">偶数 or 奇数</span>
                  <span className="text-xl font-black">{isNumberEven ? '偶数' : '奇数'}</span>
                </div>
                <div className="p-4 border-2 border-black rounded-xl bg-orange-100 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold mb-1">2の累乗？</span>
                  <span className="text-xl font-black">{isNumberPowerOfTwo ? 'Yes' : 'No'}</span>
                </div>
                <div className="p-4 border-2 border-black rounded-xl bg-blue-100 flex col-span-2 items-center justify-between">
                  <span className="text-sm font-bold">1のビット数:</span>
                  <span className="text-2xl font-black">{numberSetBits}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-base font-bold text-muted-foreground">クイック操作</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleMultiplyByTwo}
                    variant="outline"
                    className="border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
                  >
                    × 2
                  </Button>
                  <Button
                    onClick={handleDivideByTwo}
                    variant="outline"
                    className="border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
                  >
                    ÷ 2
                  </Button>
                  <Button
                    onClick={handleSwitchSign}
                    variant="outline"
                    className="col-span-2 border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
                  >
                    符号反転 (+/-)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Visualization and Operations */}
        <div className="space-y-6 lg:col-span-2">
          {/* Visualizer */}
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
                      <span className="text-[10px] font-mono mt-1 opacity-50">
                        {currentPos % 4 === 0 ? currentPos : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bit Operations */}
          <Card className="overflow-hidden pt-0 gap-0">
            <CardHeader className="bg-blue-200 border-b-2 border-black p-4">
              <CardTitle className="text-2xl font-bold">ビット操作</CardTitle>
              <CardDescription className="text-blue-950 font-medium">特定の位置のビットに対する操作</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="bit-pos" className="text-lg font-bold">
                    ビット位置 (0-31)
                  </Label>
                  <Input
                    id="bit-pos"
                    type="number"
                    min={0}
                    max={31}
                    value={bitPosition}
                    onChange={(e) => setBitPosition(Math.max(0, Math.min(31, parseInt(e.target.value) || 0)))}
                    className="text-xl font-mono border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="bit-val" className="text-lg font-bold">
                    設定値 (0 or 1)
                  </Label>
                  <Input
                    id="bit-val"
                    type="number"
                    min={0}
                    max={1}
                    value={bitValue}
                    onChange={(e) => setBitValue(parseInt(e.target.value) === 1 ? 1 : 0)}
                    className="text-xl font-mono border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={handleGetBit}
                  className="bg-[#FFE2E2] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#FFE2E2] font-black text-lg h-auto py-3"
                >
                  取得
                </Button>
                <Button
                  onClick={handleSetBit}
                  className="bg-[#E2FFE2] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#E2FFE2] font-black text-lg h-auto py-3"
                >
                  1にする (Set)
                </Button>
                <Button
                  onClick={handleClearBit}
                  className="bg-[#E2E2FF] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#E2E2FF] font-black text-lg h-auto py-3"
                >
                  0にする (Clear)
                </Button>
                <Button
                  onClick={handleUpdateBit}
                  className="bg-[#FFFFE2] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#FFFFE2] font-black text-lg h-auto py-3"
                >
                  更新 (Update)
                </Button>
              </div>

              {operationResult && (
                <div className="bg-black text-white p-4 rounded-xl border-2 border-black font-mono text-lg font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  {'>'} {operationResult}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
