"use client";
import { Fab } from "@mui/material";
import { LocationSearching } from "@mui/icons-material";
import { useGeolocated } from "react-geolocated";
import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { UserLocationIcon } from "@/constants/MapIcons";
import { useSetAtom } from "jotai";
import { MyLocationCoords } from "@/constants/MapGeolocation";

export default function MapGeolocation() {
  const map = useMap();
  const [waitingState, setWaitingState] = useState(false);
  const [initialState, setInitialState] = useState(true);
  const [cachedCoords, setCachedCoords] = useState<LatLngExpression>();
  const setMyLocation = useSetAtom(MyLocationCoords);

  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      setCachedCoords(L.latLng(coords.latitude, coords.longitude));
      setMyLocation(L.latLng(coords.latitude, coords.longitude));
    }
  }, [coords, setCachedCoords, setMyLocation]);

  useEffect(() => {
    if (waitingState && coords) {
      map.flyTo([coords.latitude, coords.longitude], 16);
      setWaitingState(false);
    }
    if (initialState && coords) {
      map.setView([coords.latitude, coords.longitude], 16, {
        animate: false,
      });
      setInitialState(false);
    }
  }, [map, waitingState, initialState, coords, cachedCoords, setCachedCoords]);

  const locateButtonClick = () => {
    getPosition();
    if (cachedCoords) {
      map.flyTo(cachedCoords, 16);
    }
    setWaitingState(true);
  };

  return (
    <>
      <Fab
        sx={{ backgroundColor: "white" }}
        size="medium"
        aria-label="locate"
        onClick={locateButtonClick}
      >
        <LocationSearching />
      </Fab>

      {cachedCoords && (
        <Marker icon={UserLocationIcon} position={cachedCoords}>
          <Popup>
            <center>You are located here</center>
          </Popup>
        </Marker>
      )}
    </>
  );
}
