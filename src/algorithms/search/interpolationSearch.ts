export type InterpolationSearchStep = {
  low: number;
  high: number;
  pos: number;
  found: boolean;
  done: boolean;
};

export function* interpolationSearch(array: number[], target: number): Generator<InterpolationSearchStep> {
  let low = 0;
  let high = array.length - 1;

  while (low <= high && target >= array[low] && target <= array[high]) {
    // Avoid division by zero if array values are same
    if (low === high) {
      if (array[low] === target) {
        yield { low, high, pos: low, found: true, done: true };
        return;
      }
      yield { low, high, pos: low, found: false, done: true };
      return;
    }

    const pos = low + Math.floor(((high - low) / (array[high] - array[low])) * (target - array[low]));

    yield { low, high, pos, found: false, done: false };

    if (array[pos] === target) {
      yield { low, high, pos, found: true, done: true };
      return;
    }

    if (array[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  yield { low, high, pos: -1, found: false, done: true };
}
