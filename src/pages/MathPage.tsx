import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NeoPopCard } from '@/components/ui/NeoPopCard';
import { MATH_ALGORITHMS } from '@/constants/mathAlgorithms';

export const MathPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto py-8 space-y-8 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Math Algorithms</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          数学的なアルゴリズムを視覚的に学ぼう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {MATH_ALGORITHMS.map((algo) => (
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
