import { useState, useMemo } from 'react';

import { factorial, factorialRecursive } from '@/algorithms/math/factorial';

export type FactorialMethod = 'iterative' | 'recursive';

export interface FactorialStep {
  step: number;
  currentValue: number;
  multiplier: number;
  expression: string;
}

export const useFactorial = () => {
  const [number, setNumber] = useState<number>(5); // default starting value
  const [method, setMethod] = useState<FactorialMethod>('iterative');

  // We cap at 170 because 171! > Number.MAX_VALUE and returns Infinity in standard JS numbers
  const MAX_SAFE_FACTORIAL = 170;

  const handleSetNumber = (value: string) => {
    let parsed = parseInt(value, 10);
    // Ignore invalid values temporarily or handle them carefully
    if (isNaN(parsed)) {
      setNumber(0);
      return;
    }
    // clamp between 0 and 170
    parsed = Math.max(0, Math.min(MAX_SAFE_FACTORIAL, parsed));
    setNumber(parsed);
  };

  const { result, steps } = useMemo(() => {
    if (number < 0 || number > MAX_SAFE_FACTORIAL) {
      return { result: null, steps: [] };
    }

    let resultVal: number;
    let finalSteps: FactorialStep[] = [];

    if (method === 'iterative') {
      resultVal = factorial(number);
      let runningTotal = 1;
      finalSteps.push({
        step: 0,
        currentValue: 1,
        multiplier: 0,
        expression: '1',
      });
      for (let i = 1; i <= number; i++) {
        runningTotal *= i;
        finalSteps.push({
          step: i,
          currentValue: runningTotal,
          multiplier: i,
          expression: `${finalSteps[finalSteps.length - 1].expression} × ${i}`,
        });
      }
    } else {
      resultVal = factorialRecursive(number);
      // For recursive, we can show it building up backwards or just showing the calls
      // To mimic the call stack returning
      let expression = '1';
      finalSteps.push({
        step: 0,
        currentValue: 1,
        multiplier: 0,
        expression: '1',
      });
      let runningTotal = 1;
      for (let i = 1; i <= number; i++) {
        runningTotal *= i;
        expression = `${i} × (${expression})`;
        finalSteps.push({
          step: i,
          currentValue: runningTotal,
          multiplier: i,
          expression,
        });
      }
    }

    return { result: resultVal, steps: finalSteps };
  }, [number, method]);

  return {
    number,
    handleSetNumber,
    method,
    setMethod,
    result,
    steps,
    maxAllowed: MAX_SAFE_FACTORIAL,
  };
};
