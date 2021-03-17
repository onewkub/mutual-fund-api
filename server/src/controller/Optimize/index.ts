import { Request, Response } from 'express'
import { getOptimalFund } from '../../service/Optimize'

export async function getOptimalFundSet(req: Request, res: Response) {
  const loss: number = Number(req.query.loss)
  const profit: number = Number(req.query.profit)
  const dividend: boolean = req.query.dividend === 'true' ? true : false
  try {
    const rlt = await getOptimalFund(loss, profit, dividend)
    res.status(200).json(rlt)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
