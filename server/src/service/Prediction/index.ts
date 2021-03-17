import { httprequest_prediction } from '../../lib/prediction_api'

export async function getPredictionAI(
  price_data: {
    date: string[]
    nav: number[]
  },
  period_year: number,
) {
  try {
    const res = await httprequest_prediction.post<{
      date: string[]
      nav: number[]
    }>('/predict_price', price_data, {
      params: { day: period_year * 360 },
    })
    // console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    return err
  }
}
