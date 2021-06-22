import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProduct from "./singleProduct";
import allProducts from "./allProducts";
import cartGuest from "./cartGuest";
import cartUser from "./cartUser"
import order from "./order";
import allUsers from "./allUsers";

const reducer = combineReducers({
  auth,
  singleProduct,
  allProducts,
  cartGuest,
  cartUser,
  order,
  allUsers,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
