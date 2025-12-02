import { useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import type { DashboardStats, RecentItem } from '../types/dashboardTypes';
import { supabase } from '../lib/subabase';
import RecentItems from '../components/dashboard/DashboardRecentItem';
import DashboardStatsComponent from '../components/dashboard/DashboardStats';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    totalValue: 0,
    totalCollections: 0,
    valueChange: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/immutability
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

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-lg text-gray-400">Panoramica delle tue collezioni</p>
      </div>

      <DashboardStatsComponent stats={stats} />

      <RecentItems recentItems={recentItems} />
    </div>
  );
}
