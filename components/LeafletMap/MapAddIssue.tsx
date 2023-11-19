"use client";
import Control from "react-leaflet-custom-control";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

export default function MapAddIssue() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <>
      <Fab
        size="medium"
        aria-label="locate"
        color="primary"
        onClick={() => {
          if (status === "authenticated") {
            router.push("/map/issue/add");
          } else {
            enqueueSnackbar("You must be logged in to add an issue.");
          }
        }}
      >
        <Add />
      </Fab>
    </>
  );
}
