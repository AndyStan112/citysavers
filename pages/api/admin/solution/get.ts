// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/checkAdmin";
import { STATUSES } from "@/constants/DbConstants";

const getSolutions = async (type: string) => {
  if (type === "all")
    return prisma.solution.findMany({ where: { NOT: { status: "rejected" } } });
  if (STATUSES.includes(type))
    return prisma.solution.findMany({ where: { status: type } });
  throw new Error("Invalid type");
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const type = req.query.type as string;
    const userId = req.body.id;
    if (!isAdmin(userId)) throw new Error("User not admin");

    const solutions = await getSolutions(type);
    res.status(200).json(solutions);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
