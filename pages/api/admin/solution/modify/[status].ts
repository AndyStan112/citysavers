// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/util";
import {
  P_TO_ISSUE,
  P_TO_SOLUTION,
  Priority,
  StatusMod,
} from "@/constants/DbConstants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, solutionId, issueId, priority } = req.body;
    const status = req.query.status as string;
    if (!["rejected", "approved"].includes(status))
      throw new Error("Status not allowed");
    // const issueId = "clp59ehpm000ehs6b9wzxfhdq";
    // const priority = "medium";
    // const userId = "clp59dk0d000ahs6b0hgvaoxg";
    // const solutionId = "test";
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
        data: { coins: STATUS_TO_COIN_CHANGE[status as StatusMod] },
      }),
      prisma.transaction.create({
        data: {
          coins: coins * sign,
          solution: { connect: { id: solutionId } },
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
