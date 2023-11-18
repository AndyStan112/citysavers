import {
  LocationPickerCoords,
  LocationPickerEnabled,
} from "@/constants/LocationPicker";
import { PickLocationIcon } from "@/constants/MapIcons";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { LatLng } from "leaflet";

export default function LocationPicker() {
  const map = useMap();

  const [firstInit, setFirstInit] = useState(false);
  const enabled = useAtomValue(LocationPickerEnabled);
  const [selectedCoords, setSelectedCoords] = useAtom(LocationPickerCoords);

  useEffect(() => {
    if (enabled && !firstInit && selectedCoords) {
      setSelectedCoords(map.getCenter());
      setFirstInit(true);
    }
    if (!enabled) {
      setFirstInit(false);
      if (!(selectedCoords.lat == 0 && selectedCoords.lng == 0)) {
        map.setView(selectedCoords);
      }
    }
  }, [map, enabled, firstInit, selectedCoords, setSelectedCoords]);

  const handleDragEnd = (event: { target: { getLatLng: () => LatLng } }) => {
    setSelectedCoords(event.target.getLatLng());
  };

  return (
    enabled && (
      <Marker
        draggable={true}
        icon={PickLocationIcon}
        position={selectedCoords}
        eventHandlers={{ dragend: handleDragEnd }}
      ></Marker>
    )
  );
}
