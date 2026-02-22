import { describe, it, expect } from 'vitest';

import { linearSearch } from '@/algorithms/search/linearSearch';

describe('linearSearch', () => {
  it('配列内に存在する要素を正しく見つけること', () => {
    const array = [5, 2, 8, 1, 9];
    const generator = linearSearch(array, 8);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(true);
    expect(result?.currentIndex).toBe(2);
  });

  it('配列内に存在しない要素の場合、foundがfalseになること', () => {
    const array = [5, 2, 8, 1, 9];
    const generator = linearSearch(array, 3);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(false);
    expect(result?.currentIndex).toBe(-1);
  });

  it('配列の先頭にある要素をすぐに見つけること', () => {
    const array = [5, 2, 8, 1, 9];
    const generator = linearSearch(array, 5);

    const step = generator.next();
    expect(step.done).toBe(false);
    expect(step.value?.found).toBe(true);
    expect(step.value?.currentIndex).toBe(0);
  });
});
