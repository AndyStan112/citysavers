"use client";
import "./layout.css";
import { CssBaseline } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import LeafletMapWrap from "@/components/LeafletMap/LeafletMapWrap";
import { SnackbarProvider } from "notistack";

export default function UserMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SnackbarProvider maxSnack={2} preventDuplicate />
      <CssBaseline />
      <Navbar />
      {children}
      <LeafletMapWrap />
    </>
  );
}
