import axios from "axios";

const TOKEN = "token";

//Constants
const LOAD_USER_CART = "LOAD_USER_CART";
const ADD_TO_USER_CART = "ADD_TO_USER_CART"
const SUBTRACT_FROM_USER_CART = "SUBTRACT_FROM_USER_CART"

//Actions
const loadUserCart = (cartItems) => ({
  type: LOAD_USER_CART,
  cartItems,
});

const addToUserCart = (product) => ({
  type: ADD_TO_USER_CART,
  product
})

const subtractFromUserCart = (product) => ({
  type: SUBTRACT_FROM_USER_CART,
  product
})

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
  } catch (err) {
    console.log(err);
  }
};

export const _addToUserCart = (product) => async (dispatch) => {
  try {
    product.count++
    const token = window.localStorage.getItem(TOKEN);
    const {data} = await axios.put(`/api/cart/${product.id}`, product, {
      headers: {
        authorization: token,
      }
    })
    data.count = data.itemQty
    data.subtotal = data.itemQty * data.count
    dispatch(addToUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const _subtractFromUserCart = (product) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const {data} = await axios.delete(`/api/cart/${product.id}`, product, {
      headers: {
        authorization: token,
      }
    })
    dispatch(subtractFromUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_USER_CART:
      return action.cartItems;
    case ADD_TO_USER_CART:
      const newCart = state.filter((item) => item.id !== action.product.id)
      return [...newCart, action.product]
    case SUBTRACT_FROM_USER_CART:
      return state.filter((item) => item.id !== action.product.id)
    default:
      return state;
  }
}
