export const CREATE_ORDER_TEXT = 'CREATE_ORDER'
export const ADD_PRODUCT_TEXT ='ADD_PRODUCT'
export const UPDATE_PRODUCT_TEXT ='UPDATE_PRODUCT'
export const DELETE_PRODUCT_TEXT ='DELETE_PRODUCT'
export const DELETE_ORDER_TEXT = 'DELETE_ORDER'
export const REPLACE_ORDER_TEXT = 'REPLACE_ORDER'

export const createOrder = (order_id, product_count, product) => ({
  type: CREATE_ORDER_TEXT,
  payload: { order_id, product_count, product }
})

export const addProduct = (product) => ({
  type: ADD_PRODUCT_TEXT,
  payload: {product}
})

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT_TEXT,
  payload: {product}
})

export const deleteProduct = (product) => ({
  type: DELETE_PRODUCT_TEXT,
  payload: {product}
})

export const replaceOrder = (order_id) => ({
  type: REPLACE_ORDER_TEXT,
  payload: {order_id}
})

export const deleteOrder = () => ({
  type: DELETE_ORDER_TEXT,
})
