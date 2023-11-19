// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //  userId: session?.user.id,
  //     issueId: params.issueId,
  //     shortDescription: shortDescription,
  //     moreDetails: moreDetails,
  //     photosUrl: photoFileList,
  try {
    const { userId, issueId, shortDescription, photosUrl } = req.body;
    const newIssue = await prisma.solution.create({
      data: {
        userId,
        issueId,
        description: shortDescription,
        statusMessage: "",
        photosUrl: photosUrl,
      },
    });
    res
      .status(200)
      .json({ id: newIssue.id, message: "solution successfully created" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
