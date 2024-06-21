import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const t = [
    {
      name: "20% discount at Good Coffee",
      partner: "Good Coffee Inc.",
      value: 500,
      description:
        "Get 20% on 5 coffees, limit of 1 per day. Terms and conditions apply. Check our website http://goodcoffeeinc.com for more details.",
    },
    {
      name: "10% discount on one order",
      partner: "Best Pizza",
      value: 100,
      description:
        "Get 10% discount on one order at Best Pizza. Limited to pizzas. Terms and conditions apply.",
    },
    {
      name: "Get 1+1 burger",
      partner: "Burger Queen",
      value: 1000,
      description:
        "Get one free burger when ordering a burger. Available on tuesdays only. Limit one offer per person. Terms and conditions apply.",
    },
    {
      name: "5% discount for a massage session",
      partner: "Twenty One Sailors",
      value: 50,
      description:
        "Get 5% discount for a massage session. 2 hours mininum. Limited to one discount per week. Terms and conditions apply.",
    },
  ];
  const test = await prisma.offer.createMany({ data: t });
  res.status(200).json({ name: test });
}
