// src/pages/Catalog.tsx
import { useMemo, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { CatalogHeader } from '../components/catalog/CatalogHeader';
import { CatalogToolbar } from '../components/catalog/CatalogToolbar';
import { CatalogGrid } from '../components/catalog/CatalogGrid';
import { AddItemModal } from '../components/catalog/AddItemModal';
import { useCatalogItems } from '../hook/useCatalogItems';

export function Catalog() {
  const { user } = useAuth();

  // Ottieni gli oggetti e lo stato di caricamento tramite il nostro custom hook
  const { items, loading } = useCatalogItems(user);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Memorizziamo le categorie disponibili, escludendo i duplicati
  const categories = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((i) => {
      if (i.category) unique.add(i.category);
    });
    return ['all', ...Array.from(unique)];
  }, [items]);

  // Filtro degli oggetti in base alla ricerca e alla categoria selezionata
  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [items, searchTerm, selectedCategory]
  );

  return (
    <div className="space-y-8 w-full">
      {/* Header con il tasto per aggiungere oggetti */}
      <CatalogHeader onAddClick={() => setShowAddModal(true)} />

      {/* Barra di ricerca e filtro */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <CatalogToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />

        {/* Griglia degli oggetti filtrati */}
        <CatalogGrid
          loading={loading}
          items={filteredItems}
        />
      </div>

      {/* Modale per aggiungere un nuovo oggetto */}
      <AddItemModal
              open={showAddModal}
              onClose={() => setShowAddModal(false)} onSuccess={function (): void {
                  throw new Error('Function not implemented.');
              } }      />
    </div>
  );
}
