import { LocationTypesData } from "@/constants/LocationTypes";
import { Chip } from "@mui/material";

export default function LocationTypeChip({ type }: { type: string }) {
  return (
    type !== undefined && (
      <Chip
        icon={LocationTypesData[type].icon}
        label={LocationTypesData[type].name}
        size="small"
      />
    )
  );
}
