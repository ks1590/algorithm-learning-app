import { Binary, Percent, Hash } from 'lucide-react';

import { AppColors } from '@/utils/theme';

export const MATH_ALGORITHMS = [
  {
    id: 'binary-floating-point',
    title: 'Floating Point',
    description: '浮動小数点数 (IEEE 754)',
    icon: Percent,
    path: '/binary-floating-point',
    color: AppColors.secondary,
  },
  {
    id: 'factorial',
    title: 'Factorial',
    description: '階乗の計算プロセスと再帰的アプローチを学ぶ',
    icon: Hash,
    path: '/factorial',
    color: AppColors.muted,
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'ビット演算の仕組みを直感的に学ぶ',
    icon: Binary,
    path: '/bit-manipulation',
    color: '#10b981', // emerald-500
    accent: 'shadow-[8px_8px_0_0_#10b981]',
    bg: 'bg-white bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] [background-size:20px_20px]',
  },
];
