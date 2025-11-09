// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, FileText, X } from "lucide-react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polygon,
//   useMap,
// } from "react-leaflet";
// import { createPortal } from "react-dom";
// import type { CSSProperties } from "react";
// import { motion } from "framer-motion";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // ✅ Extend Leaflet typings safely
// declare module "react-leaflet" {
//   interface MapContainerProps {
//     center?: [number, number];
//     zoom?: number;
//     scrollWheelZoom?: boolean;
//     style?: CSSProperties;
//   }
//   interface TileLayerProps {
//     attribution?: string;
//   }
// }

// // ✅ Fix missing marker icons (Vite issue)
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // ✅ Land Parcel Type
// interface LandParcel {
//   id: string;
//   landId: string;
//   owner: string;
//   location: string;
//   coordinates: { lat: number; lng: number };
//   polygonCoords?: [number, number][];
//   timestamp: string;
//   documentUrl?: string;
// }

// // 🔁 Recenter map when location changes
// function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView([lat, lng], 15);
//   }, [lat, lng, map]);
//   return null;
// }

// // 🪟 Document Preview Modal
// const DocumentPreviewModal = ({
//   isOpen,
//   onClose,
//   documentUrl,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   documentUrl: string;
// }) => {
//   if (!isOpen) return null;

//   const isImage = /\.(jpg|jpeg|png|gif)$/i.test(documentUrl);
//   const isPDF = /\.pdf$/i.test(documentUrl);

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Background overlay */}
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden
//       />

//       {/* Modal Content */}
//       <div className="relative z-10 w-full max-w-4xl bg-background rounded-lg shadow-xl overflow-hidden">
//         <div className="flex items-center justify-between p-3 border-b">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <FileText className="w-4 h-4 text-accent" /> Land Document
//           </h3>
//           <Button variant="ghost" size="icon" onClick={onClose} className="p-1">
//             <X className="w-4 h-4" />
//           </Button>
//         </div>

//         <div className="p-3 max-h-[80vh] overflow-auto flex items-center justify-center">
//           {isImage ? (
//             <img
//               src={documentUrl}
//               alt="Document"
//               className="max-h-[75vh] w-auto rounded-lg shadow-md"
//             />
//           ) : isPDF ? (
//             <iframe
//               src={documentUrl}
//               title="PDF Preview"
//               className="w-full h-[75vh] rounded-md border"
//             />
//           ) : (
//             <div className="text-center text-muted-foreground text-sm p-6">
//               Unsupported file type.{" "}
//               <a
//                 href={documentUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline"
//               >
//                 Open in new tab
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// // 🌍 Main Component
// const MapSimulator: React.FC<{ selectedParcel: LandParcel | null }> = ({
//   selectedParcel,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!selectedParcel) {
//     return (
//       <Card className="p-6 text-center text-muted-foreground shadow-corporate">
//         <MapPin className="w-10 h-10 mx-auto mb-3 text-muted-foreground/70" />
//         <p>Select a parcel to view its map.</p>
//       </Card>
//     );
//   }

//   const { coordinates, polygonCoords, location, landId, documentUrl } =
//     selectedParcel;

//   const center: [number, number] = polygonCoords?.length
//     ? polygonCoords[0]
//     : [coordinates.lat, coordinates.lng];

//   return (
//     <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
//       <motion.h3
//         className="text-xl font-semibold text-foreground mb-4"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         Parcel Visualization
//       </motion.h3>

//       <div className="relative rounded-xl border border-border overflow-hidden h-[350px] mb-6">
//         <MapContainer
//           center={center}
//           zoom={15}
//           scrollWheelZoom={true}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           />

//           {/* 🟩 Polygon Boundary (if available) */}
//           {polygonCoords && polygonCoords.length > 0 && (
//             <Polygon
//               pathOptions={{ color: "green", weight: 3, fillOpacity: 0.25 }}
//               positions={polygonCoords}
//             />
//           )}

//           {/* 📍 Marker (Always show pin) */}
//           <Marker position={[coordinates.lat, coordinates.lng]}>
//             <Popup>
//               <div className="text-sm">
//                 <p className="font-semibold">🏡 Land ID: {landId}</p>
//                 <p>{location}</p>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   📍 {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
//                 </p>
//               </div>
//             </Popup>
//           </Marker>

//           <RecenterMap lat={center[0]} lng={center[1]} />
//         </MapContainer>
//       </div>

//       {/* 📄 View Document */}
//       {documentUrl ? (
//         <Button
//           className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <FileText className="w-4 h-4 mr-2" /> View Land Document
//         </Button>
//       ) : (
//         <p className="text-center text-muted-foreground text-sm">
//           No document uploaded for this parcel.
//         </p>
//       )}

//       {documentUrl && (
//         <DocumentPreviewModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           documentUrl={documentUrl}
//         />
//       )}
//     </Card>
//   );
// };

// export default MapSimulator;


















import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, X } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Extend Leaflet typings safely
declare module "react-leaflet" {
  interface MapContainerProps {
    center?: [number, number];
    zoom?: number;
    scrollWheelZoom?: boolean;
    style?: CSSProperties;
  }
  interface TileLayerProps {
    attribution?: string;
  }
}

// ✅ Fix missing marker icons (Vite issue)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Land Parcel Type
interface LandParcel {
  id: string;
  landId: string;
  owner: string;
  location: string;
  coordinates: { lat: number; lng: number };
  polygonCoords?: [number, number][];
  timestamp: string;
  documentUrl?: string;
}

// 🔁 Recenter map when location changes
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

// 🪟 Document Preview Modal (Blur + Fade)
const DocumentPreviewModal = ({
  isOpen,
  onClose,
  documentUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
}) => {
  if (!isOpen) return null;

  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(documentUrl);
  const isPDF = /\.pdf$/i.test(documentUrl);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[6px] bg-black/40 transition-all duration-300 animate-fadeIn"
    >
      {/* Overlay click to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-border/40"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" /> Land Document
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-1 hover:bg-accent/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 max-h-[80vh] overflow-auto flex items-center justify-center bg-card/70">
          {isImage ? (
            <img
              src={documentUrl}
              alt="Document"
              className="max-h-[75vh] w-auto rounded-lg shadow-md"
            />
          ) : isPDF ? (
            <iframe
              src={documentUrl}
              title="PDF Preview"
              className="w-full h-[75vh] rounded-md border"
            />
          ) : (
            <div className="text-center text-muted-foreground text-sm p-6">
              Unsupported file type.{" "}
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

// 🌍 Main Component
const MapSimulator: React.FC<{ selectedParcel: LandParcel | null }> = ({
  selectedParcel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedParcel) {
    return (
      <Card className="p-6 text-center text-muted-foreground shadow-corporate">
        <MapPin className="w-10 h-10 mx-auto mb-3 text-muted-foreground/70" />
        <p>Select a parcel to view its map.</p>
      </Card>
    );
  }

  const { coordinates, polygonCoords, location, landId, documentUrl } =
    selectedParcel;

  const center: [number, number] = polygonCoords?.length
    ? polygonCoords[0]
    : [coordinates.lat, coordinates.lng];

  return (
    <Card className="p-6 shadow-corporate transition-smooth hover:shadow-corporate-lg">
      <motion.h3
        className="text-xl font-semibold text-foreground mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Parcel Visualization
      </motion.h3>

      <div className="relative rounded-xl border border-border overflow-hidden h-[350px] mb-6">
        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* 🟩 Polygon Boundary (if available) */}
          {polygonCoords && polygonCoords.length > 0 && (
            <Polygon
              pathOptions={{ color: "green", weight: 3, fillOpacity: 0.25 }}
              positions={polygonCoords}
            />
          )}

          {/* 📍 Marker (Always show pin) */}
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">🏡 Land ID: {landId}</p>
                <p>{location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  📍 {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                </p>
              </div>
            </Popup>
          </Marker>

          <RecenterMap lat={center[0]} lng={center[1]} />
        </MapContainer>
      </div>

      {/* 📄 View Document */}
      {documentUrl ? (
        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          <FileText className="w-4 h-4 mr-2" /> View Land Document
        </Button>
      ) : (
        <p className="text-center text-muted-foreground text-sm">
          No document uploaded for this parcel.
        </p>
      )}

      {documentUrl && (
        <DocumentPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          documentUrl={documentUrl}
        />
      )}
    </Card>
  );
};

export default MapSimulator;
