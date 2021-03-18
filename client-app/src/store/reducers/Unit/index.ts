import { CHANGE_UNIT } from 'store/actions/unitAction'

interface IState {
  units: any
}

interface IAction {
  type: string
  payload: any
}

const initial_state: IState = {
  units: undefined,
}

export default function unitReducer(
  state: IState = initial_state,
  action: IAction,
) {
  switch (action.type) {
    case CHANGE_UNIT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
