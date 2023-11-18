"use client";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AccountCircle, Map } from "@mui/icons-material";
import Link from "next/link";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SnackbarProvider maxSnack={2} preventDuplicate />
        <CssBaseline />
        <AppBar position="fixed" component="nav">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CitySavers
            </Typography>
            <Link href="/map">
              <Button endIcon={<Map />} sx={{ color: "#fff" }}>
                Map
              </Button>
            </Link>
            <Link href="/login">
              <Button endIcon={<AccountCircle />} sx={{ color: "#fff" }}>
                Login
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: { xs: 2, sm: 3 }, width: "100dvw" }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
