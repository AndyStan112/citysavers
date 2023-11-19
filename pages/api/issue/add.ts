// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      userId,
      category,
      latitude,
      longitude,
      moreDetails,
      shortDescription,
      photosUrl,
      locationType,
      priority,
    } = req.body;
    await prisma.issue.create({
      data: {
        userId,
        latitude,
        longitude,
        locationType,
        category,
        priority,
        shortDescription,
        moreDetails,
        statusMessage: "",
        photosUrl: photosUrl,
      },
    });
    res.status(200).json({ "successfully created issue" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
