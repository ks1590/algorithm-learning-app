export type AlgorithmStep = {
  array: number[];
  comparing: [number, number]; // indices being compared
  swapping: boolean; // true if swap happened
  sortedIndices: number[]; // indices that are sorted
};

export type SortingAlgorithm = (array: number[]) => Generator<AlgorithmStep, void, unknown>;
