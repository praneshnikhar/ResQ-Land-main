import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // important

interface MapDrawProps {
  onShapeDrawn: (coords: [number, number][]) => void;
}

const MapDraw = ({ onShapeDrawn }: MapDrawProps) => {
  useEffect(() => {
    const map = L.map("drawMap", {
      center: [26.9124, 75.7873], // Default center (Jaipur)
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add draw controls
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        circle: false,
        polyline: false,
        rectangle: false,
      },
      edit: { featureGroup: drawnItems },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      const latlngs = layer.getLatLngs()[0].map((p: any) => [p.lat, p.lng]);
      onShapeDrawn(latlngs);
    });

    return () => {
      map.remove();
    };
  }, [onShapeDrawn]);

  return (
    <div
      id="drawMap"
      style={{ height: "300px", width: "100%", borderRadius: "10px", marginTop: "10px" }}
    />
  );
};

export default MapDraw;
