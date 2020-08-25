import { LOG_IN_TEXT, LOG_OUT_TEXT } from '../actions/auth'

const defaultState = {
  isAuthenticated: false,
  token: null
  }

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN_TEXT:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case LOG_OUT_TEXT:
      return defaultState;
    default:
      return state;
  };
}
