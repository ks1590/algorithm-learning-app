import type { AlgorithmStep } from '../../types';

export function* insertionSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  const len = array.length;
  // In insertion sort, the subarray array[0...i-1] is always sorted.
  // Initially array[0] is sorted.


  for (let i = 1; i < len; i++) {
    let j = i;
    
    yield {
        array: [...array],
        comparing: [j, j - 1],
        swapping: false,
        sortedIndices: Array.from({length: i}, (_, k) => k) // 0 to i-1 are sorted relative to each other
    };

    while (j > 0 && array[j] < array[j - 1]) {
      yield {
        array: [...array],
        comparing: [j, j - 1],
        swapping: false,
        sortedIndices: Array.from({length: i}, (_, k) => k)
      };

      [array[j], array[j - 1]] = [array[j - 1], array[j]];
      
      yield {
        array: [...array],
        comparing: [j, j - 1],
        swapping: true,
        sortedIndices: Array.from({length: i}, (_, k) => k)
      };
      
      j--;
    }
    // Now 0 to i is relatively sorted
  }

  // Final yield
  yield {
      array: [...array],
      comparing: [-1, -1],
      swapping: false,
      sortedIndices: Array.from({length: len}, (_, i) => i)
  };
}
