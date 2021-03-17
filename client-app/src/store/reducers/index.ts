import { combineReducers } from 'redux'
import FundSet from './Fund'
// import FundPredict from './FundPrediction'

const RootReducer = combineReducers({ FundSet,  })

export type RootState = ReturnType<typeof RootReducer>
export default RootReducer
