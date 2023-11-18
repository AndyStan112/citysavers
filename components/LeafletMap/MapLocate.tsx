"use client";
import Control from "react-leaflet-custom-control";
import { Fab } from "@mui/material";
import { LocationSearching } from "@mui/icons-material";

export default function MapLocate() {
  return (
    <>
      <Control prepend position="bottomright">
        <Fab color="info" size="medium" aria-label="locate">
          <LocationSearching />
        </Fab>
      </Control>
    </>
  );
}
