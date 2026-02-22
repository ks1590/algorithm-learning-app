export type SearchStep = {
  currentIndex: number;
  found: boolean;
  done: boolean;
};

export function* linearSearch(array: number[], target: number): Generator<SearchStep> {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      yield { currentIndex: i, found: true, done: true };
      return;
    }
    yield { currentIndex: i, found: false, done: false };
  }
  yield { currentIndex: -1, found: false, done: true };
}
