import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import GuestCart from "./components/GuestCart";
import UserCart from "./components/UserCart";
import CreateProduct from "./components/CreateProduct";
import { UserCheckout, GuestCheckout } from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import AllUsers from "./components/AllUsers";
import { Login, Signup } from "./components/AuthForm";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        {isAdmin ? (
          <Switch>
            <Route path="/users" component={AllUsers} />
            {/* <Route exact path="/products/create" component={CreateProduct} /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/users">This page is for our eyes only.</Route>
            {/* <Route exact path="/products/create">
              This page is for our eyes only.
            </Route> */}
          </Switch>
        )}
        {isLoggedIn ? (
          <Switch>
            {/* <Redirect to="/" /> */}
            <Route path="/cart" component={UserCart}></Route>
            <Route path="/checkout" component={UserCheckout}></Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={GuestCart} />
            <Route path="/checkout" component={GuestCheckout}></Route>
          </Switch>
        )}

        <Switch>
          <Route exact path="/" component={AllProducts} />
          <Route exact path="/products/create" component={CreateProduct} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route path="/confirmation" component={Confirmation} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
