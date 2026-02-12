// import { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import "leaflet-draw"; // important

// interface MapDrawProps {
//   onShapeDrawn: (coords: [number, number][]) => void;
// }

// const MapDraw = ({ onShapeDrawn }: MapDrawProps) => {
//   useEffect(() => {
//     const map = L.map("drawMap", {
//       center: [26.9124, 75.7873], // Default center (Jaipur)
//       zoom: 13,
//     });

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap contributors",
//     }).addTo(map);

//     // Add draw controls
//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     const drawControl = new L.Control.Draw({
//       draw: {
//         polygon: true,
//         marker: false,
//         circle: false,
//         polyline: false,
//         rectangle: false,
//       },
//       edit: { featureGroup: drawnItems },
//     });
//     map.addControl(drawControl);

//     map.on(L.Draw.Event.CREATED, (event: any) => {
//       const layer = event.layer;
//       drawnItems.clearLayers();
//       drawnItems.addLayer(layer);

//       const latlngs = layer.getLatLngs()[0].map((p: any) => [p.lat, p.lng]);
//       onShapeDrawn(latlngs);
//     });

//     return () => {
//       map.remove();
//     };
//   }, [onShapeDrawn]);

//   return (
//     <div
//       id="drawMap"
//       style={{ height: "300px", width: "100%", borderRadius: "10px", marginTop: "10px" }}
//     />
//   );
// };

// export default MapDraw;


import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

interface MapDrawProps {
  onShapeDrawn: (coords: [number, number][]) => void;
}

const MapDraw = ({ onShapeDrawn }: MapDrawProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [mapType, setMapType] = useState<"street" | "satellite">("street");

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("drawMap", {
      center: [26.9124, 75.7873],
      zoom: 13,
    });

    mapRef.current = map;

    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    );

    const satelliteLayer = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    streetLayer.addTo(map);

    // Store layers on map instance
    (map as any).streetLayer = streetLayer;
    (map as any).satelliteLayer = satelliteLayer;

    // Feature Group for drawn shapes
    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: "#16a34a",
          },
        },
        marker: false,
        circle: false,
        polyline: false,
        rectangle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;

      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      const latlngs = layer
        .getLatLngs()[0]
        .map((p: any) => [p.lat, p.lng]);

      onShapeDrawn(latlngs);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onShapeDrawn]);

  // Toggle map layer
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const streetLayer = (map as any).streetLayer;
    const satelliteLayer = (map as any).satelliteLayer;

    if (mapType === "street") {
      map.removeLayer(satelliteLayer);
      streetLayer.addTo(map);
    } else {
      map.removeLayer(streetLayer);
      satelliteLayer.addTo(map);
    }
  }, [mapType]);

  return (
    <div className="mt-4">
      {/* Map Type Toggle */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setMapType("street")}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            mapType === "street"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Street
        </button>
        <button
          onClick={() => setMapType("satellite")}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            mapType === "satellite"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Satellite
        </button>
      </div>

      <div
        id="drawMap"
        style={{
          height: "350px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default MapDraw;
