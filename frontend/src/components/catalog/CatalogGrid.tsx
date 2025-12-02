// src/components/catalog/CatalogGrid.tsx
import type { CatalogItem } from '../../types/catalogType';
import { CatalogItemCard } from './CatalogItemCard';

interface CatalogGridProps {
  loading: boolean;
  items: CatalogItem[];
}

export function CatalogGrid({ loading, items }: CatalogGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          Nessun oggetto trovato. Inizia ad aggiungere oggetti alle tue collezioni!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((item) => (
        <CatalogItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
