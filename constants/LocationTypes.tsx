import {
  DirectionsBus,
  DirectionsCar,
  DirectionsWalk,
  Park,
} from "@mui/icons-material";

export const LocationTypes = [
  {
    key: "sidewalk",
    name: "Sidewalk",
    icon: <DirectionsWalk />,
  },
  {
    key: "park",
    name: "Park",
    icon: <Park />,
  },
  {
    key: "bus-station",
    name: "Bus Station",
    icon: <DirectionsBus />,
  },
  {
    key: "road",
    name: "Road",
    icon: <DirectionsCar />,
  },
];
