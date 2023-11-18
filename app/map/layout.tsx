"use client";
import { CssBaseline } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import SearchBox from "@/components/MapSearch/SearchBox";
import LeafletMapWrap from "@/components/LeafletMap/LeafletMapWrap";

export default function UserMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      {children}
      <LeafletMapWrap />
    </>
  );
}
