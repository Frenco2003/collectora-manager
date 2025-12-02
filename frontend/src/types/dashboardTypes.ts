
export interface DashboardStats {
  totalItems: number;
  totalValue: number;
  totalCollections: number;
  valueChange: number;
}

export interface RecentItem {
  id: string;
  name: string;
  current_market_value: number | null;
  quantity: number;
  condition: string;
  collections: { name: string } | null;
}
