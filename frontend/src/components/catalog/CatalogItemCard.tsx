// src/components/catalog/CatalogItemCard.tsx
import { Package, Star } from 'lucide-react';
import type { CatalogItem } from '../../types/catalogType';

interface CatalogItemCardProps {
  item: CatalogItem;
}

export function CatalogItemCard({ item }: CatalogItemCardProps) {
  return (
    <div className="bg-gray-700/40 rounded-xl p-5 border border-gray-600 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer group flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {item.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-white font-semibold truncate group-hover:text-cyan-400">
              {item.name}
            </p>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {item.collections?.name ?? 'Senza collezione'}
            </span>
          </div>
          {item.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mt-2">
        <div className="flex items-center gap-2 text-gray-300">
          <Package size={16} />
          <span>Qt: {item.quantity ?? 0}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Star size={16} />
          <span>{item.condition ?? 'N/D'}</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Valore stimato</p>
          <p className="text-lg font-semibold text-white">
            €{Number(item.current_market_value || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {item.rarity && (
        <div className="mt-1">
          <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full">
            {item.rarity}
          </span>
        </div>
      )}
    </div>
  );
}
