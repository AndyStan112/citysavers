import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CitySavers",
    short_name: "CitySavers",
    description: "Report problems around your city",
    start_url: "/map",
    display: "standalone",
    background_color: "#6e1b7d",
    theme_color: "#9c27b0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
