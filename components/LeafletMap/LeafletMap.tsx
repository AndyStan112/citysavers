"use client";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapAddIssue from "./MapAddIssue";
import MapGeolocation from "./MapGeolocation";
import LocationPicker from "./LocationPicker";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Control from "react-leaflet-custom-control";
import IssueMarker from "./MapIssueMarker";
import { Stack } from "@mui/material";

type IssuePoint = {
  id: string;
  category: string;
  latitude: number;
  longitude: number;
};

export default function LeafletMap() {
  const [issuePoints, setIssuePoints] = useState<IssuePoint[]>([]);

  const fetchPoints = async () => {
    await fetch("/api/map/get")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setIssuePoints(data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to get map data points.");
      });
  };

  useEffect(() => {
    fetchPoints();

    const intervalId = setInterval(() => {
      fetchPoints();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

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

      {issuePoints.map((value, index) => (
        <IssueMarker
          key={index}
          latitude={value.latitude}
          longitude={value.longitude}
          issueId={value.id}
          category={value.category}
        />
      ))}

      <LocationPicker />
    </MapContainer>
  );
}
