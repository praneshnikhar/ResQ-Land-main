
import { useState } from "react";
import { MapPin, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import LandList from "./LandList";
import MapSimulator from "./MapSimulator";
import DocumentUpload from "./DocumentUpload";
import MapDraw from "@/components/MapDraw";
import * as turf from "@turf/turf";

interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  polygonCoords?: [number, number][];
  documentUrl?: string;
  timestamp: string;
}

// interface LandParcel {
//   id: string;
//   landId: string;
//   owner: string;
//   location: string;
//   coordinates: { lat: number; lng: number };
//   polygonCoords?: [number, number][];
//   documentUrl?: string;
//   timestamp: string;
// }

interface RegistryViewProps {
  walletAddress: string | null;
  registerLand: (
    landId: string,
    owner: string,
    location: string,
    coordinates: { lat: number; lng: number },
    documentUrl?: string,
    polygonCoords?: [number, number][]
  ) => Promise<{ success?: boolean; txHash?: string }>;
}

const RegistryView = ({ walletAddress, registerLand }: RegistryViewProps) => {
  const [landId, setLandId] = useState("");
  const [owner, setOwner] = useState(walletAddress || "");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [landArea, setLandArea] = useState<number | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

  const [parcels, setParcels] = useState<LandParcel[]>(() => {
    const saved = localStorage.getItem("landParcels");
    return saved ? JSON.parse(saved) : [];
  });

  // Convert Leaflet coords to GeoJSON
  const convertToGeoJSON = (coords: [number, number][]) => {
    const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
    geoCoords.push(geoCoords[0]);
    return turf.polygon([geoCoords]);
  };

  // Calculate Area
  // const calculateArea = (coords: [number, number][]) => {
  //   const polygon = convertToGeoJSON(coords);
  //   return turf.area(polygon); // sq meters
  // };
  const calculateArea = (coords: [number, number][]) => {
  const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
  geoCoords.push(geoCoords[0]);

  const polygon = turf.polygon([geoCoords]);
  const area = turf.area(polygon); // in square meters

  return area;
};


  // Overlap Detection
  const isPolygonOverlapping = (
    newCoords: [number, number][],
    existingParcels: LandParcel[]
  ) => {
    const newPolygon = convertToGeoJSON(newCoords);

    for (let parcel of existingParcels) {
      if (!parcel.polygonCoords || parcel.polygonCoords.length < 3) continue;

      const existingPolygon = convertToGeoJSON(parcel.polygonCoords);

      if (turf.booleanIntersects(newPolygon, existingPolygon)) {
        return true;
      }
    }
    return false;
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
        toast.success("Location fetched!");
      },
      (error) => {
        setIsGettingLocation(false);
        toast.error(error.message);
      }
    );
  };

  const handleRegister = async () => {
    if (!landId || !owner || !location || (!coordinates && polygonCoords.length === 0)) {
      toast.error("Fill all required fields");
      return;
    }

    setIsRegistering(true);

    if (polygonCoords.length > 2) {
      if (isPolygonOverlapping(polygonCoords, parcels)) {
        toast.error("⚠️ Overlapping land detected!");
        setIsRegistering(false);
        return;
      }
    }

    try {
      await registerLand(
        landId,
        owner,
        location,
        coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
        documentUrl || undefined,
        polygonCoords.length > 0 ? polygonCoords : undefined
      );

      const newParcel: LandParcel = {
        id: Date.now().toString(),
        landId,
        owner,
        location,
        coordinates: coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
        polygonCoords,
        documentUrl: documentUrl || "",
        timestamp: new Date().toISOString(),
      };

      const updated = [...parcels, newParcel];
      setParcels(updated);
      localStorage.setItem("landParcels", JSON.stringify(updated));

      setLandId("");
      setLocation("");
      setCoordinates(null);
      setPolygonCoords([]);
      setDocumentUrl(null);
      setLandArea(null);

      toast.success("Land registered successfully!");
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <Input value={landId} onChange={(e) => setLandId(e.target.value)} placeholder="Land ID" />
            <DocumentUpload parcelId={landId || "temp"} onUploadComplete={setDocumentUrl} />
            <Input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner Address" />
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location Name" />

            <Button onClick={fetchCurrentLocation} variant="outline" className="w-full">
              {isGettingLocation ? <Loader2 className="animate-spin" /> : <MapPin />}
              Fetch Location
            </Button>

            {coordinates && (
              <div className="p-3 bg-accent/10 rounded">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </div>
            )}

            <MapDraw
              onShapeDrawn={(coords) => {
                setPolygonCoords(coords);
                const area = calculateArea(coords);
                setLandArea(area);
                toast.success("Boundary drawn");
              }}
            />

            {landArea && (
              <div className="p-3 bg-secondary rounded">
                📐 Area: {(landArea / 10000).toFixed(2)} hectares
              </div>
            )}

            <Button onClick={handleRegister} disabled={isRegistering} className="w-full">
              {isRegistering ? <Loader2 className="animate-spin" /> : <Send />}
              Register
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <LandList parcels={parcels} onSelectParcel={setSelectedParcel} selectedParcel={selectedParcel} />
          <MapSimulator selectedParcel={selectedParcel} />
        </div>
      </div>
    </div>
  );
};

export default RegistryView;













