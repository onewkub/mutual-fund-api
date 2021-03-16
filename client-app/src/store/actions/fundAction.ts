import { httpRequest } from 'lib/api'

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
}

export interface IFundSet {
  fix_income_fund: IFund
  equity_fund: IFund
  other_fund: IFund
}

export const fetchFundSetBegin = () => ({
  type: FETCH_FUND_SET_BEGIN,
})

export const fetchFundSetSuccess = (fundSet: IFundSet) => ({
  type: FETCH_FUND_SET_SUCCESS,
  payload: fundSet,
})

export const fetchFundSetFailure = (err: Error) => ({
  type: FETCH_FUND_SET_FAILURE,
  payload: err,
})

export function fetchFundSet(loss: number, profit: number, dividend: boolean) {
  return async (dispatch: any) => {
    dispatch(fetchFundSetBegin())
    try {
      const res = await httpRequest.get<IFundSet>('/optimal_fund', {
        params: {
          loss,
          profit,
          dividend,
        },
      })
      console.log(res.data)
      return dispatch(fetchFundSetSuccess(res.data))
    } catch (err) {
      return dispatch(fetchFundSetFailure(err))
    }
  }
}
// eslint-disable-next-line
export type fetchFundSet = (
  loss: number,
  profit: number,
  dividend: boolean,
) => any
