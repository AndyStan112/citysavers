"use client";
import Control from "react-leaflet-custom-control";
import { Fab, Stack } from "@mui/material";
import { LocationSearching, Add } from "@mui/icons-material";

export default function MapLocate() {
  return (
    <>
      <Control prepend position="bottomright">
        <Stack gap={1.5}>
          <Fab color="info" size="medium" aria-label="locate">
            <LocationSearching />
          </Fab>
          <Fab color="secondary" size="medium" aria-label="locate">
            <Add />
          </Fab>
        </Stack>
      </Control>
    </>
  );
}
