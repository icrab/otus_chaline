import {
  CREATE_ORDER_TEXT,
  ADD_PRODUCT_TEXT,
  UPDATE_PRODUCT_TEXT,
  DELETE_PRODUCT_TEXT,
  DELETE_ORDER_TEXT
} from '../actions/order'

const defaultState = {
  hasOrder: false,
  order_id: null,
  product_count: 0,
  products: null
  }

export const orderReducer = (state = defaultState, action) => {
  switch ('reducer', action.type) {
    case CREATE_ORDER_TEXT:
      return {
        ...state,
        hasOrder: true,
        order_id: action.payload.order_id,
        product_count: action.payload.product_count,
        products: action.payload.product
      };
    case ADD_PRODUCT_TEXT:
      return {
        ...state,
        product_count: state.product_count + 1,
        products: [...state.products, action.payload.product],
      };
    case UPDATE_PRODUCT_TEXT:
      return {
        ...state,
        products: state.products.map(state_product => {
            if (state_product.tea.id == action.payload.product.tea.id){
              return {
                ...state_product,
                count: action.payload.product.count
              }
            }
            return state_product
          })
        }
    case DELETE_PRODUCT_TEXT:
      return {
        ...state,
        product_count: state.product_count - 1,
        products: state.products.filter(product => product.tea.id !== action.payload.product.tea.id ),
      };
    case DELETE_ORDER_TEXT:
      return {
        ...state,
        hasOrder: false,
        order_id: null,
        product_count: null,
        products: null,
      }
    default:
      return state;
  };
}
