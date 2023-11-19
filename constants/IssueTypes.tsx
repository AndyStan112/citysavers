import {
  DeleteOutline,
  DirectionsCar,
  DoNotStep,
  RemoveRoad,
} from "@mui/icons-material";

interface IssueType {
  key: string;
  name: string;
  icon: JSX.Element;
}

interface IssueTypesData {
  [key: string]: IssueType;
}

export const IssueTypesData: IssueTypesData = {
  litter: {
    key: "litter",
    name: "Garbage and litter",
    icon: <DeleteOutline />,
  },
  vandalism: {
    key: "vandalism",
    name: "Vandalism",
    icon: <DoNotStep />,
  },
  "blocked-path": {
    key: "blocked-path",
    name: "Blocked paths and roads",
    icon: <RemoveRoad />,
  },
  "abandoned-vehicle": {
    key: "abandoned-vehicle",
    name: "Abandoned vehicle",
    icon: <DirectionsCar />,
  },
};

export const IssueTypesOrder: string[] = [
  "litter",
  "vandalism",
  "blocked-path",
  "abandoned-vehicle",
];

export const IssueTypes: IssueType[] = IssueTypesOrder.map(
  (key) => IssueTypesData[key]
);
