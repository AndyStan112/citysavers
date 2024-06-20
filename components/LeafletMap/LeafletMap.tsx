"use client";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapAddIssue from "./MapAddIssue";
import MapGeolocation from "./MapGeolocation";
import LocationPicker from "./LocationPicker";
import Control from "react-leaflet-custom-control";
import { Stack } from "@mui/material";
import IssuePoints from "./IssuePoints";

export default function LeafletMap() {
  return (
    <MapContainer
      center={[45.754, 21.226]}
      markerZoomAnimation={true}
      zoom={15}
      zoomControl={false}
      zoomAnimation={true}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Control position="bottomright">
        <Stack direction="column" gap={2}>
          <MapGeolocation />
          <MapAddIssue />
        </Stack>
      </Control>

      <IssuePoints />

      <LocationPicker />
    </MapContainer>
  );
}
