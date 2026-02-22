import type { AlgorithmStep } from '../../types';

export function* selectionSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  const len = array.length;
  const sortedIndices: number[] = [];

  for (let i = 0; i < len; i++) {
    let minIdx = i;

    // Yield state: starting to find min for position i
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
        // Found new min
        yield {
          array: [...array],
          comparing: [minIdx, j], // Highlight new min
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

  // Final yield
  yield {
    array: [...array],
    comparing: [-1, -1],
    swapping: false,
    sortedIndices: Array.from({ length: len }, (_, i) => i),
  };
}
