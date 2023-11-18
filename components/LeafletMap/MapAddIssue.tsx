"use client";
import Control from "react-leaflet-custom-control";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function MapAddIssue() {
  const router = useRouter();

  return (
    <>
      <Control prepend position="bottomright">
        <Fab
          color="secondary"
          size="medium"
          aria-label="locate"
          onClick={() => {
            router.push("/map/issue/add");
          }}
        >
          <Add />
        </Fab>
      </Control>
    </>
  );
}
