import { Request, Response } from 'express'
import prisma from '../../lib/prisma'

export async function getFund(req: Request, res: Response) {
  const project_id = req.query.project_id as string
  if (project_id) {
    const rlt = await prisma.fund.findUnique({
      where: {
        projid: project_id,
      },
    })
    return res.json(rlt)
  } else {
    const rlt = await prisma.fund.findMany()
    return res.json(rlt)
  }
}
