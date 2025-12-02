// src/pages/Collections.tsx
import { useState, useEffect } from 'react';
import { Plus, Package, Trash2 } from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import { supabase } from '../lib/subabase';
import { AddCollectionModal } from '../components/collection/CollectionAdd';

interface Collection {
  id: string;
  name: string;
  category: string;
  description: string | null;
  created_at: string;
  item_count?: number;
  total_value?: number;
}

export function Collections() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, [user]);

  const loadCollections = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: collectionsData } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.email)
        .order('created_at', { ascending: false });

      if (collectionsData) {
        const collectionsWithStats = await Promise.all(
          collectionsData.map(async (collection) => {
            const { data: items } = await supabase
              .from('items')
              .select('current_market_value, quantity')
              .eq('collection_id', collection.id);

            const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            const totalValue = items?.reduce(
              (sum, item) => sum + (Number(item.current_market_value) || 0) * item.quantity,
              0
            ) || 0;

            return {
              ...collection,
              item_count: itemCount,
              total_value: totalValue,
            };
          })
        );

        setCollections(collectionsWithStats);
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (collectionId: string, collectionName: string) => {
    if (!confirm(`Sei sicuro di voler eliminare la collezione "${collectionName}"? Tutti gli oggetti associati verranno eliminati.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId);

      if (error) throw error;

      loadCollections(); // Ricarica le collezioni dopo averle eliminate
    } catch (error: any) {
      alert('Errore durante l\'eliminazione: ' + error.message);
    }
  };

  const getCategoryIcon = (category: string) => {
    return <Package size={32} className="text-cyan-400" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      pokemon: 'from-yellow-500/20 to-red-500/20',
      magic: 'from-blue-500/20 to-purple-500/20',
      yugioh: 'from-purple-500/20 to-pink-500/20',
      action_figures: 'from-red-500/20 to-orange-500/20',
      coins: 'from-yellow-500/20 to-amber-500/20',
      stamps: 'from-green-500/20 to-teal-500/20',
      comics: 'from-blue-500/20 to-cyan-500/20',
      sports_cards: 'from-orange-500/20 to-red-500/20',
      other: 'from-gray-500/20 to-gray-400/20',
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Le Mie Collezioni</h1>
          <p className="text-gray-400">Gestisci e organizza le tue collezioni</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/50"
        >
          <Plus size={20} />
          <span>Nuova Collezione</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center">
          <p className="text-gray-400">Caricamento collezioni...</p>
        </div>
      ) : collections.length === 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center">
          <Package size={64} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Nessuna Collezione</h3>
          <p className="text-gray-400 mb-6">
            Crea la tua prima collezione per iniziare a gestire i tuoi oggetti
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/50"
          >
            <Plus size={20} />
            <span>Crea Prima Collezione</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all group cursor-pointer overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${getCategoryColor(collection.category)} flex items-center justify-center`}>
                {getCategoryIcon(collection.category)}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {collection.name}
                </h3>

                {collection.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Oggetti:</span>
                    <span className="text-white font-semibold">{collection.item_count || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Valore totale:</span>
                    <span className="text-cyan-400 font-semibold">
                      €{(collection.total_value || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(collection.id, collection.name)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/30"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm">Elimina</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCollectionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadCollections}
      />
    </div>
  );
}
