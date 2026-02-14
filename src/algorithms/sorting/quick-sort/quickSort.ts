import type { AlgorithmStep } from '../../types';

export function* quickSort(originalArray: number[]): Generator<AlgorithmStep> {
    const array = [...originalArray];
    yield* quickSortRec(array, 0, array.length - 1);
    
     // Final sorted state
    yield {
        array: [...array],
        comparing: [-1, -1],
        swapping: false,
        sortedIndices: Array.from({length: array.length}, (_, i) => i)
    };
}

function* quickSortRec(array: number[], low: number, high: number): Generator<AlgorithmStep> {
    if (low < high) {
        const pi = yield* partition(array, low, high);
        
        yield* quickSortRec(array, low, pi - 1);
        yield* quickSortRec(array, pi + 1, high);
    }
}

function* partition(array: number[], low: number, high: number): Generator<AlgorithmStep, number, unknown> {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        yield {
            array: [...array],
            comparing: [j, high], // compare with pivot
            swapping: false,
            sortedIndices: []
        };
        
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
             yield {
                array: [...array],
                comparing: [i, j],
                swapping: true,
                sortedIndices: []
            };
        }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    yield {
        array: [...array],
        comparing: [i + 1, high],
        swapping: true,
        sortedIndices: []
    };
    
    return i + 1;
}
