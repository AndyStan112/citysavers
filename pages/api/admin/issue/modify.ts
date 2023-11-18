// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { isAdmin } from "@/lib/checkAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      userId,
      issueId,
      category,
      latitude,
      longitude,
      moreDetails,
      status,
      statusMessage,
      shortDescription,
      photosUrl,
      locationType,
      priority,
    } = req.body;

    if (!isAdmin(userId)) throw new Error("User not admin");

    await prisma.issue.update({
      where: { id: issueId },
      data: {
        latitude,
        status,
        longitude,
        locationType,
        category,
        priority,
        shortDescription,
        moreDetails,
        statusMessage,
        photosUrl,
      },
    });
    res.status(200).json({ name: "John Doe" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
