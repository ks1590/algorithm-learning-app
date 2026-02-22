import { useState, useEffect } from 'react';

import { floatToBinary, type BinaryFloatingPointData } from '@/algorithms/math/binary-floating-point';

export function useBinaryFloatingPoint(initialValue: string = '0.15625') {
  const [numberInput, setNumberInput] = useState<string>(initialValue);
  const [data, setData] = useState<BinaryFloatingPointData | null>(null);

  useEffect(() => {
    setData(floatToBinary(numberInput));
  }, [numberInput]);

  return { numberInput, setNumberInput, data };
}
