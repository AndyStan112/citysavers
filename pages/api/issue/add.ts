// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
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
      userId: "colega",
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
}
