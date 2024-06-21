import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
type Data = {
  points: number;
  coins: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const session = await getToken({ req });
  const id = session?.sub;
  if (!id) throw new Error("Invallid id");

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { points: true, coins: true },
    });
    if (!user) throw new Error("Not found");
    res.status(200).json({ points: user.points, coins: user.coins } as Data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
