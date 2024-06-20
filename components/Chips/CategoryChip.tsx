import { IssueTypesData } from "@/constants/IssueTypes";
import { Chip } from "@mui/material";

export default function CategoryChip({ category }: { category: string }) {
  return (
    <Chip
      icon={IssueTypesData[category].icon}
      label={IssueTypesData[category].name}
      size="small"
    />
  );
}
