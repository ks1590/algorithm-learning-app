import { type AlgorithmStep } from '@/algorithms/types';

/**
 * 渡されたソートアルゴリズムのジェネレータを最後まで実行し、最終状態を返すヘルパー関数
 */
export function runSortToCompletion(generator: Generator<AlgorithmStep>): AlgorithmStep {
  let lastStep: AlgorithmStep | undefined;
  let step = generator.next();

  while (!step.done) {
    lastStep = step.value;
    step = generator.next();
  }

  // 終了時に何も返さないジェネレータの場合、最後にyieldされた値を返す
  if (step.value !== undefined) {
    return step.value as AlgorithmStep;
  }

  if (!lastStep) {
    throw new Error('ジェネレータから何もyieldされませんでした');
  }

  return lastStep;
}
