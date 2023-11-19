import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Issue } from "@prisma/client";
type Data = {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { error: string }>
) {
  try {
    const pointsArray = await prisma.issue.findMany();
    res.status(200).json(
      pointsArray.map((el) => {
        return {
          id: el.id,
          latitude: el.latitude,
          longitude: el.longitude,
          category: el.category,
        };
      })
    );
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
}
