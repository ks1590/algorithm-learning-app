import { ArrowUpDown, Network, Search, ArrowRight, Hash, HelpCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { JaggedCardTitle } from '@/components/ui/JaggedCardTitle';
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
      bg: 'bg-white bg-[linear-gradient(to_right,#FF66C4_1px,transparent_1px),linear-gradient(to_bottom,#FF66C4_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'tree',
      title: 'Tree',
      description: '木構造の操作と探索を体験する',
      icon: Network,
      path: '/tree',
      color: AppColors.accent,
      accent: 'shadow-[8px_8px_0_0_#3DCCC7]',
      bg: 'bg-white bg-[linear-gradient(to_right,#3DCCC7_1px,transparent_1px),linear-gradient(to_bottom,#3DCCC7_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'search',
      title: 'Search',
      description: '探索アルゴリズムの仕組みを理解する',
      icon: Search,
      path: '/search',
      color: AppColors.secondary,
      accent: 'shadow-[8px_8px_0_0_#FFD23F]',
      bg: 'bg-white bg-[linear-gradient(to_right,#FFD23F_1px,transparent_1px),linear-gradient(to_bottom,#FFD23F_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'math',
      title: 'Math',
      description: '数学的なアルゴリズムを学ぶ',
      icon: Hash,
      path: '/math',
      color: AppColors.muted,
      accent: 'shadow-[8px_8px_0_0_#8E9DFF]',
      bg: 'bg-white bg-[linear-gradient(to_right,#8E9DFF_1px,transparent_1px),linear-gradient(to_bottom,#8E9DFF_1px,transparent_1px)] [background-size:20px_20px]',
    },
    // プレースホルダーのカード
    {
      id: 'coming-soon-1',
      title: 'Coming Soon',
      description: '新しいコンテンツを準備中です',
      icon: HelpCircle,
      path: '#',
      color: '#E0E0E0',
      accent: 'shadow-[8px_8px_0_0_#A0A0A0]',
      bg: 'bg-white bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'coming-soon-2',
      title: 'Coming Soon',
      description: '新しいコンテンツを準備中です',
      icon: HelpCircle,
      path: '#',
      color: '#E0E0E0',
      accent: 'shadow-[8px_8px_0_0_#A0A0A0]',
      bg: 'bg-white bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'coming-soon-3',
      title: 'Coming Soon',
      description: '新しいコンテンツを準備中です',
      icon: HelpCircle,
      path: '#',
      color: '#E0E0E0',
      accent: 'shadow-[8px_8px_0_0_#A0A0A0]',
      bg: 'bg-white bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'coming-soon-4',
      title: 'Coming Soon',
      description: '新しいコンテンツを準備中です',
      icon: HelpCircle,
      path: '#',
      color: '#E0E0E0',
      accent: 'shadow-[8px_8px_0_0_#A0A0A0]',
      bg: 'bg-white bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] [background-size:20px_20px]',
    },
    {
      id: 'coming-soon-5',
      title: 'Coming Soon',
      description: '新しいコンテンツを準備中です',
      icon: HelpCircle,
      path: '#',
      color: '#E0E0E0',
      accent: 'shadow-[8px_8px_0_0_#A0A0A0]',
      bg: 'bg-white bg-[linear-gradient(to_right,#E0E0E0_1px,transparent_1px),linear-gradient(to_bottom,#E0E0E0_1px,transparent_1px)] [background-size:20px_20px]',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[64vh] w-full pb-16">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Choose Your Algorithm</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
          視覚的なアニメーションで、アルゴリズムの動作原理を直感的に理解しよう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1400px] px-4">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            onClick={() => algo.path !== '#' && navigate(algo.path)}
            className={`group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${algo.path === '#' ? 'opacity-70 pointer-events-none' : ''}`}
          >
            <Card
              className={`h-full border-4 border-black rounded-3xl ${algo.accent} transition-all duration-300 group-hover:shadow-[12px_12px_0_0_#000] overflow-hidden flex flex-col p-0 gap-0`}
            >
              <CardHeader className={`${algo.bg} border-b-4 border-black p-8 text-center`}>
                <div
                  className="mx-auto w-24 h-24 rounded-full border-4 border-black flex items-center justify-center mb-6 bg-white shadow-[4px_4px_0_0_#000] transition-transform duration-300 group-hover:rotate-12"
                  style={{ backgroundColor: algo.color }}
                >
                  <algo.icon className="w-12 h-12 text-black" strokeWidth={2.5} />
                </div>
                <JaggedCardTitle className=" text-3xl transform rotate-[-2deg] group-hover:rotate-[2deg] transition-all duration-300">
                  {algo.title}
                </JaggedCardTitle>
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
