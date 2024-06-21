import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
type Data = {
  id: string;
  shortDescription: string;
  category: string;
  status: string;
  locationType: string;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const R = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { error: string }>
) {
  try {
    const pointsArray = await prisma.issue.findMany();

    const r =
      req.query.r === undefined
        ? 0
        : parseFloat(
            typeof req.query.r === "string" ? req.query.r : req.query.r[0]
          );
    const lat =
      req.query.lat === undefined
        ? 0
        : parseFloat(
            typeof req.query.lat === "string" ? req.query.lat : req.query.lat[0]
          );
    const lon =
      req.query.lon === undefined
        ? 0
        : parseFloat(
            typeof req.query.lon === "string" ? req.query.lon : req.query.lon[0]
          );

    res.status(200).json(
      pointsArray
        .filter(
          (el) =>
            r === 0 ||
            haversineDistance(lat, lon, el.latitude, el.longitude) <= r
        )
        .map((el) => {
          return {
            id: el.id,
            shortDescription: el.shortDescription,
            category: el.category,
            locationType: el.locationType,
            status: el.status,
          };
        })
    );
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
}
