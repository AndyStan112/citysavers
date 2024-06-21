import { ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import StatusChip from "../Chips/StatusChip";
import CategoryChip from "../Chips/CategoryChip";
import { IssueData } from "./IssueData";
import { useRouter } from "next/navigation";

export default function IssueListItem({
  data,
  clickHandler,
}: {
  data: IssueData;
  clickHandler?: any;
}) {
  const router = useRouter();

  const defaultHandler = () => {
    router.push(`/map/issue/${data.id}`);
  };

  return (
    <ListItemButton onClick={clickHandler ? clickHandler : defaultHandler}>
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
