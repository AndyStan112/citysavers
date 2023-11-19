// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/util";
import { P_TO_ISSUE } from "@/constants/DbConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, issueId, priority } = req.body;
    const status = req.query.status as string;
    if (!["rejected", "approved"].includes(status))
      throw new Error("Status not allowed");
    // const issueId = "clp59ehpm000ehs6b9wzxfhdq";
    // const priority = "medium";
    // const userId = "clp59dk0d000ahs6b0hgvaoxg";
    //const status = "approved";
    if (!isAdmin(userId)) throw new Error("User not admin");
    // @ts-ignore
    const coins = P_TO_ISSUE[priority];
    console.log(coins);
    const STATUS_TO_COIN_CHANGE = {
      rejected: { decrement: coins },
      approved: { increment: coins },
    };
    const sign = status === "approved" ? 1 : -1;
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
        //@ts-ignore
        data: { coins: STATUS_TO_COIN_CHANGE[status] },
      }),
      prisma.transaction.create({
        data: {
          coins: coins * sign,
          issue: { connect: { id: issueId } },
        },
      }),
    ]);
    res.status(200).json({ name: "John Doe" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
