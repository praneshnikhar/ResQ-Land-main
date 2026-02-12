import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, X, Globe } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// ----------------------------------
// Types
// ----------------------------------

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

// ----------------------------------
// Recenter Map
// ----------------------------------

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);

  return null;
}

// ----------------------------------
// Document Preview Modal
// ----------------------------------

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[6px] bg-black/40 animate-fadeIn">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl bg-background rounded-xl shadow-2xl overflow-hidden border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" /> Land Document
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 max-h-[80vh] overflow-auto flex items-center justify-center">
          {isImage ? (
            <img
              src={documentUrl}
              alt="Document"
              className="max-h-[75vh] w-auto rounded-lg"
            />
          ) : isPDF ? (
            <iframe
              src={documentUrl}
              title="PDF Preview"
              className="w-full h-[75vh] rounded-md border"
            />
          ) : (
            <div className="text-center text-muted-foreground text-sm p-6">
              Unsupported file type.
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

// ----------------------------------
// Main Component
// ----------------------------------

const MapSimulator: React.FC<{ selectedParcel: LandParcel | null }> = ({
  selectedParcel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapType, setMapType] = useState<"street" | "satellite">("street");

  if (!selectedParcel) {
    return (
      <Card className="p-6 text-center text-muted-foreground shadow-corporate">
        <MapPin className="w-10 h-10 mx-auto mb-3" />
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
    <Card className="p-6 shadow-corporate">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Parcel Visualization</h3>

        {/* 🛰 Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setMapType((prev) =>
              prev === "street" ? "satellite" : "street"
            )
          }
        >
          <Globe className="w-4 h-4 mr-2" />
          {mapType === "street" ? "Satellite View" : "Street View"}
        </Button>
      </div>

      <div className="relative rounded-xl border overflow-hidden h-[350px] mb-6">
        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          {/* Street Map */}
          {mapType === "street" && (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              
          )}

          {/* Real Satellite Map */}
          {mapType === "satellite" && (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

          )}

          {/* Polygon */}
          {polygonCoords && polygonCoords.length > 0 && (
            <Polygon
              positions={polygonCoords}
              pathOptions={{
                color: "green",
                weight: 3,
                fillOpacity: 0.25,
              }}
            />
          )}

          {/* Marker */}
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">🏡 Land ID: {landId}</p>
                <p>{location}</p>
                <p className="text-xs mt-1">
                  {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                </p>
              </div>
            </Popup>
          </Marker>

          <RecenterMap lat={center[0]} lng={center[1]} />
        </MapContainer>
      </div>

      {documentUrl ? (
        <Button
          className="w-full bg-accent text-accent-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Land Document
        </Button>
      ) : (
        <p className="text-center text-muted-foreground text-sm">
          No document uploaded.
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
