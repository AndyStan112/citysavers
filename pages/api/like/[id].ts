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
    let likedCount = 0;
    if (session) {
      likedCount = await prisma.savedIssue.count({
        where: {
          userId: session.id as string,
          issueId: id,
        },
      });
    }

    if (likedCount === 0) throw new Error("already liked");
    const transaction = [
      prisma.likedIssue.create({
        data: { issueId: id, userId: session?.id as string },
      }),
      prisma.issue.update({ where: { id }, data: { likes: { increment: 1 } } }),
    ];
    await prisma.$transaction(transaction);

    res.status(200).json({});
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
