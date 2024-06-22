import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const offers = await prisma.offer.findMany({});

    res.status(200).json(offers);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
