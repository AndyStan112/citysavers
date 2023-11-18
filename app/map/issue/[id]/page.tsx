import ChipsList from "@/components/ChipsList/ChipsList";
import Gallery from "@/components/Gallery/Gallery";
import OverlayPage from "@/components/OverlayPage/OverlayPage";
import {
  AccessAlarm,
  Add,
  BookmarkBorder,
  DirectionsBus,
  DoNotDisturbOn,
  DoNotStep,
  Done,
  Launch,
  Share,
} from "@mui/icons-material";
import { Avatar, Button, Chip, Stack, Typography } from "@mui/material";

export default function ViewIssuePage({ params }: { params: { id: string } }) {
  return (
    <OverlayPage>
      <Typography variant="h6">Short description</Typography>
      <ChipsList>
        <Chip
          icon={<AccessAlarm />}
          label="Pending approval"
          size="small"
          color="warning"
        />
        <Chip
          icon={<DoNotDisturbOn />}
          label="Rejected"
          size="small"
          color="error"
        />
        <Chip
          icon={<AccessAlarm />}
          label="Pending solution"
          size="small"
          color="info"
        />
        <Chip icon={<Done />} label="Solved" size="small" color="success" />
        <Chip icon={<DirectionsBus />} label="Bus Station" size="small" />
        <Chip icon={<DoNotStep />} label="Vandalism" size="small" />
        <Chip avatar={<Avatar>AU</Avatar>} label="App User" size="small" />
      </ChipsList>
      <Typography>Images:</Typography>
      <Gallery
        imageList={[
          "/images/placeholder.webp",
          "/images/placeholder.webp",
          "/images/placeholder.webp",
        ]}
      />
      <Typography>
        <strong>Description:</strong>
        <br />
        This is the description of this issue.
      </Typography>
      <Button color="primary" variant="contained" fullWidth startIcon={<Add />}>
        Add solution
      </Button>
      <Stack direction="row" gap={1}>
        <Button
          color="success"
          variant="outlined"
          fullWidth
          startIcon={<Launch />}
        >
          GMaps
        </Button>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          startIcon={<BookmarkBorder />}
        >
          Save
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          startIcon={<Share />}
        >
          Share
        </Button>
      </Stack>
    </OverlayPage>
  );
}
