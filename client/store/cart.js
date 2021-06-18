import axios from "axios";

//Constants
const ADD_TO_CART = "ADD_TO_CART";
const SUBTRACT_FROM_CART = "SUBTRACT_FROM_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

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

//Thunks
export const _addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
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
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const _addToUserCart = (cartItems) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.id;
    const token = window.localStorage.getItem("token");
    if (userId) {
      const { data } = await axios.put("/api/cart", cartItems, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addToCart(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const _subtractFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  cartItems.forEach((item) => {
    if (item.id === product.id) {
      item.count--;
      item.subtotal = item.price * item.count;
    }
  });
  dispatch(subtractFromCart(cartItems));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const _removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((item) => item.id !== product.id);
  dispatch(removeFromCart(cartItems));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

//Reducer
export default function (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.cartItems };
    case SUBTRACT_FROM_CART:
      return { cartItems: action.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.cartItems };
    default:
      return state;
  }
}
