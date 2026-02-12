// import { useState } from "react";
// import { MapPin, Loader2, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import LandList from "./LandList";
// import MapSimulator from "./MapSimulator";
// import DocumentUpload from "./DocumentUpload";
// import MapDraw from "@/components/MapDraw";
// import * as turf from "@turf/turf";

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

// interface RegistryViewProps {
//   walletAddress: string | null;
//   registerLand: (
//     landId: string,
//     owner: string,
//     location: string,
//     coordinates: { lat: number; lng: number },
//     documentUrl?: string,
//     polygonCoords?: [number, number][]
//   ) => Promise<{ success?: boolean; txHash?: string }>;
// }

// const RegistryView = ({ walletAddress, registerLand }: RegistryViewProps) => {
//   const [landId, setLandId] = useState("");
//   const [owner, setOwner] = useState(walletAddress || "");
//   const [location, setLocation] = useState("");
//   const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
//   const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
//   const [documentUrl, setDocumentUrl] = useState<string | null>(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   const [parcels, setParcels] = useState<LandParcel[]>(() => {
//     const saved = localStorage.getItem("landParcels");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 🔥 Convert coords to GeoJSON polygon
//   const convertToGeoJSON = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     return turf.polygon([geoCoords]);
//   };

//   // 🔥 Overlap Detection
//   const isPolygonOverlapping = (
//     newCoords: [number, number][],
//     existingParcels: LandParcel[]
//   ) => {
//     const newPolygon = convertToGeoJSON(newCoords);

//     for (let parcel of existingParcels) {
//       if (!parcel.polygonCoords || parcel.polygonCoords.length < 3) continue;
//       const existingPolygon = convertToGeoJSON(parcel.polygonCoords);

//       if (turf.booleanIntersects(newPolygon, existingPolygon)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   // 📍 Fetch GPS Location
//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     setIsGettingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const coords = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         setCoordinates(coords);
//         setIsGettingLocation(false);
//         toast.success("Location fetched successfully!");
//       },
//       (error) => {
//         setIsGettingLocation(false);
//         toast.error(error.message);
//       },
//       { enableHighAccuracy: true }
//     );
//   };

//   // 🔥 Register Land
//   const handleRegister = async () => {
//     if (!landId || !owner || !location || (!coordinates && polygonCoords.length === 0)) {
//       toast.error("Fill all fields and provide location or draw boundary");
//       return;
//     }

//     setIsRegistering(true);

//     // ✅ Overlap Check
//     if (polygonCoords.length > 2) {
//       const overlapping = isPolygonOverlapping(polygonCoords, parcels);

//       if (overlapping) {
//         toast.error("This land overlaps with an existing parcel!");
//         setIsRegistering(false);
//         return;
//       }
//     }

//     try {
//       const result = await registerLand(
//         landId,
//         owner,
//         location,
//         coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         documentUrl || undefined,
//         polygonCoords.length > 0 ? polygonCoords : undefined
//       );

//       if (result?.txHash) {
//         toast.success(`Tx: ${result.txHash.slice(0, 10)}...`);
//       }

//       const newParcel: LandParcel = {
//         id: Date.now().toString(),
//         landId,
//         owner,
//         location,
//         coordinates: coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         polygonCoords,
//         documentUrl: documentUrl || "",
//         timestamp: new Date().toISOString(),
//       };

//       const updated = [...parcels, newParcel];
//       setParcels(updated);
//       localStorage.setItem("landParcels", JSON.stringify(updated));

//       // Reset
//       setLandId("");
//       setLocation("");
//       setCoordinates(null);
//       setPolygonCoords([]);
//       setDocumentUrl(null);

//       toast.success("🏡 Land registered!");
//     } catch (err) {
//       toast.error("Registration failed");
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-foreground mb-2">Land Registry</h2>
//         <p className="text-muted-foreground">
//           Register and manage land parcels securely on blockchain
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="p-6 shadow-corporate">
//           <h3 className="text-xl font-semibold mb-6">Register New Land</h3>

//           <div className="space-y-4">
//             <Input
//               value={landId}
//               onChange={(e) => setLandId(e.target.value)}
//               placeholder="Land ID"
//             />

//             <DocumentUpload
//               parcelId={landId || "temp"}
//               onUploadComplete={(url) => setDocumentUrl(url)}
//             />

//             <Input
//               value={owner}
//               onChange={(e) => setOwner(e.target.value)}
//               placeholder="Owner Address"
//             />

//             <Input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="Location Name"
//             />

//             <Button onClick={fetchCurrentLocation} variant="outline" className="w-full">
//               {isGettingLocation ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Fetching...
//                 </>
//               ) : (
//                 <>
//                   <MapPin className="mr-2 h-4 w-4" />
//                   Fetch Current Location
//                 </>
//               )}
//             </Button>

//             {/* ✅ Coordinates Display */}
//             {coordinates && (
//               <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
//                 <p className="text-sm font-semibold text-accent mb-1">
//                   Coordinates Captured:
//                 </p>
//                 <p className="text-xs">
//                   Latitude:{" "}
//                   <span className="font-mono">{coordinates.lat.toFixed(6)}</span>
//                 </p>
//                 <p className="text-xs">
//                   Longitude:{" "}
//                   <span className="font-mono">{coordinates.lng.toFixed(6)}</span>
//                 </p>
//               </div>
//             )}

//             <MapDraw
//               onShapeDrawn={(coords) => {
//                 setPolygonCoords(coords);
//                 toast.success("Boundary drawn!");
//               }}
//             />

//             <Button
//               onClick={handleRegister}
//               disabled={isRegistering}
//               className="w-full bg-accent text-accent-foreground"
//             >
//               {isRegistering ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Registering...
//                 </>
//               ) : (
//                 <>
//                   <Send className="mr-2 h-5 w-5" />
//                   Register
//                 </>
//               )}
//             </Button>
//           </div>
//         </Card>

//         <div className="space-y-6">
//           <LandList
//             parcels={parcels}
//             onSelectParcel={setSelectedParcel}
//             selectedParcel={selectedParcel}
//           />
//           <MapSimulator selectedParcel={selectedParcel} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistryView;


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
  const calculateArea = (coords: [number, number][]) => {
    const polygon = convertToGeoJSON(coords);
    return turf.area(polygon); // sq meters
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
