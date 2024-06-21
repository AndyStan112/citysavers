import { ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import StatusChip from "../Chips/StatusChip";
import CategoryChip from "../Chips/CategoryChip";
import { IssueData } from "./IssueData";

export default function IssueListItem({ data }: { data: IssueData }) {
  return (
    <ListItemButton>
      <ListItemText>
        <Stack gap={0.5}>
          <Typography>{data.shortDescription}</Typography>
          <Stack direction="row" gap={1}>
            <StatusChip status={data.status} />
            <CategoryChip category={data.category} />
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
