import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import { supabase } from '../lib/subabase';

interface Item {
  id: string;
  name: string;
  current_market_value: string;
  quantity: number;
  condition: string;
  collections?: { name: string };
}

interface Stats {
  totalItems: number;
  totalValue: number;
  totalCollections: number;
  valueChange: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalItems: 0,
    totalValue: 0,
    totalCollections: 0,
    valueChange: 0,
  });
  const [recentItems, setRecentItems] = useState<Item[]>([]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const { data: collections, error: collectionsError } = await supabase
        .from('collections')
        .select('id')
        .eq('user_email', user.email);

      if (collectionsError) {
        console.error('Errore nel recuperare le collezioni:', collectionsError);
        return;
      }

      const collectionIds = collections?.map((c) => c.id) || [];

      if (collectionIds.length > 0) {
        const { data: items, error: itemsError } = await supabase
          .from('items')
          .select('*, collections(name)')
          .in('collection_id', collectionIds)
          .order('created_at', { ascending: false })
          .limit(5);

        if (itemsError) {
          console.error('Errore nel recuperare gli oggetti:', itemsError);
          return;
        }

        const totalValue =
          items?.reduce(
            (sum, item) => sum + (Number(item.current_market_value) || 0),
            0,
          ) || 0;

        const totalQuantity =
          items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

        setStats({
          totalItems: totalQuantity,
          totalValue,
          totalCollections: collections?.length || 0,
          valueChange: 8.5,
        });

        setRecentItems(items || []);
      }
    } catch (error) {
      console.error('Errore nel caricare i dati:', error);
    }
  };

  const statCards = [
    {
      title: 'Oggetti Totali',
      value: stats.totalItems,
      icon: Package,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Valore Totale',
      value: `€${stats.totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Collezioni',
      value: stats.totalCollections,
      icon: Package,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Variazione Valore',
      value: `${stats.valueChange > 0 ? '+' : ''}${stats.valueChange}%`,
      icon: stats.valueChange >= 0 ? TrendingUp : TrendingDown,
      color:
        stats.valueChange >= 0
          ? 'from-green-500 to-emerald-600'
          : 'from-red-500 to-orange-600',
    },
  ];

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-lg text-gray-400">Panoramica delle tue collezioni</p>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={30} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Oggetti recenti */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Oggetti Recenti</h2>
        <div className="space-y-4">
          {recentItems.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              Nessun oggetto trovato. Inizia ad aggiungere oggetti alla tua
              collezione!
            </p>
          ) : (
            recentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-6 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {item.collections?.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">
                    €{Number(item.current_market_value || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">{item.condition}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
