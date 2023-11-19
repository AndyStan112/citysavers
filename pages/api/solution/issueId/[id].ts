import { PanoramaSharp } from "@mui/icons-material";
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const solution = await prisma.solution.findUniqueOrThrow({
      //@ts-ignore
      where: { issueId: req.query.id },
    });
    res.status(200).json({ ...solution });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
