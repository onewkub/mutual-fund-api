import {
  FETCH_FUND_SET_BEGIN,
  FETCH_FUND_SET_FAILURE,
  FETCH_FUND_SET_SUCCESS,
} from 'store/actions/fundAction'

interface IAction {
  type: string
  payload: any
}

const initial_state = {
  items: null,
  loading: false,
  error: null,
}

export default function fundReducer(state = initial_state, action: IAction) {
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
        items: action.payload,
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
