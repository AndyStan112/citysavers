import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
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
  userId: string;
  priority: string;
  issueCategoryId: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const id = req.query.id as string;
  try {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) throw new Error("Not found");
    res.status(200).json(issue);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
