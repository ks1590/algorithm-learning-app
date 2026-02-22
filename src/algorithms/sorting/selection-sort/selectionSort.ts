import type { AlgorithmStep } from '../../types';

export function* selectionSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  const len = array.length;
  const sortedIndices: number[] = [];

  for (let i = 0; i < len; i++) {
    let minIdx = i;

    // 状態をyield: 位置iに対する最小値の探索を開始
    yield {
      array: [...array],
      comparing: [i, minIdx],
      swapping: false,
      sortedIndices: [...sortedIndices],
    };

    for (let j = i + 1; j < len; j++) {
      yield {
        array: [...array],
        comparing: [minIdx, j],
        swapping: false,
        sortedIndices: [...sortedIndices],
      };

      if (array[j] < array[minIdx]) {
        minIdx = j;
        // 新しい最小値を発見
        yield {
          array: [...array],
          comparing: [minIdx, j], // 新しい最小値をハイライト
          swapping: false,
          sortedIndices: [...sortedIndices],
        };
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield {
        array: [...array],
        comparing: [i, minIdx],
        swapping: true,
        sortedIndices: [...sortedIndices],
      };
    }

    sortedIndices.push(i);

    yield {
      array: [...array],
      comparing: [-1, -1],
      swapping: false,
      sortedIndices: [...sortedIndices],
    };
  }

  // 最終yield
  yield {
    array: [...array],
    comparing: [-1, -1],
    swapping: false,
    sortedIndices: Array.from({ length: len }, (_, i) => i),
  };
}
