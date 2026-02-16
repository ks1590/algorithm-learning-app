import { SearchVisualizer } from '@/components/SearchVisualizer';

export function SearchPage() {
  return (
    <div className="mx-auto space-y-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">探索アルゴリズム</h1>
      <SearchVisualizer />
    </div>
  );
}
