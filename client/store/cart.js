import axios from "axios";

//action type
const GET_CART = "GET_CART";

//action creator
const getCart = (items) => ({
  type: GET_CART,
  items,
});

//thunk
export const fetchCart = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${orderId}`);
      console.log(data);
      dispatch(getCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.items;
    default:
      return state;
  }
}
