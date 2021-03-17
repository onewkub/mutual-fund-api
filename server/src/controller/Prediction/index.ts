import { Request, Response } from 'express'
import { getPredictionAI } from '../../service/Prediction'
import { getNAVfromCurrentToRegist } from '../../service/SEC'

export async function getPrediction(req: Request, res: Response) {
  const project_id = req.query.project_id as string
  const period_year = Number(req.query.year)
  try {
    const data_price = await getNAVfromCurrentToRegist(project_id)
    // console.log(data_price)
    const predict_res = await getPredictionAI(data_price, period_year)
    const predict_data = predict_res
    res.status(200).json({ ...predict_data, project_id })
    // res.status(200).json('Okay')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

  // console.log(predict_res)
}
