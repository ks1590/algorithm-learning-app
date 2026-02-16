
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { AppColors } from '@/utils/theme';
import { NeoPopCard } from '@/components/ui/NeoPopCard';

export const MathPage: React.FC = () => {
  const navigate = useNavigate();

  const mathAlgorithms = [
    {
      id: 'binary-float',
      title: 'Binary Float',
      description: '浮動小数点数の仕組みを可視化する',
      icon: Hash,
      path: '/binary-floating-point', // Keeping the original path as requested, or should it be /math/binary-floating-point? Plan said flat is easier.
      color: AppColors.muted,
      accent: 'shadow-[8px_8px_0_0_#8E9DFF]',
      bg: 'bg-white bg-[linear-gradient(to_right,#8E9DFF_1px,transparent_1px),linear-gradient(to_bottom,#8E9DFF_1px,transparent_1px)] [background-size:20px_20px]'
    }
    // Future algorithms will be added here
  ];

  return (
    <div className="mx-auto py-8 space-y-8 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Math Algorithms
        </h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          数学的なアルゴリズムを視覚的に学ぼう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {mathAlgorithms.map((algo) => (
          <NeoPopCard
            key={algo.id}
            title={algo.title}
            description={algo.description}
            icon={algo.icon}
            onClick={() => navigate(algo.path)}
            color={algo.color}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};
