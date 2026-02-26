import { useState } from 'react';

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

export const useBitManipulation = () => {
  const [number, setNumber] = useState<number>(0);
  const [bitPosition, setBitPosition] = useState<number>(0);
  const [bitValue, setBitValue] = useState<number>(1);
  const [operationResult, setOperationResult] = useState<string | null>(null);

  // 32 bit representation
  const bitsText = (number >>> 0).toString(2).padStart(32, '0');
  const bitsArray = bitsText.split('');

  const handleSetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setNumber(val);
      setOperationResult(null);
    } else if (e.target.value === '' || e.target.value === '-') {
      setNumber(0);
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

  return {
    number,
    handleSetNumber,
    bitPosition,
    setBitPosition,
    bitValue,
    setBitValue,
    operationResult,
    bitsArray,
    isNumberEven: isEven(number),
    isNumberPowerOfTwo: isPowerOfTwo(number),
    numberSetBits: countSetBits(number),
    actions: {
      getBit: handleGetBit,
      setBit: handleSetBit,
      clearBit: handleClearBit,
      updateBit: handleUpdateBit,
      multiplyByTwo: handleMultiplyByTwo,
      divideByTwo: handleDivideByTwo,
      switchSign: handleSwitchSign,
    },
  };
};
