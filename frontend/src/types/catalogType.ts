// src/types/catalog.ts
export interface CatalogItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  rarity: string | null;
  condition: string;
  current_market_value: number | null;
  quantity: number;
  collections: { name: string } | null;
}

// Grezzo per la DASHBOARD
export interface RawDashboardItem {
  id: string;
  name: string;
  current_market_value: number | null;
  quantity: number | null;
  condition: string;
  collections: { name: string }[] | { name: string } | null;
}

// Grezzo per il CATALOGO (ha anche description, category, rarity)
export interface RawCatalogItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  rarity: string | null;
  condition: string;
  current_market_value: number | null;
  quantity: number | null;
  collections: { name: string }[] | { name: string } | null;
}
