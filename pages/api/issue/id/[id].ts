// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../../lib/prismadb"
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id =  req.query.id;
  try{
    const issue = await prisma.issue.findUnique({where: {id}});
    if(!issue)throw new Error("No issues with id found")
    res.status(200).json(issue);
  }catch(e:any){
    res.status(400).json({error: e.message})
  }
}
