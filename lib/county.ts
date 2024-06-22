import type { NextApiRequest, NextApiResponse } from "next";

import * as turf from "@turf/turf";
import * as fs from "fs";
import * as path from "path";

interface County {
  geometry: {
    type: string;
    coordinates: [number, number][][];
  };
  type: string;
  properties: {
    source: string;
    id: string;
    name: string;
  };
  id: number;
}

export default function findCounty(
  pointCoords: [number, number]
): string | null {
  function loadJSON(filePath: string) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }

  const jsonFilePath = path.join("./pages/api/map/ro.json");

  const data = loadJSON(jsonFilePath);

  const polygons = data.features.map((county: County) => ({
    county: county.properties.name,
    polygon: turf.polygon(county.geometry.coordinates),
  }));

  const point = turf.point(pointCoords);
  for (const { county, polygon } of polygons) {
    if (turf.booleanPointInPolygon(point, polygon)) {
      return county;
    }
  }
  return "none";
}
