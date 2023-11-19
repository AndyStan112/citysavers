import L from "leaflet";

const MapIcon = L.Icon.extend({
  options: {
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    iconSize: [32, 32],
  },
});

const pickLocation = "/map-icons/pick-location.svg";
const PickLocationIcon = new MapIcon({
  iconUrl: pickLocation,
  iconRetinaUrl: pickLocation,
  iconAnchor: [20, 40],
  iconSize: [40, 40],
  popupAnchor: [0, -40],
});

const userLocation = "/map-icons/user-location.svg";
const UserLocationIcon = new MapIcon({
  iconUrl: userLocation,
  iconRetinaUrl: userLocation,
  iconAnchor: [20, 40],
  iconSize: [40, 40],
  popupAnchor: [0, -40],
});

const abandonedVehicle = "/map-icons/abandoned-vehicle.svg";
const AbandonedVehicleIcon = new MapIcon({
  iconUrl: abandonedVehicle,
  iconRetinaUrl: abandonedVehicle,
});

const blockedRoad = "/map-icons/blocked-road.svg";
const BlockedRoadIcon = new MapIcon({
  iconUrl: blockedRoad,
  iconRetinaUrl: blockedRoad,
});

const garbage = "/map-icons/garbage.svg";
const GarbageIcon = new MapIcon({
  iconUrl: garbage,
  iconRetinaUrl: garbage,
});

const vandalism = "/map-icons/vandalism.svg";
const VandalismIcon = new MapIcon({
  iconUrl: vandalism,
  iconRetinaUrl: vandalism,
});

export {
  AbandonedVehicleIcon,
  BlockedRoadIcon,
  GarbageIcon,
  PickLocationIcon,
  UserLocationIcon,
  VandalismIcon,
};
