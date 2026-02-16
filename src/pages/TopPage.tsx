import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, Network, Search, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AppColors } from '@/utils/theme';

export const TopPage: React.FC = () => {
  const navigate = useNavigate();

  const algorithms = [
    {
      id: 'sorting',
      title: 'Sorting',
      description: '並べ替えアルゴリズムを視覚的に学ぶ',
      icon: ArrowUpDown,
      path: '/sorting',
      color: AppColors.primary,
      accent: 'shadow-[8px_8px_0_0_#FF66C4]',
      bg: 'bg-white'
    },
    {
      id: 'tree',
      title: 'Tree',
      description: '木構造の操作と探索を体験する',
      icon: Network,
      path: '/tree',
      color: AppColors.accent,
      accent: 'shadow-[8px_8px_0_0_#3DCCC7]',
      bg: 'bg-white'
    },
    {
      id: 'search',
      title: 'Search',
      description: '探索アルゴリズムの仕組みを理解する',
      icon: Search,
      path: '/search',
      color: AppColors.secondary,
      accent: 'shadow-[8px_8px_0_0_#FFD23F]',
      bg: 'bg-white'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[64vh] w-full">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Choose Your Algorithm
        </h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          視覚的なアニメーションで、アルゴリズムの動作原理を直感的に理解しよう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            onClick={() => navigate(algo.path)}
            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <Card className={`h-full border-4 border-black rounded-3xl ${algo.accent} transition-all duration-300 group-hover:shadow-[12px_12px_0_0_#000] overflow-hidden flex flex-col`}>
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
