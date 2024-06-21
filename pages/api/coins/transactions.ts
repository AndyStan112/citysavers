import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
type Data = {
  coins: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const id = req.body.id as string;
  if (!id) throw new Error("Invallid id");

  try {
    const transactions = await prisma.transaction.findMany({
      where: { id },
      orderBy: { date: "desc" },
    });
    if (!user) throw new Error("Not found");
    res.status(200).json({ transactions } as Data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
