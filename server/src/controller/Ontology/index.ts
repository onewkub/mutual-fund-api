import { Request, Response } from 'express'
import { getFundOntology } from '../../service/Fund'

export async function getOntologyFund(req: Request, res: Response) {
  const loss: number = Number(req.query.loss)
  const dividend: boolean = req.query.dividend === 'true' ? true : false

  const rlt = await getFundOntology(loss, dividend)

  res.json(rlt)
}
