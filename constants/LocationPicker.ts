import { atom } from "jotai";
import { LatLng, latLng } from "leaflet";

const LocationPickerEnabled = atom<boolean>(false);
const LocationPickerCoords = atom<LatLng>(latLng(0, 0));

export { LocationPickerEnabled, LocationPickerCoords };
