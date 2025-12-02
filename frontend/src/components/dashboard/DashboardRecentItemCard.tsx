type RecentItemCardProps = {
  id: string;
  name: string;
  collectionName: string | null;
  marketValue: number;
  condition: string;
};

const RecentItemCard = ({
  id,
  name,
  collectionName,
  marketValue,
  condition,
}: RecentItemCardProps) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between p-6 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
          {name[0]}
        </div>
        <div>
          <p className="text-white font-medium text-lg">{name}</p>
          <p className="text-sm text-gray-400">{collectionName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold text-lg">€{marketValue.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{condition}</p>
      </div>
    </div>
  );
};

export default RecentItemCard;
