export const LOG_IN_TEXT = 'LOG_IN'
export const LOG_OUT_TEXT = 'LOG_OUT'

export const logIn = token => ({
  type: LOG_IN_TEXT,
  payload: token
})

export const logOut = token => ({
  type: LOG_OUT_TEXT,
  payload: token
})
