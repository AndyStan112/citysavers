"use client";
import { CssBaseline } from "@mui/material";
import LeafletMap from "@/components/LeafletMap/LeafletMap";
import Navbar from "@/components/Navbar/Navbar";
import SearchBox from "@/components/MapSearch/SearchBox";

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
      <LeafletMap>
        <SearchBox />
      </LeafletMap>
    </>
  );
}
