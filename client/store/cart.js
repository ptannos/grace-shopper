import axios from "axios";

const TOKEN = "token";

//Constants
const LOAD_USER_CART = "LOAD_USER_CART";
const ADD_TO_CART = "ADD_TO_CART";
const SUBTRACT_FROM_CART = "SUBTRACT_FROM_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

//Actions
const loadUserCart = (cartItems) => ({
  type: LOAD_USER_CART,
  cartItems,
});

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
export const _loadUserCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.get("/api/cart", {
      headers: {
        authorization: token,
      },
    });
    const products = data.products;
    products.map((item) => {
      item.count = item.orderedItem.itemQty;
      item.subtotal = item.price * item.count;
    });
    dispatch(loadUserCart(products));
    localStorage.setItem("cartItems", JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

export const _saveUserCart = (cartItems) => async (dispatch, getState) => {
  try {
    //const cart = getState().cart.cartItems.slice();
    const token = window.localStorage.getItem(TOKEN);
    await axios.put("/api/cart", {
      headers: {
        authorization: token,
      },
      body: cartItems,
    });
  } catch (err) {
    console.log(err);
  }
};

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

export const _clearCart = () => (dispatch) => {
  dispatch(clearCart());
  localStorage.clear("cartItems");
};

//Reducer
export default function (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) {
  switch (action.type) {
    case LOAD_USER_CART:
      return { cartItems: action.cartItems };
    case ADD_TO_CART:
      return { cartItems: action.cartItems };
    case SUBTRACT_FROM_CART:
      return { cartItems: action.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.cartItems };
    case CLEAR_CART:
      return { cartItems: [] };
    default:
      return state;
  }
}
