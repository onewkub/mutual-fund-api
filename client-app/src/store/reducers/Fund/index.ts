import { IForm } from 'interface'
import {
  FETCH_FUND_SET_BEGIN,
  FETCH_FUND_SET_FAILURE,
  FETCH_FUND_SET_SUCCESS,
  IFund,
} from 'store/actions/fundAction'
import { IPredictFund } from 'store/actions/fundPredicAction'

interface IState {
  items: IFund[] | null
  predict_items: IPredictFund[] | null
  parameter: IForm | null
  loading: boolean
  error: Error | null
}

interface IAction {
  type: string
  payload: any
}

const initial_state: IState = {
  items: null,
  predict_items: null,
  parameter: null,
  loading: false,
  error: null,
}

export default function fundReducer(
  state: IState = initial_state,
  action: IAction,
) {
  switch (action.type) {
    case FETCH_FUND_SET_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_FUND_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.fundSet,
        predict_items: action.payload.fundPredict,
        parameter: action.payload.input,
      }
    case FETCH_FUND_SET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: null,
      }
    default:
      return state
  }
}
