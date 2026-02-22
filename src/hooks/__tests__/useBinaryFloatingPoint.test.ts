import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { floatToBinary } from '@/algorithms/math/binary-floating-point';
import { useBinaryFloatingPoint } from '@/hooks/useBinaryFloatingPoint';

// 内部的にfloatToBinaryの実装に依存しているため、フックがパラメータを正しく接続することを期待します
describe('useBinaryFloatingPoint', () => {
  it('デフォルトの初期値で初期化されること', () => {
    const { result } = renderHook(() => useBinaryFloatingPoint());

    expect(result.current.numberInput).toBe('0.15625');
    expect(result.current.data).toEqual(floatToBinary('0.15625'));
  });

  it('指定した初期値で初期化されること', () => {
    const { result } = renderHook(() => useBinaryFloatingPoint('10.5'));

    expect(result.current.numberInput).toBe('10.5');
    expect(result.current.data).toEqual(floatToBinary('10.5'));
  });

  it('numberInputを変更するとdataが更新されること', () => {
    const { result } = renderHook(() => useBinaryFloatingPoint());

    act(() => {
      result.current.setNumberInput('-3.14');
    });

    expect(result.current.numberInput).toBe('-3.14');
    expect(result.current.data).toEqual(floatToBinary('-3.14'));
  });
});
