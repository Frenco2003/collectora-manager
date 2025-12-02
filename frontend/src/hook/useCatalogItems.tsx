// src/hook/useCatalogItems.ts
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/subabase';
import type { CatalogItem, RawCatalogItem } from '../types/catalogType';

interface SimpleUser {
  email: string;
}

export function useCatalogItems(user: SimpleUser | null) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data: collections, error: collectionsError } = await supabase
        .from('collections')
        .select('id')
        .eq('user_email', user.email);

      if (collectionsError) {
        console.error('Errore nel recuperare le collezioni:', collectionsError);
        return;
      }

      const collectionIds = collections?.map((c) => c.id) ?? [];
      if (collectionIds.length === 0) {
        setItems([]);
        return;
      }

      const { data: itemsData, error: itemsError } = await supabase
        .from('items')
        .select(
          'id,name,description,category,rarity,condition,current_market_value,quantity,collections(name)'
        )
        .in('collection_id', collectionIds)
        .order('created_at', { ascending: false });

      if (itemsError) {
        console.error('Errore nel recuperare gli oggetti:', itemsError);
        return;
      }

      const normalizedItems: CatalogItem[] = (itemsData ?? []).map(
        (item: RawCatalogItem) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          rarity: item.rarity,
          condition: item.condition,
          current_market_value: item.current_market_value,
          quantity: item.quantity ?? 0,
          collections: Array.isArray(item.collections)
            ? item.collections[0] ?? null
            : item.collections ?? null,
        })
      );

      setItems(normalizedItems);
    } catch (err: unknown) {
      console.error('Errore nel caricamento del catalogo:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      void loadItems();
    }
  }, [user, loadItems]);

  return {
    items,
    loading,
    reload: loadItems,
  };
}
