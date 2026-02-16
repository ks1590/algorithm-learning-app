
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AppColors } from '@/utils/theme';

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
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Math Algorithms
        </h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          数学的なアルゴリズムを視覚的に学ぼう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
        {mathAlgorithms.map((algo) => (
          <div
            key={algo.id}
            onClick={() => navigate(algo.path)}
            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <Card className={`h-full border-4 border-black rounded-3xl ${algo.accent} transition-all duration-300 group-hover:shadow-[12px_12px_0_0_#000] overflow-hidden flex flex-col p-0 gap-0`}>
              <CardHeader className={`${algo.bg} border-b-4 border-black p-8 text-center`}>
                <div 
                  className="mx-auto w-24 h-24 rounded-full border-4 border-black flex items-center justify-center mb-6 bg-white shadow-[4px_4px_0_0_#000] transition-transform duration-300 group-hover:rotate-12"
                  style={{ backgroundColor: algo.color }}
                >
                  <algo.icon className="w-12 h-12 text-black" strokeWidth={2.5} />
                </div>
                <CardTitle className="text-3xl font-black tracking-tight">{algo.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 bg-white flex-1 relative min-h-[180px]">
                <div className="h-full flex items-center justify-center pb-16">
                    <CardDescription className="text-lg font-bold text-foreground/80 leading-relaxed text-center">
                    {algo.description}
                    </CardDescription>
                </div>
                <div className="absolute bottom-6 right-6">
                   <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white transform transition-transform duration-300 group-hover:translate-x-2">
                        <ArrowRight className="w-6 h-6" />
                   </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
