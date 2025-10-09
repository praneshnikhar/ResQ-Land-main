import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendUp: boolean;
}

const MetricsCard = ({ title, value, icon: Icon, trend, trendUp }: MetricsCardProps) => {
  return (
    <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-accent' : 'text-destructive'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </Card>
  );
};

export default MetricsCard;
