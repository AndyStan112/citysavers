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
    const status = req.query.status as string;
    if (!["rejected", "approved", "wip"].includes(status))
      throw new Error("Status not allowed");
    if (!isAdmin(userId)) throw new Error("User not admin");
    const coins = P_TO_ISSUE[priority as Priority];
    console.log(coins);
    const STATUS_TO_COIN_CHANGE = {
      rejected: { decrement: coins },
      approved: { increment: coins },
    };
    const sign = status in ["approved", "wip"] ? 1 : -1;
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      include: { reportedBy: true },
    });

    if (!issue) {
      throw new Error(`Issue with ID ${issueId} not found.`);
    }

    const reportedById = issue.reportedBy.id;
    await prisma.$transaction([
      prisma.issue.update({
        where: { id: issueId },
        data: { status },
      }),
      prisma.user.update({
        where: { id: reportedById },
        data: {
          coins: STATUS_TO_COIN_CHANGE[status as StatusMod],
          points: { increment: status != "rejected" ? coins * 2.3 : 0 },
        },
      }),
      prisma.transaction.create({
        data: {
          userId,
          coins: coins * sign,
        },
      }),
    ]);
    res.status(200).json({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
