import axios from "axios";
const TOKEN = "token"

const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export const createProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const {data} = await axios.post('/api/products', product, {
          headers: {
            authorization: token
          },
        });
        dispatch(_createProduct(data));
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
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
