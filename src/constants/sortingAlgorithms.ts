import { bubbleSort } from '@/algorithms/sorting/bubble-sort/bubbleSort';
import { insertionSort } from '@/algorithms/sorting/insertion-sort/insertionSort';
import { mergeSort } from '@/algorithms/sorting/merge-sort/mergeSort';
import { quickSort } from '@/algorithms/sorting/quick-sort/quickSort';
import { selectionSort } from '@/algorithms/sorting/selection-sort/selectionSort';

export const ALGORITHMS = {
  bubble: {
    name: 'バブルソート (Bubble Sort)',
    func: bubbleSort,
    desc: '隣り合う要素を比較し、順序が逆であれば入れ替える単純なアルゴリズムです。',
    steps: [
      '隣り合う要素を比較します',
      '左の要素が右より大きければ交換します',
      'これを端まで繰り返すと、最大値が右端に確定します',
      '確定した部分を除いて、繰り返します',
    ],
  },
  selection: {
    name: '選択ソート (Selection Sort)',
    func: selectionSort,
    desc: '未ソート部分から最小値を見つけ、未ソート部分の先頭と交換するアルゴリズムです。',
    steps: [
      '未ソート部分から最小値を探します',
      '見つけた最小値を、未ソート部分の先頭と交換します',
      'ソート済み範囲を1つ広げます',
      '全てがソートされるまで繰り返します',
    ],
  },
  insertion: {
    name: '挿入ソート (Insertion Sort)',
    func: insertionSort,
    desc: '整列済みの部分列に、新しい要素を適切な位置に挿入していくアルゴリズムです。',
    steps: [
      '未ソート部分の先頭の要素を取り出します',
      'ソート済み部分の適切な位置にその要素を挿入します',
      'これを未ソート部分がなくなるまで繰り返します',
    ],
  },
  merge: {
    name: 'マージソート (Merge Sort)',
    func: mergeSort,
    desc: 'リストを分割し、整列しながら併合（マージ）する分割統治法のアルゴリズムです。',
    steps: [
      'リストを半分に分割し続けます（要素が1つになるまで）',
      '分割されたリストを、順序を整えながら併合（マージ）します',
      '全てが1つのリストにまとまるまで繰り返します',
    ],
  },
  quick: {
    name: 'クイックソート (Quick Sort)',
    func: quickSort,
    desc: 'ピボットを選び、ピボットより小さい要素と大きい要素に分割する分割統治法のアルゴリズムです。',
    steps: [
      '基準となる要素（ピボット）を1つ選びます',
      'ピボットより小さい値を左に、大きい値を右に移動します',
      '分割された左右のリストに対して、同様に繰り返します（再帰）',
    ],
  },
};

export type AlgorithmKey = keyof typeof ALGORITHMS;
