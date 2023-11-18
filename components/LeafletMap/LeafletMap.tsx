"use client";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapAddIssue from "./MapAddIssue";
import SearchBox from "../MapSearch/SearchBox";
import MapGeolocation from "./MapGeolocation";
import LocationPicker from "./LocationPicker";

export default function LeafletMap() {
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
      <MapGeolocation />
      <LocationPicker />
    </MapContainer>
  );
}
