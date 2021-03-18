import { httpRequest } from 'lib/api'

export const FETCH_FUND_PREDICT_BEGIN = 'FETCH_FUND_PREDICT_BEGIN'
export const FETCH_FUND_PREDICT_SUCCESS = 'FETCH_FUND_PREDICT_SUCCESS'
export const FETCH_FUND_PREDICT_FAILURE = 'FETCH_FUND_PREDICT_FAILURE'

export interface IPredictFund {
  nav: number[]
  date: string[]
  project_id: string
}

export const fetchFundPredictBegin = () => ({
  type: FETCH_FUND_PREDICT_BEGIN,
})

export const fetchFundPredictSuccess = (value: any[]) => ({
  type: FETCH_FUND_PREDICT_SUCCESS,
  payload: value,
})

export const fetchFundPredictFailure = (err: Error) => ({
  type: FETCH_FUND_PREDICT_FAILURE,
  error: err,
})

export function fetchFundPredict(project_ids: string[], year: number) {
  return async (dispatch: any) => {
    dispatch(fetchFundPredictBegin())
    try {
      const res = await Promise.all(
        project_ids.map((project_id) =>
          httpRequest.post<IPredictFund>('/prediction_fund', null, {
            params: {
              project_id,
              year,
            },
          }),
        ),
      )
      const data = res.map((element) => element.data)
      dispatch(fetchFundPredictSuccess(data))
    } catch (err) {
      return dispatch(fetchFundPredictFailure(err))
    }
  }
}
