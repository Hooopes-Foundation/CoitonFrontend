import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [30, 50],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  location?: string;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

export function MapView({ center, zoom = 10 }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={icon} />
      <MapUpdater center={center} />
    </MapContainer>
  );
}
