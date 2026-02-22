import { describe, it, expect } from 'vitest';

import { jumpSearch } from '@/algorithms/search/jumpSearch';

describe('jumpSearch', () => {
  it('配列内に存在する要素を正しく見つけること', () => {
    const array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
    const generator = jumpSearch(array, 55);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(true);
    expect(result?.index).toBe(10);
  });

  it('配列内に存在しない要素の場合、foundがfalseになること', () => {
    const array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
    const generator = jumpSearch(array, 100);

    let result;
    let step;
    do {
      step = generator.next();
      if (step.value) result = step.value;
    } while (!step.done);

    expect(result).toBeDefined();
    expect(result?.found).toBe(false);
    // 値が見つからなかったときのindexの状態が返される
    expect(result?.index).toBeDefined();
  });
});
