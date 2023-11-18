import {
  DeleteOutline,
  DirectionsCar,
  DoNotStep,
  RemoveRoad,
} from "@mui/icons-material";

export const IssueTypes = [
  {
    key: "litter",
    name: "Garbage and litter",
    icon: <DeleteOutline />,
  },
  {
    key: "vandalism",
    name: "Vandalism",
    icon: <DoNotStep />,
  },
  {
    key: "blocked-path",
    name: "Blocked paths and roads",
    icon: <RemoveRoad />,
  },
  {
    key: "abandoned-vehicle",
    name: "Abandoned vehicle",
    icon: <DirectionsCar />,
  },
];
