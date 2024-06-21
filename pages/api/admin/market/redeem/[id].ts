// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/util";
import { P_TO_ISSUE, Priority, StatusMod } from "@/constants/DbConstants";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });
    const userId = session?.sub;
    const id = req.query.id as string;

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      throw new Error(`Offer with ID ${id} not found.`);
    }
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { coins: true },
    });
    if (!user) {
      throw new Error(`Invalid session`);
    }
    if (offer.value > user.coins) throw new Error("Not enough money");
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          coins: { decrement: offer.value },
        },
      }),
      prisma.transaction.create({
        data: {
          userId,
          coins: -offer.value,
        },
      }),
    ]);
    res.status(200).json({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
