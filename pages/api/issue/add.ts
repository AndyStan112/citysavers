// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { issueReviewContext } from "@/constants/openai";
import axios from "axios";

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

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      issueReviewContext,
      {
        headers: {
          "content-Type": "application/json",
          authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    let judgement = JSON.parse(response.data.choices[0].content);
    console.log(judgement);
    if (!judgement || !judgement.isSaved || !judgement.description) {
      console.log("Invalid ai judgement");
      judgement = { isIssue: null, description: null };
    }

    let newIssue = await prisma.issue.create({
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
        ...judgement,
      },
    });

    res
      .status(200)
      .json({ id: newIssue.id, message: "issue successfully created" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
