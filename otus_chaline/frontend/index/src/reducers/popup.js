import { TOGGLE_POPUP_LOGIN_TEXT, TOGGLE_POPUP_ORDER_TEXT } from '../actions/popup'

const defaultState = {
  loginVisible: false,
  orderVisible: false
  }

export const popUpReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP_LOGIN_TEXT:
      return {
        ...state,
        loginVisible: !state.loginVisible,
      };
    case TOGGLE_POPUP_ORDER_TEXT:
      return {
        ...state,
        orderVisible: !state.orderVisible,
      }
    default:
      return state;
  };
}
