import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req });
  // if (!session) throw new Error("Session null");
  const id = req.query.id as string;

  try {
    let savedCount = 1;
    if (session) {
      savedCount = await prisma.savedIssue.count({
        where: {
          userId: session.id as string,
          issueId: id,
        },
      });
    }

    if (savedCount === 1) throw new Error("already unsaved");

    const issue = await prisma.savedIssue.deleteMany({
      where: { issueId: id, userId: session?.id as string },
    });

    if (!issue) throw new Error("Issue not found");
    res.status(200).json({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
