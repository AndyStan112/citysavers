import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
type Data = {
  id: string;
  longitude: number;
  latitude: number;
  status: string;
  statusMessage: string;
  category: string;
  photosUrl: string[];
  dateAdded: Date | null;
  locationType: string;
  moreDetails: string | null;
  shortDescription: string;
  isSaved: boolean;
  userId: string;
  priority: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const session = await getToken({ req });
  // if (!session) throw new Error("Session null");
  const id = req.query.id as string;

  try {
    const issue = await prisma.issue.findUnique({ where: { id } });
    let savedCount = 0;
    if (session) {
      savedCount = await prisma.savedIssue.count({
        where: {
          userId: session.id as string,
          issueId: id,
        },
      });
    }

    if (!issue) throw new Error("Issue not found");
    res.status(200).json({ ...issue, isSaved: savedCount === 1 } as Data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
