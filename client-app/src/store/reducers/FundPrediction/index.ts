import {
  FETCH_FUND_PREDICT_BEGIN,
  FETCH_FUND_PREDICT_FAILURE,
  FETCH_FUND_PREDICT_SUCCESS,
  IPredictFund,
} from 'store/actions/fundPredicAction'

interface IState {
  items: IPredictFund[]
  loading: boolean
  error: Error | null
}

interface IAction {
  type: string
  payload: any
}

const initial_state: IState = {
  items: [],
  loading: false,
  error: null,
}

export default function fundPredictionReducer(
  state = initial_state,
  action: IAction,
) {
  switch (action.type) {
    case FETCH_FUND_PREDICT_BEGIN:
      return { ...state, loading: true, error: null }
    case FETCH_FUND_PREDICT_SUCCESS:
      return { ...state, loading: false, items: action.payload }
    case FETCH_FUND_PREDICT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      }
    default:
      return state
  }
}
