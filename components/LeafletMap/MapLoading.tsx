import { CircularProgress, Typography } from "@mui/material";

export default function MapLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <CircularProgress />
      <Typography variant="h6">Please wait, map is loading...</Typography>
    </div>
  );
}
