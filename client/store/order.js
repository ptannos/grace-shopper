import axios from "axios";

// action
const CREATE_ORDER = "CREATE_ORDER";

// action creator
const createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

// thunk
export const _createOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartItems = getState().cart.cartItems.slice();
      const { data } = await axios.post(`/api/order`, cartItems);
      dispatch(createOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return [...state, action.order];
    default:
      return state;
  }
}
