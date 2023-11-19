import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { Issue } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, latitude, longitude } =
      (await prisma.issue.findMany()) as unknown as Issue;
    res.status(200).json({ id: id, latitude: latitude, longitude: longitude });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
