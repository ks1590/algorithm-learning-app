import { describe, it, expect } from 'vitest';

import { interpolationSearch } from '@/algorithms/search/interpolationSearch';

describe('interpolationSearch', () => {
  it('配列内に存在する要素を正しく見つけること', () => {
    // 内挿探索は最良のケースのために一様に分布したソート済みの配列を必要とします
    const array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const generator = interpolationSearch(array, 60);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(true);
    expect(result?.pos).toBe(5); // 60のインデックスは5
  });

  it('配列内に存在しない要素の場合、foundがfalseになること', () => {
    const array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const generator = interpolationSearch(array, 65);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(false);
  });
});
