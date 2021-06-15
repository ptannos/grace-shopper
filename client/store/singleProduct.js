import axios from "axios";

//action type
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

//action creator
const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product,
});

//thunk
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(getSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
