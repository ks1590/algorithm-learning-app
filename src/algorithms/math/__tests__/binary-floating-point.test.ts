import { describe, it, expect } from 'vitest';

import { floatToBinary, getExponentValue } from '@/algorithms/math/binary-floating-point';

describe('binary-floating-point', () => {
  describe('floatToBinary', () => {
    it('正の小数を正しくIEEE 754単精度浮動小数点形式に変換できること (0.15625)', () => {
      const result = floatToBinary('0.15625');
      // 0.15625 = 1.25 * 2^-3
      // 符号部: 0
      // 指数部: -3 + 127 = 124 (01111100)
      // 仮数部: 0.25 (01000000000000000000000)
      expect(result.sign).toBe(0);
      expect(result.exponent).toBe('01111100');
      expect(result.mantissa).toBe('01000000000000000000000');
      expect(result.binary).toBe('00111110001000000000000000000000');
    });

    it('負の整数を正しく変換できること (-10)', () => {
      const result = floatToBinary('-10');
      // -10 = -1.25 * 2^3
      // 符号部: 1
      // 指数部: 3 + 127 = 130 (10000010)
      // 仮数部: 0.25 (01000000000000000000000)
      expect(result.sign).toBe(1);
      expect(result.exponent).toBe('10000010');
      expect(result.mantissa).toBe('01000000000000000000000');
      expect(result.binary).toBe('11000001001000000000000000000000');
    });

    it('0を正しく変換できること (0)', () => {
      const result = floatToBinary('0');
      expect(result.sign).toBe(0);
      expect(result.exponent).toBe('00000000');
      expect(result.mantissa).toBe('00000000000000000000000');
      expect(result.binary).toBe('00000000000000000000000000000000');
    });

    it('無効な文字列（数値として解析できない場合）は0の形式を返すこと', () => {
      const result = floatToBinary('abc');
      expect(result.sign).toBe(0);
      expect(result.exponent).toBe('00000000');
      expect(result.mantissa).toBe('00000000000000000000000');
      expect(result.binary).toBe('00000000000000000000000000000000');
    });
  });

  describe('getExponentValue', () => {
    it('2進数の指数部からバイアス(127)を引いた正しい実際の指数を返すこと', () => {
      // 127 - 127 = 0
      expect(getExponentValue('01111111')).toBe(0);
      // 124 - 127 = -3
      expect(getExponentValue('01111100')).toBe(-3);
      // 130 - 127 = 3
      expect(getExponentValue('10000010')).toBe(3);
    });
  });
});
