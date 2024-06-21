// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/util";
import { P_TO_SOLUTION, Priority, StatusMod } from "@/constants/DbConstants";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });
    const userId = session?.sub;
    const { solutionId, issueId, priority } = req.body;
    const status = req.query.status as string;
    if (!["rejected", "approved"].includes(status))
      throw new Error("Status not allowed");
    if (!isAdmin(userId)) throw new Error("User not admin");
    const coins = P_TO_SOLUTION[priority as Priority];
    console.log(coins);
    const STATUS_TO_COIN_CHANGE = {
      rejected: { decrement: coins },
      approved: { increment: coins },
    };
    const sign = status === "approved" ? 1 : -1;
    const solution = await prisma.solution.findUnique({
      where: { id: solutionId },
      select: { userId: true },
    });

    if (!solution) {
      throw new Error(`Solution with ID ${solutionId} not found.`);
    }

    const solverId = solution.userId;
    let transation = [
      prisma.solution.update({
        where: { id: solutionId },
        data: { status },
      }),
      prisma.user.update({
        where: { id: solverId },
        data: {
          coins: STATUS_TO_COIN_CHANGE[status as StatusMod],
          points: { increment: status != "rejected" ? coins * 2.3 : 0 },
        },
      }),
      prisma.transaction.create({
        data: {
          coins: coins * sign,
        },
      }),
    ];
    if (status === "approved")
      transation.push(
        prisma.issue.update({
          where: { id: issueId },
          data: { status: "solved" },
        }) as any
      );
    await prisma.$transaction(transation);
    res.status(200).json({ name: "John Doe" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
