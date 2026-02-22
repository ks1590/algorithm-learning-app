import type { AlgorithmStep } from '../../types';

export function* mergeSort(originalArray: number[]): Generator<AlgorithmStep> {
  const array = [...originalArray];
  yield* mergeSortRec(array, 0, array.length - 1);

  // 最終的なソート済み状態
  yield {
    array: [...array],
    comparing: [-1, -1],
    swapping: false,
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
  };
}

function* mergeSortRec(array: number[], left: number, right: number): Generator<AlgorithmStep> {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);

  yield* mergeSortRec(array, left, mid);
  yield* mergeSortRec(array, mid + 1, right);

  yield* merge(array, left, mid, right);
}

function* merge(array: number[], left: number, mid: number, right: number): Generator<AlgorithmStep> {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = Array.from({ length: n1 }) as number[];
  const R = Array.from({ length: n2 }) as number[];

  for (let i = 0; i < n1; i++) L[i] = array[left + i];
  for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

  let i = 0,
    j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    // 比較をyieldする
    yield {
      array: [...array],
      comparing: [left + i, mid + 1 + j], // 注意：これはソート済み部分配列内のインデックスとしての近似値です
      swapping: false,
      sortedIndices: [],
    };

    if (L[i] <= R[j]) {
      array[k] = L[i];
      i++;
    } else {
      array[k] = R[j];
      j++;
    }

    // 代入をyieldする
    yield {
      array: [...array],
      comparing: [k, k],
      swapping: true,
      sortedIndices: [],
    };
    k++;
  }

  while (i < n1) {
    array[k] = L[i];
    yield {
      array: [...array],
      comparing: [k, k],
      swapping: true,
      sortedIndices: [],
    };
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = R[j];
    yield {
      array: [...array],
      comparing: [k, k],
      swapping: true,
      sortedIndices: [],
    };
    j++;
    k++;
  }
}
