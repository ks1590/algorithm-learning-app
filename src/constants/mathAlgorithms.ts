import { Hash, Binary } from 'lucide-react';

import { AppColors } from '@/utils/theme';

export const MATH_ALGORITHMS = [
  {
    id: 'binary-float',
    title: 'Binary Float',
    description: '浮動小数点数の仕組みを可視化する',
    icon: Hash,
    path: '/binary-floating-point',
    color: AppColors.muted,
    accent: 'shadow-[8px_8px_0_0_#8E9DFF]',
    bg: 'bg-white bg-[linear-gradient(to_right,#8E9DFF_1px,transparent_1px),linear-gradient(to_bottom,#8E9DFF_1px,transparent_1px)] [background-size:20px_20px]',
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
