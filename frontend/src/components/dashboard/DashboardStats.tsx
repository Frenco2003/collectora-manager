import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import StatCard from './DashboardStatCard';

type StatsSummary = {
  totalItems: number;
  totalValue: number;
  totalCollections: number;
  valueChange: number;
};

type DashboardStatsProps = {
  stats: StatsSummary;
};

const DashboardStatsComponent = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      title: 'Oggetti Totali',
      value: stats.totalItems.toString(),
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
      value: stats.totalCollections.toString(),
      icon: Package,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Variazione Valore',
      value: `${stats.valueChange > 0 ? '+' : ''}${stats.valueChange}%`,
      icon: stats.valueChange >= 0 ? TrendingUp : TrendingDown,
      color: stats.valueChange >= 0
        ? 'from-green-500 to-emerald-600'
        : 'from-red-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statCards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default DashboardStatsComponent;
