"use client";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapLocate from "./MapLocate";
import MapAddIssue from "./MapAddIssue";

export default function LeafletMap({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MapContainer
      center={[45.754, 21.226]}
      markerZoomAnimation={true}
      zoom={16}
      zoomControl={false}
      zoomAnimation={true}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapAddIssue />
      <MapLocate />
      {children}
      {/* <ZoomControl position="bottomright" /> */}
    </MapContainer>
  );
}
