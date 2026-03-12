import React from 'react';
import type { ChangeEvent } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputStringCardProps {
  inputString: string;
  handleSetInputString: (val: string) => void;
}

export const InputStringCard: React.FC<InputStringCardProps> = ({ inputString, handleSetInputString }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetInputString(e.target.value);
  };

  return (
    <Card className="overflow-hidden pt-0 gap-0 border-2 border-black shadow-[4px_4px_0_0_#000] bg-white h-full flex flex-col">
      <CardHeader className="bg-pink-200 border-b-2 border-black p-4 shrink-0">
        <CardTitle className="text-2xl font-bold">文字列入力</CardTitle>
        <CardDescription className="text-pink-950 font-medium pt-2">
          回文判定したい文字列を入力（例: racecar, madam, 12321）
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4 flex-1">
        <div className="space-y-2">
          <Label htmlFor="palindrome-input" className="text-lg font-bold">
            ターゲット文字列
          </Label>
          <Input
            id="palindrome-input"
            type="text"
            value={inputString}
            onChange={onChange}
            className="text-2xl font-mono p-6 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[2px_2px_0_0_#ec4899] transition-all rounded-xl mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
