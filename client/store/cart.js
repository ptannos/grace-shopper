import axios from "axios";
const TOKEN = "token";

//Action types
const SET_CART = "SET_CART";

//Action creators
const setCart = (cart) => ({
  type: SET_CART,
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

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
