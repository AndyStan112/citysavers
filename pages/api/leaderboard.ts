import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const test = await prisma.user.findMany({
    select: { name: true, points: true, image: true },
    orderBy: { points: "desc" },
  });
  res.status(200).json({ name: test });
}
