
// import { useState } from "react";
// import { MapPin, Loader2, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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

// // interface LandParcel {
// //   id: string;
// //   landId: string;
// //   owner: string;
// //   location: string;
// //   coordinates: { lat: number; lng: number };
// //   polygonCoords?: [number, number][];
// //   documentUrl?: string;
// //   timestamp: string;
// // }

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
//   const [landArea, setLandArea] = useState<number | null>(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   const [parcels, setParcels] = useState<LandParcel[]>(() => {
//     const saved = localStorage.getItem("landParcels");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Convert Leaflet coords to GeoJSON
//   const convertToGeoJSON = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     return turf.polygon([geoCoords]);
//   };

//   // Calculate Area
//   // const calculateArea = (coords: [number, number][]) => {
//   //   const polygon = convertToGeoJSON(coords);
//   //   return turf.area(polygon); // sq meters
//   // };
//   const calculateArea = (coords: [number, number][]) => {
//   const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//   geoCoords.push(geoCoords[0]);

//   const polygon = turf.polygon([geoCoords]);
//   const area = turf.area(polygon); // in square meters

//   return area;
// };


//   // Overlap Detection
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

//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     setIsGettingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCoordinates({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         setIsGettingLocation(false);
//         toast.success("Location fetched!");
//       },
//       (error) => {
//         setIsGettingLocation(false);
//         toast.error(error.message);
//       }
//     );
//   };

//   const handleRegister = async () => {
//     if (!landId || !owner || !location || (!coordinates && polygonCoords.length === 0)) {
//       toast.error("Fill all required fields");
//       return;
//     }

//     setIsRegistering(true);

//     if (polygonCoords.length > 2) {
//       if (isPolygonOverlapping(polygonCoords, parcels)) {
//         toast.error("⚠️ Overlapping land detected!");
//         setIsRegistering(false);
//         return;
//       }
//     }

//     try {
//       await registerLand(
//         landId,
//         owner,
//         location,
//         coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         documentUrl || undefined,
//         polygonCoords.length > 0 ? polygonCoords : undefined
//       );

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

//       setLandId("");
//       setLocation("");
//       setCoordinates(null);
//       setPolygonCoords([]);
//       setDocumentUrl(null);
//       setLandArea(null);

//       toast.success("Land registered successfully!");
//     } catch {
//       toast.error("Registration failed");
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="p-6">
//           <div className="space-y-4">
//             <Input value={landId} onChange={(e) => setLandId(e.target.value)} placeholder="Land ID" />
//             <DocumentUpload parcelId={landId || "temp"} onUploadComplete={setDocumentUrl} />
//             <Input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner Address" />
//             <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location Name" />

//             <Button onClick={fetchCurrentLocation} variant="outline" className="w-full">
//               {isGettingLocation ? <Loader2 className="animate-spin" /> : <MapPin />}
//               Fetch Location
//             </Button>

//             {coordinates && (
//               <div className="p-3 bg-accent/10 rounded">
//                 {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
//               </div>
//             )}

//             <MapDraw
//               onShapeDrawn={(coords) => {
//                 setPolygonCoords(coords);
//                 const area = calculateArea(coords);
//                 setLandArea(area);
//                 toast.success("Boundary drawn");
//               }}
//             />

//             {landArea && (
//               <div className="p-3 bg-secondary rounded">
//                 📐 Area: {(landArea / 10000).toFixed(2)} hectares
//               </div>
//             )}

//             <Button onClick={handleRegister} disabled={isRegistering} className="w-full">
//               {isRegistering ? <Loader2 className="animate-spin" /> : <Send />}
//               Register
//             </Button>
//           </div>
//         </Card>

//         <div className="space-y-6">
//           <LandList parcels={parcels} onSelectParcel={setSelectedParcel} selectedParcel={selectedParcel} />
//           <MapSimulator selectedParcel={selectedParcel} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistryView;




















// import { useState } from "react";
// import { MapPin, Loader2, Send, ShieldCheck, Ruler, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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
//   const [landArea, setLandArea] = useState<number | null>(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   const [parcels, setParcels] = useState<LandParcel[]>(() => {
//     const saved = localStorage.getItem("landParcels");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const convertToGeoJSON = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     return turf.polygon([geoCoords]);
//   };

//   const calculateArea = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     const polygon = turf.polygon([geoCoords]);
//     return turf.area(polygon);
//   };

//   const isPolygonOverlapping = (newCoords: [number, number][], existingParcels: LandParcel[]) => {
//     const newPolygon = convertToGeoJSON(newCoords);
//     for (let parcel of existingParcels) {
//       if (!parcel.polygonCoords || parcel.polygonCoords.length < 3) continue;
//       const existingPolygon = convertToGeoJSON(parcel.polygonCoords);
//       if (turf.booleanIntersects(newPolygon, existingPolygon)) return true;
//     }
//     return false;
//   };

//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) return toast.error("Geolocation not supported");
//     setIsGettingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//         setIsGettingLocation(false);
//         toast.success("GPS Lock Established");
//       },
//       (err) => { setIsGettingLocation(false); toast.error(err.message); }
//     );
//   };

//   const handleRegister = async () => {
//     if (!landId || !owner || !location || (!coordinates && polygonCoords.length === 0)) {
//       toast.error("Fill all required fields");
//       return;
//     }
//     setIsRegistering(true);
//     if (polygonCoords.length > 2 && isPolygonOverlapping(polygonCoords, parcels)) {
//       toast.error("⚠️ Overlapping land detected!");
//       setIsRegistering(false);
//       return;
//     }

//     try {
//       await registerLand(
//         landId, owner, location,
//         coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         documentUrl || undefined,
//         polygonCoords.length > 0 ? polygonCoords : undefined
//       );

//       const newParcel: LandParcel = {
//         id: Date.now().toString(),
//         landId, owner, location,
//         coordinates: coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         polygonCoords,
//         documentUrl: documentUrl || "",
//         timestamp: new Date().toISOString(),
//       };

//       const updated = [...parcels, newParcel];
//       setParcels(updated);
//       localStorage.setItem("landParcels", JSON.stringify(updated));
//       setLandId(""); setLocation(""); setCoordinates(null);
//       setPolygonCoords([]); setDocumentUrl(null); setLandArea(null);
//       toast.success("Land registered successfully!");
//     } catch {
//       toast.error("Registration failed");
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-700">
//       <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
//         <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic">
//           Registry<span className="text-blue-600">.</span>
//         </h1>
//         <p className="text-slate-500 font-medium">Immutable property tokenization protocol.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//         {/* Registration Form Card */}
//         <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
//               <ShieldCheck className="w-5 h-5" />
//             </div>
//             <h2 className="text-xl font-black uppercase tracking-tight">Node Entry</h2>
//           </div>

//           <div className="space-y-4">
//             <Input 
//               value={landId} 
//               onChange={(e) => setLandId(e.target.value)} 
//               placeholder="Land ID (e.g. PARCEL-01)" 
//               className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6"
//             />
            
//             <div className="pt-2">
//               <DocumentUpload parcelId={landId || "temp"} onUploadComplete={setDocumentUrl} />
//             </div>

//             <Input 
//               value={owner} 
//               onChange={(e) => setOwner(e.target.value)} 
//               placeholder="Owner Address" 
//               className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-mono text-xs px-6"
//             />
            
//             <Input 
//               value={location} 
//               onChange={(e) => setLocation(e.target.value)} 
//               placeholder="Location Name" 
//               className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6"
//             />

//             <Button onClick={fetchCurrentLocation} variant="outline" className="w-full h-14 rounded-2xl border-dashed border-slate-300 font-bold hover:bg-blue-50 hover:text-blue-600">
//               {isGettingLocation ? <Loader2 className="animate-spin" /> : <MapPin className="mr-2 w-4 h-4" />}
//               Fetch GPS Node
//             </Button>

//             {coordinates && (
//               <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-xs font-mono font-bold text-blue-600 text-center">
//                 LAT: {coordinates.lat.toFixed(6)} | LNG: {coordinates.lng.toFixed(6)}
//               </div>
//             )}

//             <div className="rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 h-[300px]">
//               <MapDraw
//                 onShapeDrawn={(coords) => {
//                   setPolygonCoords(coords);
//                   setLandArea(calculateArea(coords));
//                   toast.success("Boundary Mapped");
//                 }}
//               />
//             </div>

//             {landArea && (
//               <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
//                 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Computed Area</span>
//                 <span className="text-lg font-black italic">{(landArea / 10000).toFixed(2)} Hectares</span>
//               </div>
//             )}

//             <Button 
//               onClick={handleRegister} 
//               disabled={isRegistering} 
//               className="w-full h-18 py-8 bg-slate-900 dark:bg-blue-600 hover:scale-[1.01] transition-transform rounded-[1.5rem] text-xl font-black text-white shadow-xl"
//             >
//               {isRegistering ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> Commit to Ledger</>}
//             </Button>
//           </div>
//         </Card>

//         {/* Right Column: List and Preview */}
//         <div className="space-y-8">
//           <Card className="border-none bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden h-[450px] flex flex-col">
//             <div className="p-6 border-b dark:border-slate-800">
//               <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" /> Recorded Inventory
//               </h3>
//             </div>
//             <div className="flex-1 overflow-y-auto scrollbar-hide">
//               <LandList parcels={parcels} onSelectParcel={setSelectedParcel} selectedParcel={selectedParcel} />
//             </div>
//           </Card>

//           <div className="rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl h-[400px]">
//             <MapSimulator selectedParcel={selectedParcel} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistryView;
























// import { useState } from "react";
// import { 
//   MapPin, Loader2, Send, ShieldCheck, Ruler, 
//   FileText, Search, Activity, Globe 
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; // Added for better labeling
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
//   const [searchQuery, setSearchQuery] = useState(""); // 🔍 New Search State
//   const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
//   const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
//   const [documentUrl, setDocumentUrl] = useState<string | null>(null);
//   const [landArea, setLandArea] = useState<number | null>(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);

//   const [parcels, setParcels] = useState<LandParcel[]>(() => {
//     const saved = localStorage.getItem("landParcels");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Filter logic for Global Search
//   const filteredParcels = parcels.filter(p => 
//     p.landId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     p.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const convertToGeoJSON = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     return turf.polygon([geoCoords]);
//   };

//   const calculateArea = (coords: [number, number][]) => {
//     const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
//     geoCoords.push(geoCoords[0]);
//     const polygon = turf.polygon([geoCoords]);
//     return turf.area(polygon);
//   };

//   const isPolygonOverlapping = (newCoords: [number, number][], existingParcels: LandParcel[]) => {
//     const newPolygon = convertToGeoJSON(newCoords);
//     for (let parcel of existingParcels) {
//       if (!parcel.polygonCoords || parcel.polygonCoords.length < 3) continue;
//       const existingPolygon = convertToGeoJSON(parcel.polygonCoords);
//       if (turf.booleanIntersects(newPolygon, existingPolygon)) return true;
//     }
//     return false;
//   };

//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) return toast.error("Geolocation not supported");
//     setIsGettingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//         setIsGettingLocation(false);
//         toast.success("GPS Lock Established");
//       },
//       (err) => { setIsGettingLocation(false); toast.error(err.message); }
//     );
//   };

//   const handleRegister = async () => {
//     if (!landId || !owner || !location || (!coordinates && polygonCoords.length === 0)) {
//       toast.error("Fill all required fields");
//       return;
//     }
//     setIsRegistering(true);
//     if (polygonCoords.length > 2 && isPolygonOverlapping(polygonCoords, parcels)) {
//       toast.error("⚠️ Overlapping land detected!");
//       setIsRegistering(false);
//       return;
//     }

//     try {
//       await registerLand(
//         landId, owner, location,
//         coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         documentUrl || undefined,
//         polygonCoords.length > 0 ? polygonCoords : undefined
//       );

//       const newParcel: LandParcel = {
//         id: Date.now().toString(),
//         landId, owner, location,
//         coordinates: coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] },
//         polygonCoords,
//         documentUrl: documentUrl || "",
//         timestamp: new Date().toISOString(),
//       };

//       const updated = [...parcels, newParcel];
//       setParcels(updated);
//       localStorage.setItem("landParcels", JSON.stringify(updated));
//       setLandId(""); setLocation(""); setCoordinates(null);
//       setPolygonCoords([]); setDocumentUrl(null); setLandArea(null);
//       toast.success("Land registered successfully!");
//     } catch {
//       toast.error("Registration failed");
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-700">
//       <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
//         <div>
//           <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic">
//             Registry<span className="text-blue-600">.</span>
//           </h1>
//           <p className="text-slate-500 font-medium font-sans uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
//             <Activity className="w-3 h-3 text-emerald-500" />
//             Immutable asset tokenization protocol
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//         {/* Left: Registration Form (4 cols) */}
//         <div className="lg:col-span-5">
//           <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-6">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
//                 <ShieldCheck className="w-5 h-5" />
//               </div>
//               <h2 className="text-xl font-black uppercase tracking-tight">System Entry</h2>
//             </div>

//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Unique Asset ID (Global ID)</Label>
//                 <Input 
//                   value={landId} 
//                   onChange={(e) => setLandId(e.target.value)} 
//                   placeholder="e.g. LAND-TX-102" 
//                   className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6 focus:ring-2 ring-blue-500"
//                 />
//               </div>
              
//               <div className="pt-2">
//                 <DocumentUpload parcelId={landId || "temp"} onUploadComplete={setDocumentUrl} />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Owner Node Address</Label>
//                 <Input 
//                   value={owner} 
//                   onChange={(e) => setOwner(e.target.value)} 
//                   placeholder="0x..." 
//                   className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-mono text-xs px-6"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location Name</Label>
//                 <Input 
//                   value={location} 
//                   onChange={(e) => setLocation(e.target.value)} 
//                   placeholder="District / State" 
//                   className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6"
//                 />
//               </div>

//               <Button onClick={fetchCurrentLocation} variant="outline" className="w-full h-14 rounded-2xl border-dashed border-slate-300 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all">
//                 {isGettingLocation ? <Loader2 className="animate-spin" /> : <MapPin className="mr-2 w-4 h-4" />}
//                 Sync GPS Coordinates
//               </Button>

//               <div className="rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 h-[300px] relative group">
//                 <MapDraw
//                   onShapeDrawn={(coords) => {
//                     setPolygonCoords(coords);
//                     setLandArea(calculateArea(coords));
//                     toast.success("Boundary Mapped");
//                   }}
//                 />
//                 <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-2">
//                   <Globe className="w-3 h-3 text-blue-600" /> GIS Layer
//                 </div>
//               </div>

//               {landArea && (
//                 <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-lg">
//                   <div className="flex items-center gap-2">
//                     <Ruler className="w-4 h-4 text-blue-400" />
//                     <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Calculated Area</span>
//                   </div>
//                   <span className="text-lg font-black italic">{(landArea / 10000).toFixed(2)} Ha</span>
//                 </div>
//               )}

//               <Button 
//                 onClick={handleRegister} 
//                 disabled={isRegistering} 
//                 className="w-full h-20 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] transition-all rounded-[2rem] text-xl font-black text-white shadow-xl shadow-blue-500/20"
//               >
//                 {isRegistering ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> Commit to Ledger</>}
//               </Button>
//             </div>
//           </Card>
//         </div>

//         {/* Right: List and Preview (7 cols) */}
//         <div className="lg:col-span-7 space-y-8">
//           <Card className="border-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[3rem] shadow-xl overflow-hidden h-[500px] flex flex-col">
//             <div className="p-8 border-b dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" /> Global Inventory
//               </h3>
              
//               {/* 🔍 Dynamic Search Component */}
//               <div className="relative w-full md:w-64 group">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
//                 <Input 
//                   placeholder="Search ID or Location..." 
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-sm focus:ring-1 ring-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
//               {/* Reusing LandList but filtering internally if needed, 
//                   or you can filter the parcels prop being passed */}
//               <LandList 
//                 parcels={filteredParcels} 
//                 onSelectParcel={setSelectedParcel} 
//                 selectedParcel={selectedParcel} 
//               />
              
//               {filteredParcels.length === 0 && (
//                 <div className="h-full flex flex-col items-center justify-center opacity-30 p-10 text-center">
//                   <Search className="w-12 h-12 mb-4" />
//                   <p className="font-bold uppercase tracking-widest text-xs">No matching assets found</p>
//                 </div>
//               )}
//             </div>
//           </Card>

//           <div className="rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl h-[450px] relative">
//             <MapSimulator selectedParcel={selectedParcel} />
//             {!selectedParcel && (
//               <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
//                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Select an entry to visualize</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistryView;





















import { useState } from "react";
import { 
  MapPin, Loader2, Send, ShieldCheck, Ruler, 
  FileText, Search, Activity, Globe, User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ownerName: string;
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
    polygonCoords?: [number, number][],
    ownerName?: string
  ) => Promise<{ success?: boolean; txHash?: string }>;
}

const RegistryView = ({ walletAddress, registerLand }: RegistryViewProps) => {
  // --- State Management ---
  const [ownerName, setOwnerName] = useState(""); 
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
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

  // --- Logic: Search Filtering ---
  const filteredParcels = parcels.filter(p => 
    p.landId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ownerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Logic: GPS & Geometry ---
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsGettingLocation(false);
        toast.success("GPS Lock Established");
      },
      (err) => { 
        setIsGettingLocation(false); 
        toast.error(err.message); 
      }
    );
  };

  const calculateArea = (coords: [number, number][]) => {
    const geoCoords = coords.map(([lat, lng]) => [lng, lat]);
    geoCoords.push(geoCoords[0]);
    const polygon = turf.polygon([geoCoords]);
    return turf.area(polygon);
  };

  // --- Logic: Registration ---
  const handleRegister = async () => {
    // 1. Validate Text Inputs
    if (!ownerName.trim() || !location.trim()) {
      toast.error("Please provide Owner Name and Location");
      return;
    }

    // 2. Validate Spatial Data (Must have GPS or a drawn polygon)
    if (!coordinates && polygonCoords.length < 3) {
      toast.error("Please sync GPS or draw land boundaries");
      return;
    }

    setIsRegistering(true);
    
    // 3. System-Generated ID (Order ID style)
    const generatedId = `RESQ-L-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const finalCoords = coordinates || { lat: polygonCoords[0][0], lng: polygonCoords[0][1] };
      
      await registerLand(
        generatedId, 
        walletAddress || "", 
        location,
        finalCoords,
        documentUrl || undefined,
        polygonCoords.length > 0 ? polygonCoords : undefined,
        ownerName
      );

      const newParcel: LandParcel = {
        id: Date.now().toString(),
        landId: generatedId,
        owner: walletAddress || "",
        ownerName,
        location,
        coordinates: finalCoords,
        polygonCoords,
        documentUrl: documentUrl || "",
        timestamp: new Date().toISOString(),
      };

      const updated = [...parcels, newParcel];
      setParcels(updated);
      localStorage.setItem("landParcels", JSON.stringify(updated));
      
      // Reset Form
      setOwnerName(""); setLocation(""); setCoordinates(null);
      setPolygonCoords([]); setDocumentUrl(null); setLandArea(null);
      
      toast.success(`Success! Assigned ID: ${generatedId}`);
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic">
          Registry<span className="text-blue-600">.</span>
        </h1>
        <p className="text-slate-500 font-medium font-sans uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
          <Activity className="w-3 h-3 text-emerald-500" />
          Immutable asset tokenization protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Registration Form */}
        <div className="lg:col-span-5">
          <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Ownership Entry</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Legal Name</Label>
                <Input 
                  value={ownerName} 
                  onChange={(e) => setOwnerName(e.target.value)} 
                  placeholder="Enter Name" 
                  className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6 focus:ring-2 ring-blue-500" 
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location Name</Label>
                <Input 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="City, Region" 
                  className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold px-6" 
                />
              </div>

              {/* Restored: GPS Sync Button */}
              <Button 
                onClick={fetchCurrentLocation} 
                variant="outline" 
                className={`w-full h-14 rounded-2xl border-dashed font-bold transition-all ${coordinates ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-300 hover:bg-blue-50'}`}
              >
                {isGettingLocation ? <Loader2 className="animate-spin" /> : <MapPin className="mr-2 w-4 h-4" />}
                {coordinates ? "GPS Location Locked" : "Sync GPS Coordinates"}
              </Button>

              <DocumentUpload parcelId="temp" onUploadComplete={setDocumentUrl} />

              <div className="rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 h-[250px] relative group">
                <MapDraw
                  onShapeDrawn={(coords) => {
                    setPolygonCoords(coords);
                    setLandArea(calculateArea(coords));
                    toast.success("Boundary Mapped");
                  }}
                />
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-2">
                  <Globe className="w-3 h-3 text-blue-600" /> GIS Layer
                </div>
              </div>

              {landArea && (
                <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Calculated Area</span>
                  <span className="text-lg font-black italic">{(landArea / 10000).toFixed(2)} Ha</span>
                </div>
              )}

              <Button 
                onClick={handleRegister} 
                disabled={isRegistering} 
                className="w-full h-20 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] transition-all rounded-[2rem] text-xl font-black text-white shadow-xl"
              >
                {isRegistering ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> Request Land ID</>}
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Inventory & Map Preview */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="border-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[3rem] shadow-xl overflow-hidden h-[500px] flex flex-col">
            <div className="p-8 border-b dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Global Inventory
              </h3>
              
              <div className="relative w-full md:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Search Name or ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border-slate-200"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-2 scrollbar-hide">
              <LandList 
                parcels={filteredParcels} 
                onSelectParcel={setSelectedParcel} 
                selectedParcel={selectedParcel} 
              />
              {filteredParcels.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 p-10">
                  <Search className="w-12 h-12 mb-2" />
                  <p className="font-bold uppercase tracking-widest text-[10px]">No matches found</p>
                </div>
              )}
            </div>
          </Card>

          <div className="rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl h-[400px] relative">
            <MapSimulator selectedParcel={selectedParcel} />
            {!selectedParcel && (
              <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-800/40 backdrop-blur-[2px] flex items-center justify-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select an entry to visualize</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryView;