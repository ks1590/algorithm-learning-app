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
];
