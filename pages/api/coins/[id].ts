import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
type Data = {
  coins: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const id = req.query.id as string;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { coins: true },
    });
    if (!user) throw new Error("Not found");
    res.status(200).json({ coins: user.coins } as Data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
