import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
type Data = {
  points: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const id = req.body.id as string;
  if (!id) throw new Error("Invallid id");

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { points: true },
    });
    if (!user) throw new Error("Not found");
    res.status(200).json({ points: user.points } as Data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
