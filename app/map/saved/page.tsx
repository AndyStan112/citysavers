import OverlayPage from "@/components/OverlayPage/OverlayPage";
import { AccessAlarm, DeleteOutline } from "@mui/icons-material";
import {
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function SavedPage() {
  return (
    <OverlayPage>
      <Typography variant="h6">Saved issues</Typography>
      <List sx={{ marginX: "-18px", p: 0 }}>
        <ListItemButton>
          <ListItemText>
            <Stack gap={0.5}>
              <Typography>Flipped trashcan</Typography>
              <Stack direction="row" gap={1}>
                <Chip
                  icon={<AccessAlarm />}
                  label="Pending solution"
                  size="small"
                  color="info"
                />
                <Chip
                  icon={<DeleteOutline />}
                  label="Garbage and littering"
                  size="small"
                />
              </Stack>
            </Stack>
          </ListItemText>
        </ListItemButton>
        <Divider component="li" />
        <ListItemButton>
          <ListItemText>
            <Stack gap={0.5}>
              <Typography>Flipped trashcan</Typography>
              <Stack direction="row" gap={1}>
                <Chip
                  icon={<AccessAlarm />}
                  label="Pending solution"
                  size="small"
                  color="info"
                />
                <Chip
                  icon={<DeleteOutline />}
                  label="Garbage and littering"
                  size="small"
                />
              </Stack>
            </Stack>
          </ListItemText>
        </ListItemButton>
      </List>
    </OverlayPage>
  );
}
