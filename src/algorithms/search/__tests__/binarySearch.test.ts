import { describe, it, expect } from 'vitest';

import { binarySearch } from '@/algorithms/search/binarySearch';

describe('binarySearch', () => {
  it('配列内に存在する要素を正しく見つけること', () => {
    const array = [1, 3, 5, 7, 9, 11];
    const generator = binarySearch(array, 7);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(true);
    expect(result?.mid).toBe(3);
    // 戻り値の確認
    expect(step.value).toBeUndefined();
  });

  it('配列内に存在しない要素の場合、foundがfalseになること', () => {
    const array = [1, 3, 5, 7, 9, 11];
    const generator = binarySearch(array, 6);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(false);
    expect(result?.mid).toBe(-1);
  });

  it('空の配列の場合、見つからないこと', () => {
    const array: number[] = [];
    const generator = binarySearch(array, 5);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(false);
    expect(result?.mid).toBe(-1);
  });
});
