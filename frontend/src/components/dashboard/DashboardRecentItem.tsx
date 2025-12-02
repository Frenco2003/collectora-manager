import type { RecentItem } from "../../types/dashboardTypes";
import RecentItemCard from "./DashboardRecentItemCard";

type RecentItemsProps = {
  recentItems: RecentItem[];
};

const RecentItems = ({ recentItems }: RecentItemsProps) => {
  return (
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
            <RecentItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              collectionName={item.collections?.name || null}
              marketValue={Number(item.current_market_value || 0)}
              condition={item.condition}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentItems;
