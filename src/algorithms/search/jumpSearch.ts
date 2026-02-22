export type JumpSearchStep = {
  index: number; // 現在チェックしているインデックス、またはジャンプの境界
  type: 'jump' | 'linear';
  found: boolean;
  done: boolean;
};

export function* jumpSearch(array: number[], target: number): Generator<JumpSearchStep> {
  const n = array.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  // ジャンプ処理
  while (array[Math.min(step, n) - 1] < target) {
    yield { index: Math.min(step, n) - 1, type: 'jump', found: false, done: false };
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      yield { index: -1, type: 'jump', found: false, done: true };
      return;
    }
  }

  // ブロック内の線形探索
  while (array[prev] < target) {
    yield { index: prev, type: 'linear', found: false, done: false };
    prev++;
    if (prev === Math.min(step, n)) {
      yield { index: -1, type: 'linear', found: false, done: true };
      return;
    }
  }

  if (array[prev] === target) {
    yield { index: prev, type: 'linear', found: true, done: true };
  } else {
    yield { index: prev, type: 'linear', found: false, done: true };
  }
}
