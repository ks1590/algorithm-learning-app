import type { AlgorithmStep } from '../../types';

export function* bubbleSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  const len = array.length;
  let swapped;
  const sortedIndices: number[] = [];

  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: false,
        sortedIndices: [...sortedIndices]
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        yield {
          array: [...array],
          comparing: [j, j + 1],
          swapping: true,
          sortedIndices: [...sortedIndices]
        };
      }
    }
    
    sortedIndices.push(len - 1 - i);
    
    if (!swapped) {
        // If no swaps were made, the array is sorted.
        // Add all remaining unsorted indices to sortedIndices
        for (let k = 0; k < len - i - 1; k++) {
            if (!sortedIndices.includes(k)) {
                sortedIndices.push(k);
            }
        }
        break;
    }
  }
  
  // Final yield with all sorted
  yield {
      array: [...array],
      comparing: [-1, -1],
      swapping: false,
      sortedIndices: Array.from({length: len}, (_, i) => i)
  };
}
