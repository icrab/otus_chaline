export const TOGGLE_POPUP_LOGIN_TEXT = 'TOGGLE_LOGIN'
export const TOGGLE_POPUP_ORDER_TEXT = 'TOGGLE_ORDER'
export const HIDE_ALL_POPUP_ORDER_TEXT = 'HIDE_ALL'

export const toggleLogin = () => ({
  type: TOGGLE_POPUP_LOGIN_TEXT
})

export const toggleOrder = () => ({
  type: TOGGLE_POPUP_ORDER_TEXT
})

export const hideAll = () => ({
  type: HIDE_ALL_POPUP_ORDER_TEXT
})
