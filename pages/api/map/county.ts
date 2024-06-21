import type { NextApiRequest, NextApiResponse } from "next";

import * as turf from '@turf/turf';
import * as fs from 'fs';
import * as path from 'path';


interface County {
  geometry: {
    type: string,
    coordinates: [number, number][][],
  },
  type: string,
  properties: {
    source: string,
    id: string,
    name: string,
  },
  id: number,
}

function loadJSON(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

const jsonFilePath = path.join('./pages/api/map/ro.json');

const data = loadJSON(jsonFilePath);

const polygons = data.features.map((county: County) => ({
  county: county.properties.name,
  polygon: turf.polygon(county.geometry.coordinates)
}));

function findCounty(pointCoords: [number, number]): string | null {
  const point = turf.point(pointCoords);
  for (const { county, polygon } of polygons) {
    if (turf.booleanPointInPolygon(point, polygon)) {
      return county;
    }
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ county: string } | { error: any }>
) {
  try {
    const lat = req.query.lat === undefined ? 0 : parseFloat(typeof req.query.lat === 'string' ? req.query.lat : req.query.lat[0]);
    const lon = req.query.lon === undefined ? 0 : parseFloat(typeof req.query.lon === 'string' ? req.query.lon : req.query.lon[0]);

    const location: [number, number] = [lon, lat];

    const county = findCounty(location);

    if (county) {
      console.log(`The point ${location} is in ${county}`);
    } else {
      console.log(`The point ${location} is not in Romania`);
    }

    res.status(200).json({ county: county || "none" });
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
}
