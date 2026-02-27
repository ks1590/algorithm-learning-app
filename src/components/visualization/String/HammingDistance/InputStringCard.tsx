import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputStringCardProps {
  stringA: string;
  stringB: string;
  handleSetStringA: (val: string) => void;
  handleSetStringB: (val: string) => void;
  error: string | null;
}

export const InputStringCard: React.FC<InputStringCardProps> = ({
  stringA,
  stringB,
  handleSetStringA,
  handleSetStringB,
  error,
}) => {
  return (
    <Card className="overflow-hidden pt-0 gap-0">
      <CardHeader className="bg-pink-200 border-b-2 border-black p-4">
        <CardTitle className="text-2xl font-bold">文字列入力</CardTitle>
        <CardDescription className="text-pink-950 font-medium">
          比較する2つの文字列を入力（同じ長さである必要があります）
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="string-a" className="text-lg font-bold">
            文字列 A
          </Label>
          <Input
            id="string-a"
            type="text"
            value={stringA}
            onChange={(e) => handleSetStringA(e.target.value)}
            className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#ec4899]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="string-b" className="text-lg font-bold">
            文字列 B
          </Label>
          <Input
            id="string-b"
            type="text"
            value={stringB}
            onChange={(e) => handleSetStringB(e.target.value)}
            className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#ec4899]"
          />
        </div>
        {error && <p className="text-sm text-red-600 font-bold pt-1">{error}</p>}
      </CardContent>
    </Card>
  );
};
