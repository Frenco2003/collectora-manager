type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}
        >
          <Icon className="text-white" size={30} />
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
