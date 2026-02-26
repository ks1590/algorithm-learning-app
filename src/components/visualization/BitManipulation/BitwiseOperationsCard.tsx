import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BitwiseOperationsCardProps {
  bitPosition: number;
  setBitPosition: (pos: number) => void;
  bitValue: number;
  setBitValue: (val: number) => void;
  operationResult: string | null;
  actions: {
    getBit: () => void;
    setBit: () => void;
    clearBit: () => void;
    updateBit: () => void;
  };
}

export const BitwiseOperationsCard: React.FC<BitwiseOperationsCardProps> = ({
  bitPosition,
  setBitPosition,
  bitValue,
  setBitValue,
  operationResult,
  actions,
}) => {
  return (
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
            onClick={actions.getBit}
            className="bg-[#FFE2E2] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#FFE2E2] font-black text-lg h-auto py-3"
          >
            取得
          </Button>
          <Button
            onClick={actions.setBit}
            className="bg-[#E2FFE2] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#E2FFE2] font-black text-lg h-auto py-3"
          >
            1にする (Set)
          </Button>
          <Button
            onClick={actions.clearBit}
            className="bg-[#E2E2FF] text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[#E2E2FF] font-black text-lg h-auto py-3"
          >
            0にする (Clear)
          </Button>
          <Button
            onClick={actions.updateBit}
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
  );
};
