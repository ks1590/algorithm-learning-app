import { Hash } from 'lucide-react';

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
  // Future algorithms will be added here
];
