"use client";

import dynamic from "next/dynamic";
import MapLoading from "./MapLoading";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  loading: () => <MapLoading />,
  ssr: false,
});

export default function LeafletMapWrap() {
  return <LeafletMap />;
}
