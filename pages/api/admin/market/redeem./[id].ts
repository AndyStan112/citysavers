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
    const { issueId, priority } = req.body;
    const id = req.query.id as string;

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      throw new Error(`Offer with ID ${id} not found.`);
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          coins: { decrement: offer.value },
        },
      }),
      prisma.transaction.create({
        data: {
          coins: -offer.value,
        },
      }),
    ]);
    res.status(200).json({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
