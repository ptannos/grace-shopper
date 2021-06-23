import axios from "axios"

const TOKEN = "token"

//Constants
const LOAD_USER_CART = "LOAD_USER_CART"
const ADD_TO_USER_CART = "ADD_TO_USER_CART"
const SUBTRACT_FROM_USER_CART = "SUBTRACT_FROM_USER_CART"
const DELETE_FROM_USER_CART = "DELETE_FROM_USER_CART"
const CLEAR_USER_CART = "CLEAR_USER_CART"

//Actions
const loadUserCart = (cartItems) => ({
  type: LOAD_USER_CART,
  cartItems,
})

const addToUserCart = (cartItems) => ({
  type: ADD_TO_USER_CART,
  cartItems,
})

const subtractFromUserCart = (cartItems) => ({
  type: SUBTRACT_FROM_USER_CART,
  cartItems,
})

const deleteFromUserCart = (cartItems) => ({
  type: DELETE_FROM_USER_CART,
  cartItems,
})

export const clearUserCart = () => ({
  type: CLEAR_USER_CART,
})

//Thunks
export const _loadUserCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get("/api/cart", {
      headers: {
        authorization: token,
      },
    })
    const products = data.products
    products.map((item) => {
      item.count = item.orderedItem.itemQty
      item.subtotal = item.price * item.count
    })
    dispatch(loadUserCart(products))
  } catch (err) {
    console.log(err)
  }
}

export const _addToUserCart = (product) => async (dispatch, getState) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.put(`/api/cart/products/add`, product, {
      headers: {
        authorization: token,
      },
    })
    const cartItems = getState().cartUser.slice()
    cartItems.map((item) => {
      if (item.id === data.productId) {
        item.count = data.itemQty
        item.subtotal = item.count * item.price
      }
    })
    dispatch(addToUserCart(cartItems))
  } catch (err) {
    console.log(err)
  }
}

export const _subtractFromUserCart =
  (product) => async (dispatch, getState) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      const { data } = await axios.put(`/api/cart/products/remove`, product, {
        headers: {
          authorization: token,
        },
      })
      const cartItems = getState().cartUser.slice()
      cartItems.map((item) => {
        if (item.id === data.productId) {
          item.count = data.itemQty
          item.subtotal = item.count * item.price
        }
      })
      dispatch(subtractFromUserCart(cartItems))
    } catch (err) {
      console.log(err)
    }
  }

export const _deleteFromUserCart =
  (productId) => async (dispatch, getState) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      const { data } = await axios.delete(`/api/cart/products/${productId}`, {
        headers: {
          authorization: token,
        },
      })
      console.log("DATA IN DELETE THUNK: ", data)
      const cartItems = getState()
        .cartUser.slice()
        .filter((item) => item.id !== data.productId)
      dispatch(deleteFromUserCart(cartItems))
    } catch (err) {
      console.log(err)
    }
  }

export const _clearUserCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    await axios.delete(`/api/cart`, {
      headers: {
        authorization: token,
      },
    })
    dispatch(clearUserCart())
  } catch (err) {
    console.log(err)
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_USER_CART:
      return action.cartItems
    case ADD_TO_USER_CART:
      return action.cartItems
    case SUBTRACT_FROM_USER_CART:
      return action.cartItems
    case DELETE_FROM_USER_CART:
      return action.cartItems
    case CLEAR_USER_CART:
      return []
    default:
      return state
  }
}
