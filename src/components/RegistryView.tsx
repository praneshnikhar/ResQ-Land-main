import { useState } from 'react';
import { MapPin, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import LandList from './LandList';
import MapSimulator from './MapSimulator';

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
}

interface RegistryViewProps {
  walletAddress: string | null;
  registerLand: (landId: string, owner: string, location: string, coordinates: { lat: number; lng: number }) => Promise<void>;
}

const RegistryView = ({ walletAddress, registerLand }: RegistryViewProps) => {
  const [landId, setLandId] = useState('');
  const [owner, setOwner] = useState(walletAddress || '');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

  const [parcels, setParcels] = useState<LandParcel[]>(() => {
    const saved = localStorage.getItem('landParcels');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCoordinates(coords);
        setIsGettingLocation(false);
        toast.success('Location fetched successfully!');
      },
      (error) => {
        setIsGettingLocation(false);
        toast.error(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleRegister = async () => {
    if (!landId || !owner || !location || !coordinates) {
      toast.error('Please fill all fields and fetch location');
      return;
    }

    setIsRegistering(true);
    
    try {
      await registerLand(landId, owner, location, coordinates);
      
      const newParcel: LandParcel = {
        id: Date.now().toString(),
        landId,
        owner,
        location,
        coordinates,
        timestamp: new Date().toISOString()
      };
      
      const updatedParcels = [...parcels, newParcel];
      setParcels(updatedParcels);
      localStorage.setItem('landParcels', JSON.stringify(updatedParcels));
      
      // Reset form
      setLandId('');
      setLocation('');
      setCoordinates(null);
      
      toast.success('Land registered successfully!');
    } catch (error) {
      toast.error('Failed to register land');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Land Registry</h2>
        <p className="text-muted-foreground">Register and manage land parcels on blockchain</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Panel */}
        <Card className="p-6 shadow-corporate">
          <h3 className="text-xl font-semibold text-foreground mb-6">Register New Land</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="landId">Land ID (Blockchain Key)</Label>
              <Input
                id="landId"
                value={landId}
                onChange={(e) => setLandId(e.target.value)}
                placeholder="e.g., LAND-0001"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="owner">Owner Address</Label>
              <Input
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="0x..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location Name</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Downtown District, Plot 42"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Geolocation Coordinates</Label>
              <Button
                onClick={fetchCurrentLocation}
                disabled={isGettingLocation}
                variant="outline"
                className="w-full mt-1 transition-smooth"
              >
                {isGettingLocation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Location...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Fetch Current Location
                  </>
                )}
              </Button>
              
              {coordinates && (
                <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-semibold text-accent mb-1">Coordinates Captured:</p>
                  <p className="text-xs text-foreground">
                    Latitude: <span className="font-mono">{coordinates.lat.toFixed(6)}</span>
                  </p>
                  <p className="text-xs text-foreground">
                    Longitude: <span className="font-mono">{coordinates.lng.toFixed(6)}</span>
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleRegister}
              disabled={isRegistering || !coordinates}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 transition-smooth shadow-md"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Registering on Chain...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Register on Chain
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Data Display Panel */}
        <div className="space-y-6">
          <LandList
            parcels={parcels}
            onSelectParcel={setSelectedParcel}
            selectedParcel={selectedParcel}
          />
          
          <MapSimulator selectedParcel={selectedParcel} />
        </div>
      </div>
    </div>
  );
};

export default RegistryView;
