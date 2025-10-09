import { MapPin, Navigation } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
}

interface MapSimulatorProps {
  selectedParcel: LandParcel | null;
}

const MapSimulator = ({ selectedParcel }: MapSimulatorProps) => {
  return (
    <Card className="p-6 shadow-corporate">
      <h3 className="text-xl font-semibold text-foreground mb-4">Map View</h3>
      
      <div className="relative bg-gradient-to-br from-accent/5 via-secondary to-accent/5 rounded-lg h-64 flex items-center justify-center overflow-hidden border border-border">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-accent" />
            ))}
          </div>
        </div>

        {/* Map content */}
        {selectedParcel ? (
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-accent-foreground animate-bounce" />
            </div>
            <div className="bg-card/95 backdrop-blur-sm px-6 py-4 rounded-lg shadow-corporate">
              <h4 className="font-bold text-foreground mb-2">{selectedParcel.landId}</h4>
              <p className="text-sm text-muted-foreground mb-1">{selectedParcel.location}</p>
              <p className="text-xs font-mono text-accent">
                {selectedParcel.coordinates.lat.toFixed(6)}, {selectedParcel.coordinates.lng.toFixed(6)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center z-10">
            <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Select a parcel to view on map</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapSimulator;
