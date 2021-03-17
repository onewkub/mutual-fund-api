import { IForm } from 'interface'
import { httpRequest } from 'lib/api'
import { IPredictFund } from './fundPredicAction'

export const FETCH_FUND_SET_BEGIN = 'FETCH_FUND_SET_BEGIN'
export const FETCH_FUND_SET_SUCCESS = 'FETCH_FUND_SET_SUCCESS'
export const FETCH_FUND_SET_FAILURE = 'FETCH_FUND_SET_FAILURE'

export interface IFund {
  project_id: string
  name: string
  profit: string
  draw_down: string
  sd: string
  risk: string
  max_profit: string
  min_profit: string
  percentage: number
  fund_type: string
}

// export interface IFundSet {
//   fix_income_fund: IFund
//   equity_fund: IFund
//   other_fund: IFund
// }

export const fetchFundSetBegin = () => ({
  type: FETCH_FUND_SET_BEGIN,
})

export const fetchFundSetSuccess = (payload: {
  fundSet: IFund[]
  fundPredict: IPredictFund[]
  input: IForm
}) => ({
  type: FETCH_FUND_SET_SUCCESS,
  payload,
})

export const fetchFundSetFailure = (err: Error) => ({
  type: FETCH_FUND_SET_FAILURE,
  payload: err,
})

export function fetchFundSet(input: IForm) {
  return async (dispatch: any) => {
    dispatch(fetchFundSetBegin())
    try {
      const res = await httpRequest.get<IFund[]>('/optimal_fund', {
        params: {
          loss: input.loss,
          profit: input.loss * 1.25,
          dividend: input.dividend,
        },
      })
      // console.log(res.data)
      const data = res.data.filter((element) => element.percentage > 0)
      const project_ids = data.map((element) => element.project_id)
      // console.log(project_ids)
      // console.log(input)
      const predict_res = await Promise.all(
        project_ids.map((project_id) =>
          httpRequest.get<IPredictFund>('/prediction_fund', {
            params: {
              project_id,
              year: input.year,
            },
          }),
        ),
      )
      // console.log(predict_res)
      const rlt = {
        fundSet: data,
        fundPredict: predict_res.map((element) => element.data),
        input,
      }
      // console.log(rlt)
      return dispatch(fetchFundSetSuccess(rlt))
    } catch (err) {
      return dispatch(fetchFundSetFailure(err))
    }
  }
}
// eslint-disable-next-line
export type fetchFundSet = (input: IForm) => any
