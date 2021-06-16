import axios from "axios";

//action type
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

//action creator
const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products
});

//thunk
export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/`);
      dispatch(getAllProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
