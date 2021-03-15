import { Request, Response } from 'express'

export function getOntologyFund(req: Request, res: Response) {
  const loss: number = Number(req.query.loss)
  const dividend: boolean = Boolean(req.query.dividen)

  // const command = `
  // SELECT *
  // WHERE{
  //   ?fund mat:type mat:${di}
  // }
  // `
}
