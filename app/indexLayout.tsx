"use client";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { SnackbarProvider } from "notistack";
import NoSSR from "@mpth/react-no-ssr";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoSSR>
        <Box sx={{ display: "flex" }}>
          <SnackbarProvider maxSnack={2} preventDuplicate />
          <CssBaseline />
          <MainNavbar />
          <Box component="main" sx={{ p: { xs: 2, sm: 3 }, width: "100dvw" }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </NoSSR>
    </>
  );
}
