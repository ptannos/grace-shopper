//Constants
const ADD_TO_CART = "ADD_TO_CART";
const SUBTRACT_FROM_CART = "SUBTRACT_FROM_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

//Actions
const addToCart = (cartItems) => ({
  type: ADD_TO_CART,
  cartItems,
});

const subtractFromCart = (cartItems) => ({
  type: SUBTRACT_FROM_CART,
  cartItems,
});

const removeFromCart = (cartItems) => ({
  type: REMOVE_FROM_CART,
  cartItems,
});

const clearCart = () => ({
  type: CLEAR_CART,
});

//Thunks
export const _addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cartGuest.slice();
  let cartExists = false;
  cartItems.forEach((item) => {
    if (item.id === product.id) {
      cartExists = true;
      item.count++;
      item.subtotal = item.price * item.count;
    }
  });
  if (!cartExists) {
    cartItems.push({
      ...product,
      count: 1,
      subtotal: product.price,
    });
  }
  dispatch(addToCart(cartItems));
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const _subtractFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cartGuest.slice();
  cartItems.forEach((item) => {
    if (item.id === product.id) {
      item.count--;
      item.subtotal = item.price * item.count;
    }
  });
  dispatch(subtractFromCart(cartItems));
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const _removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cartGuest.slice()
    .filter((item) => item.id !== product.id);
  dispatch(removeFromCart(cartItems));
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const _clearCart = () => (dispatch) => {
  dispatch(clearCart());
  localStorage.clear("cart");
};

//Reducer
export default function (
  state = JSON.parse(localStorage.getItem("cart")) || [],
  action
) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cartItems;
    case SUBTRACT_FROM_CART:
      return action.cartItems;
    case REMOVE_FROM_CART:
      return action.cartItems;
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
