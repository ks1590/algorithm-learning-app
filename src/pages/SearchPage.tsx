import { SearchVisualizer } from '@/components/SearchVisualizer';

export function SearchPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">探索アルゴリズム</h1>
      <SearchVisualizer />
    </div>
  );
}
