// src/components/catalog/CatalogHeader.tsx
import { Plus } from 'lucide-react';

interface CatalogHeaderProps {
  onAddClick: () => void;
}

export function CatalogHeader({ onAddClick }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Catalogo</h1>
        <p className="text-lg text-gray-400">
          Gestisci e cerca tra tutti gli oggetti delle tue collezioni
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/50"
      >
        <Plus size={20} />
        <span>Aggiungi Oggetto</span>
      </button>
    </div>
  );
}
