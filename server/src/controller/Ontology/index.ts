import { Request, Response } from 'express'
import { getFundOntology } from '../../service/Fund'

export async function getOntologyFund(req: Request, res: Response) {
  const loss: number = Number(req.query.loss)
  const profit: number = Number(req.query.profit)
  const limit: number = Number(req.query.limit)
  const dividend: boolean = req.query.dividend === 'true' ? true : false
  try {
    const rlt = await getFundOntology(loss, profit, dividend, limit)
    return res.status(200).json(rlt)
  } catch (error) {
    return res.status(500).json(error)
  }
}
