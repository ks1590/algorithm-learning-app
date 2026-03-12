import { Type } from 'lucide-react';

import { AppColors } from '@/utils/theme';

export const STRING_ALGORITHMS = [
  {
    id: 'hamming-distance',
    title: 'Hamming Distance',
    description: '二つの文字列間の距離（異なる文字の数）を計算する',
    path: '/string/hamming-distance',
    icon: Type,
    color: AppColors.destructive,
  },
  {
    id: 'palindrome',
    title: 'Palindrome',
    description: '文字列が前から読んでも後ろから読んでも同じ（回文）かを判定する',
    path: '/string/palindrome',
    icon: Type,
    color: AppColors.primary,
  },
];
