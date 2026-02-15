export type BinarySearchStep = {
    left: number;
    right: number;
    mid: number;
    found: boolean;
    done: boolean;
};

export function* binarySearch(array: number[], target: number): Generator<BinarySearchStep> {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Yield current state before checking
        yield { left, right, mid, found: false, done: false };

        if (array[mid] === target) {
            yield { left, right, mid, found: true, done: true };
            return;
        }

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    yield { left, right, mid: -1, found: false, done: true };
}
