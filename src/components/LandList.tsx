import { MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
}

interface LandListProps {
  parcels: LandParcel[];
  onSelectParcel: (parcel: LandParcel) => void;
  selectedParcel: LandParcel | null;
}

const LandList = ({ parcels, onSelectParcel, selectedParcel }: LandListProps) => {
  return (
    <Card className="p-6 shadow-corporate">
      <h3 className="text-xl font-semibold text-foreground mb-4">All Registered Parcels</h3>
      
      {parcels.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No parcels registered yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {parcels.map((parcel) => (
            <button
              key={parcel.id}
              onClick={() => onSelectParcel(parcel)}
              className={`w-full text-left p-4 rounded-lg transition-smooth border ${
                selectedParcel?.id === parcel.id
                  ? 'bg-accent/10 border-accent'
                  : 'bg-secondary hover:bg-secondary/80 border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-foreground">{parcel.landId}</span>
                <span className="text-xs text-accent font-medium">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{parcel.location}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="font-mono">
                    {parcel.coordinates.lat.toFixed(4)}, {parcel.coordinates.lng.toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(parcel.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default LandList;
