// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { issueReviewContext } from "@/constants/openai";
import axios from "axios";
import findCounty from "@/lib/county";

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

    const imagesContent = photosUrl
      ? photosUrl.map((url: string) => ({
          type: "image_url",
          image_url: {
            url,
          },
        }))
      : [];
    const prompt = {
      role: "user",
      content: [
        {
          type: "text",
          text: JSON.stringify(req.body),
        },
        ...imagesContent,
      ],
    };
    console.log(prompt);
    let judgement = { isIssue: null, description: null };
    if (process.env.OPENAI_API_KEY) {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [...issueReviewContext, prompt],
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "content-Type": "application/json",
            authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      const responseContent = response.data.choices[0].message.content;
      if (responseContent) judgement = JSON.parse(responseContent);
    }

    console.log(judgement);
    const county = findCounty([longitude, latitude]);
    const issueData = {
      userId,
      latitude,
      longitude,
      locationType,
      category,
      priority,
      shortDescription,
      moreDetails,
      statusMessage: "",
      photosUrl,
      ...judgement,
      county,
    };

    let newIssue = await prisma.issue.create({
      data: issueData,
    });

    res
      .status(200)
      .json({ id: newIssue.id, message: "issue successfully created" });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
}
