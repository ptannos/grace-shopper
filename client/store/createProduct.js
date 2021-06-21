import axios from "axios";

const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const {data} = await axios.post('/api/products', product);
    dispatch(_createProduct(data));
    history.push('/products')
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
};
