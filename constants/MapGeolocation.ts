import { atom } from "jotai";
import { LatLng, latLng } from "leaflet";

const MyLocationCoords = atom<LatLng | null>(null);

export { MyLocationCoords };
