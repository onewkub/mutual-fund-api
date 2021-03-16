import { Request, Response } from 'express'
import { getFundSQL } from '../../service/Fund'

export async function getFund(req: Request, res: Response) {
  const project_id = req.query.project_id as string
  const rlt = await getFundSQL(project_id)
  res.json(rlt)
}
