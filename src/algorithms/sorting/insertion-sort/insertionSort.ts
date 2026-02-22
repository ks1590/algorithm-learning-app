import type { AlgorithmStep } from '../../types';

export function* insertionSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  const len = array.length;
  // 挿入ソートでは、部分配列 array[0...i-1] は常にソートされています。
  // 初期状態では array[0] のみがソート済みと見なされます。

  for (let i = 1; i < len; i++) {
    let j = i;

    yield {
      array: [...array],
      comparing: [j, j - 1],
      swapping: false,
      sortedIndices: Array.from({ length: i }, (_, k) => k), // 0 から i-1 までは互いに相対的にソート済み
    };

    while (j > 0 && array[j] < array[j - 1]) {
      yield {
        array: [...array],
        comparing: [j, j - 1],
        swapping: false,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
      };

      [array[j], array[j - 1]] = [array[j - 1], array[j]];

      yield {
        array: [...array],
        comparing: [j, j - 1],
        swapping: true,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
      };

      j--;
    }
    // これで 0 から i までが相対的にソートされました
  }

  // 最終yield
  yield {
    array: [...array],
    comparing: [-1, -1],
    swapping: false,
    sortedIndices: Array.from({ length: len }, (_, i) => i),
  };
}
