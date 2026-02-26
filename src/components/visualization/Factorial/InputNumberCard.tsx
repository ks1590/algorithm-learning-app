import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputNumberCardProps {
  number: number;
  handleSetNumber: (value: string) => void;
  maxAllowed: number;
}

export const InputNumberCard: React.FC<InputNumberCardProps> = ({ number, handleSetNumber, maxAllowed }) => {
  return (
    <Card className="overflow-hidden pt-0 gap-0">
      <CardHeader className="bg-emerald-200 border-b-2 border-black p-4">
        <CardTitle className="text-2xl font-bold">数値入力 (N)</CardTitle>
        <CardDescription className="text-emerald-950 font-medium">階乗を計算する対象の整数を入力</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-number" className="text-lg font-bold">
            ターゲット値
          </Label>
          <Input
            id="base-number"
            type="number"
            min={0}
            max={maxAllowed}
            value={number}
            onChange={(e) => handleSetNumber(e.target.value)}
            className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#10b981]"
          />
          <p className="text-xs text-muted-foreground font-medium pt-1">
            ※ JavaScriptの数値上限の都合上、{maxAllowed} までの入力に制限しています。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
