import L from "leaflet";

const MapIcon = L.Icon.extend({
  options: {
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    iconSize: [32, 32],
  },
});

const pickLocation = "map-icons/pick-location.svg";
const PickLocationIcon = new MapIcon({
  iconUrl: pickLocation,
  iconRetinaUrl: pickLocation,
  iconAnchor: [20, 40],
  iconSize: [40, 40],
  popupAnchor: [0, -40],
});

const userLocation = "map-icons/user-location.svg";
const UserLocationIcon = new MapIcon({
  iconUrl: userLocation,
  iconRetinaUrl: userLocation,
  iconAnchor: [20, 40],
  iconSize: [40, 40],
  popupAnchor: [0, -40],
});

export { PickLocationIcon, UserLocationIcon };
