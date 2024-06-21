import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });
    const issues = await prisma.savedIssue.findMany({
      include: { issue: true },
      where: { userId: session?.sub },
    });

    res.status(200).json(issues.map((savedIssue) => savedIssue.issue));
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
