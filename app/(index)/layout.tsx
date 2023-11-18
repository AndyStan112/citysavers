"use client";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import LeafletMapWrap from "@/components/LeafletMap/LeafletMapWrap";
import { SnackbarProvider } from "notistack";
import { AccountCircle } from "@mui/icons-material";
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              CitySavers
            </Typography>
            <Link href="/login">
              <Button endIcon={<AccountCircle />} sx={{ color: "#fff" }}>
                Login
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
