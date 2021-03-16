import { combineReducers } from 'redux'
import FundSet from './Fund'

const RootReducer = combineReducers({ FundSet })

export type RootState = ReturnType<typeof RootReducer>
export default RootReducer
