import { bfs } from '@/algorithms/tree/bfs';
import { dfsInOrder, dfsPreOrder, dfsPostOrder } from '@/algorithms/tree/dfs';

export const TREE_ALGORITHMS = {
  bfs: {
    name: '幅優先探索 (BFS)',
    func: bfs,
    desc: '根ノードから始まり、近いノードから順にレベルごとに探索していくアルゴリズムです。',
    steps: [
      '根ノードをキューに入れます',
      'キューからノードを取り出し、訪問します',
      'そのノードの子ノードを左から順にキューに入れます',
      'キューが空になるまで繰り返します',
    ],
  },
  'dfs-inorder': {
    name: '深さ優先探索 (通りがけ順 / In-Order)',
    func: dfsInOrder,
    desc: '左部分木、根、右部分木の順に探索します。二分探索木では、値が昇順に訪問されます。',
    steps: ['左部分木を再帰的に探索します', '現在のノード（根）を訪問します', '右部分木を再帰的に探索します'],
  },
  'dfs-preorder': {
    name: '深さ優先探索 (行きがけ順 / Pre-Order)',
    func: dfsPreOrder,
    desc: '根、左部分木、右部分木の順に探索します。木のコピーなどに利用されます。',
    steps: ['現在のノード（根）を訪問します', '左部分木を再帰的に探索します', '右部分木を再帰的に探索します'],
  },
  'dfs-postorder': {
    name: '深さ優先探索 (帰りがけ順 / Post-Order)',
    func: dfsPostOrder,
    desc: '左部分木、右部分木、根の順に探索します。葉から順に処理する場合などに利用されます。',
    steps: ['左部分木を再帰的に探索します', '右部分木を再帰的に探索します', '現在のノード（根）を訪問します'],
  },
};

export type TreeAlgorithmKey = keyof typeof TREE_ALGORITHMS;
