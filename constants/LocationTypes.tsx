import {
  DirectionsBus,
  DirectionsCar,
  DirectionsWalk,
  Park,
} from "@mui/icons-material";

interface LocationType {
  key: string;
  name: string;
  icon: JSX.Element;
}

interface LocationTypesData {
  [key: string]: LocationType;
}

export const LocationTypesData: LocationTypesData = {
  sidewalk: {
    key: "sidewalk",
    name: "Sidewalk",
    icon: <DirectionsWalk />,
  },
  park: {
    key: "park",
    name: "Park",
    icon: <Park />,
  },
  "bus-station": {
    key: "bus-station",
    name: "Bus Station",
    icon: <DirectionsBus />,
  },
  road: {
    key: "road",
    name: "Road",
    icon: <DirectionsCar />,
  },
};

export const LocationTypesOrder = ["sidewalk", "park", "bus-station", "road"];

export const LocationTypes = LocationTypesOrder.map(
  (key) => LocationTypesData[key]
);
