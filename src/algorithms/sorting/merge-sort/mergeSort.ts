import type { AlgorithmStep } from '../../types';

export function* mergeSort(originalArray: number[]): Generator<AlgorithmStep> {
    const array = [...originalArray];
    yield* mergeSortRec(array, 0, array.length - 1);
    
    // Final sorted state
    yield {
        array: [...array],
        comparing: [-1, -1],
        swapping: false,
        sortedIndices: Array.from({length: array.length}, (_, i) => i)
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
    
    const L = new Array(n1);
    const R = new Array(n2);
    
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];
    
    let i = 0, j = 0;
    let k = left;
    
    while (i < n1 && j < n2) {
        // Yield comparison
        yield {
            array: [...array],
            comparing: [left + i, mid + 1 + j], // Note: this is approximation as index in sorted subarray
            swapping: false,
            sortedIndices: [] 
        };
        
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        
        // Yield assignment
        yield {
            array: [...array],
            comparing: [k, k], 
            swapping: true,
            sortedIndices: []
        };
        k++;
    }
    
    while (i < n1) {
        array[k] = L[i];
        yield {
            array: [...array],
            comparing: [k, k],
            swapping: true,
            sortedIndices: []
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
            sortedIndices: []
        };
        j++;
        k++;
    }
}
