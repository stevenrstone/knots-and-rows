// import { combineReducers } from 'redux';

const cartReducer = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case 'SET_CART_ID':
      newState = { ...newState, cartId: action.cartId };
      break;
    case 'SET_CLIENT':
      newState = { ...newState, client: action.client };
      break;
    case 'UPDATE_LINE_ITEMS':
      newState = { ...newState, lineItems: action.lineItems };
      break;
    default:
      break;
  }

  return newState;
};

// const addItemToCart = (state = {}, action) {

// }

// const removeItemFromCart = (state = {}, action) {

// }

// const updateItemQuantity = (state = {}, action) {

// }

// export default combineReducers({setCartIdReducer, addItemToCart, removeItemFromCart, updateItemQuantity})
export default cartReducer;
