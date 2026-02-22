import { describe, it, expect } from 'vitest';

import { selectionSort } from '@/algorithms/sorting/selection-sort/selectionSort';

import { runSortToCompletion } from './testHelper';

describe('selectionSort', () => {
  it('ランダムな配列を正しく昇順にソートできること', () => {
    const array = [64, 34, 25, 12, 22, 11, 90];
    const generator = selectionSort(array);
    const result = runSortToCompletion(generator);

    expect(result.array).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it('すでにソート済みの配列を正しく処理できること', () => {
    const array = [1, 2, 3, 4, 5];
    const generator = selectionSort(array);
    const result = runSortToCompletion(generator);

    expect(result.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('逆順にソートされた配列を正しく昇順にソートできること', () => {
    const array = [5, 4, 3, 2, 1];
    const generator = selectionSort(array);
    const result = runSortToCompletion(generator);

    expect(result.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('空の配列を正しく処理できること', () => {
    const array: number[] = [];
    const generator = selectionSort(array);
    const result = runSortToCompletion(generator);

    expect(result.array).toEqual([]);
  });

  it('要素が1つの配列を正しく処理できること', () => {
    const array = [42];
    const generator = selectionSort(array);
    const result = runSortToCompletion(generator);

    expect(result.array).toEqual([42]);
  });
});
