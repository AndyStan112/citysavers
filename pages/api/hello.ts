// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { extractIdFromUrl, generateUrlFromId } from "@/lib/util";
import bucket from "@/lib/bucket";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const { image } = req.body;
  const image =
    "https://lh3.googleusercontent.com/a/ACg8ocKs_gmz-cHo90Q18-J1iSjm58dJoEiCh2kRBoi3YRD7sPGy=s96-c";
  const fileName = uuidv4() + ".png";
  const file = bucket.file(fileName);
  const writeStream = file.createWriteStream();

  await fetch(image).then((res: any) => {
    res.body.pipe(writeStream);
  });

  const imageUrl = generateUrlFromId(fileName);
  res.status(200).json({ name: imageUrl });
}
