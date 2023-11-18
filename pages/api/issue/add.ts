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
      photos,
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
        photosUrl: [
          "https://lh3.googleusercontent.com/a/ACg8ocKs_gmz-cHo90Q18-J1iSjm58dJoEiCh2kRBoi3YRD7sPGy=s96-c",
          "https://lh3.googleusercontent.com/a/ACg8ocKs_gmz-cHo90Q18-J1iSjm58dJoEiCh2kRBoi3YRD7sPGy=s96-c",
        ],
      },
    });
    res.status(200).json({ name: "John Doe" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
