import axios from "axios";
const TOKEN = "token";

//Action types
const SET_CART = "SET_CART";
const GET_GUEST_CART = "GET_GUEST_CART";
const SAVE_GUEST_CART = "SAVE_GUEST_CART";

//Action creators
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

const getGuestCart = (cart) => ({
  type: GET_GUEST_CART,
  cart,
});

const saveGuestCart = (cart) => ({
  type: SAVE_GUEST_CART,
  cart,
});

//Thunks
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get("/api/cart", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchGuestCart = () => {
  return async (dispatch) => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("cart"));
      dispatch(getGuestCart(guestCart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _saveGuestCart = (cart) => {
  return async (dispatch) => {
    try {
      const guestCart = JSON.stringify(localStorage.setItem("cart", cart));
      dispatch(saveGuestCart(guestCart));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case GET_GUEST_CART:
      return action.cart;
    case SAVE_GUEST_CART:
      return action.cart;
    default:
      return state;
  }
}
