import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputNumberCardProps {
  number: number;
  handleSetNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNumberEven: boolean;
  isNumberPowerOfTwo: boolean;
  numberSetBits: number;
  actions: {
    multiplyByTwo: () => void;
    divideByTwo: () => void;
    switchSign: () => void;
  };
}

export const InputNumberCard: React.FC<InputNumberCardProps> = ({
  number,
  handleSetNumber,
  isNumberEven,
  isNumberPowerOfTwo,
  numberSetBits,
  actions,
}) => {
  return (
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
              onClick={actions.multiplyByTwo}
              variant="outline"
              className="border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
            >
              × 2
            </Button>
            <Button
              onClick={actions.divideByTwo}
              variant="outline"
              className="border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
            >
              ÷ 2
            </Button>
            <Button
              onClick={actions.switchSign}
              variant="outline"
              className="col-span-2 border-2 border-black shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-bold"
            >
              符号反転 (+/-)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
