import { useEffect, useState } from 'react';
import { BarChart3, FileText, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricsCard from './MetricsCard';

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
}

interface DashboardViewProps {
  setCurrentPage: (page: string) => void;
}

const DashboardView = ({ setCurrentPage }: DashboardViewProps) => {
  const [recentParcels, setRecentParcels] = useState<LandParcel[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('landParcels');
    const parcels: LandParcel[] = saved ? JSON.parse(saved) : [];
    // Get the 3 most recent parcels
    setRecentParcels(parcels.slice(-3).reverse());
    
  }, []);

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
            {recentParcels.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No recent registrations</p>
              </div>
            ) : (
              recentParcels.map((parcel) => (
                <div key={parcel.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-foreground">{parcel.landId}</p>
                    <p className="text-xs text-muted-foreground">{parcel.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(parcel.timestamp).toLocaleDateString()} at {new Date(parcel.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-accent">Active</span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={() => setCurrentPage('registry')}
              className="w-full p-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-smooth shadow-md h-auto"
            >
              Register New Land
            </Button>
            <Button 
              onClick={() => setCurrentPage('registry')}
              variant="secondary"
              className="w-full p-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-smooth h-auto"
            >
              View All Parcels
            </Button>
            <Button 
              onClick={() => setCurrentPage('transfer')}
              variant="secondary"
              className="w-full p-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-semibold transition-smooth h-auto"
            >
              Transfer Ownership
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
