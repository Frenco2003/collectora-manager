// src/components/catalog/CatalogToolbar.tsx
import { Filter, Search } from 'lucide-react';

interface CatalogToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
}

export function CatalogToolbar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cerca oggetti..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Filtro categoria */}
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-400" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Tutte le categorie' : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
