import { BarChart3, FileText, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import MetricsCard from './MetricsCard';

interface DashboardViewProps {
  setCurrentPage: (page: string) => void;
}

const DashboardView = ({ setCurrentPage }: DashboardViewProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor your land registry activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Parcels"
          value="1,247"
          icon={MapPin}
          trend="+12.5%"
          trendUp={true}
        />
        <MetricsCard
          title="Transactions"
          value="3,891"
          icon={TrendingUp}
          trend="+8.2%"
          trendUp={true}
        />
        <MetricsCard
          title="Your Parcels"
          value="5"
          icon={FileText}
          trend="+2"
          trendUp={true}
        />
        <MetricsCard
          title="Total Value"
          value="$892K"
          icon={BarChart3}
          trend="+15.3%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium text-sm text-foreground">Land Parcel #{1000 + item}</p>
                  <p className="text-xs text-muted-foreground">Registered 2 days ago</p>
                </div>
                <span className="text-xs font-semibold text-accent">Active</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentPage('registry')}
              className="w-full p-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-smooth shadow-md"
            >
              Register New Land
            </button>
            <button className="w-full p-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-smooth">
              View All Parcels
            </button>
            <button className="w-full p-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-smooth">
              Transfer Ownership
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
