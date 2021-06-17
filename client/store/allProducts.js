import axios from "axios";

//action type
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const CREATE_SINGLE_PRODUCT = "CREATE_SINGLE_PRODUCT";
const DELETE_SINGLE_PRODUCT = "DELETE_SINGLE_PRODUCT";

//action creator
const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

const createSingleProduct = (product) => ({
  type: CREATE_SINGLE_PRODUCT,
  product,
});

const deleteSingleProduct = (product) => ({
  type: DELETE_SINGLE_PRODUCT,
  product,
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

export const postSingleProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/products`);
      dispatch(createSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteSingleProduct(data));
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
    case CREATE_SINGLE_PRODUCT:
      return [...state, action.product];
    case DELETE_SINGLE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
