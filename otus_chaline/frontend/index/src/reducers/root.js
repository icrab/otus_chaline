import { authReducer } from './auth'
import { popUpReducer } from './popup'
import { orderReducer } from './order'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  popup: popUpReducer,
})
