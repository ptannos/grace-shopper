import axios from "axios";

const TOKEN = "token";

// action
const CREATE_ORDER = "CREATE_ORDER";
const FETCH_ORDERS = "FETCH_ORDERS";

// action creator
const createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

const fetchOrders = (orders) => ({
  type: FETCH_ORDERS,
  orders,
});

// thunk
export const _createOrder = (orderInfo, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put("/api/orders", orderInfo, {
        headers: {
          authorization: token,
        },
      });
      dispatch(createOrder(data));
      history.push("/confirmation");
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
};
export const _fetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/orders/user/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(fetchOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function (state = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return [...state, action.order];
    case FETCH_ORDERS:
      return { ...state, orders: action.orders };
    default:
      return state;
  }
}
