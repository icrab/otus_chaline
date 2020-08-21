import { authReducer } from './auth'
import { orderReducer } from './order'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer
})
