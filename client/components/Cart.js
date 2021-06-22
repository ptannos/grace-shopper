import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _addToCart,
  _subtractFromCart,
  _removeFromCart,
  _loadUserCart,
  _saveUserCart,
} from "../store/cart";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    //if (this.props.isLoggedIn) this.props.getUserCart();
    this.setState((state, props) => ({
      cart: this.props.isLoggedIn
        ? props.getUserCart()
        : this.props.cart.cartItems,
    }));
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
  //     this.props.getUserCart();
  //   }
  // }

  render() {
    const cartItems =
      JSON.parse(window.localStorage.getItem("cartItems")) || [];
    //const cartItems = this.state.cart || [];
    //const cartItems = this.props.cart.cartItems;
    // const cartItems = this.props.isLoggedIn
    //   ? this.props.loadUserCart()
    //   : this.props.cart.cartItems;

    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th></th>
              <th>Count</th>
              <th></th>
              <th></th>
            </tr>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}.00</td>
                <td>${item.subtotal}.00</td>
                <td
                  onClick={
                    item.count <= 1
                      ? () => this.props.deleteProduct(item)
                      : () => this.props.removeSingleProduct(item)
                  }>
                  {item.count > 0 ? <button> - </button> : ""}
                </td>
                <td>{item.count}</td>
                <td onClick={() => this.props.addProduct(item)}>
                  {item.quantity > 0 ? <button> + </button> : ""}
                </td>
                <td onClick={() => this.props.deleteProduct(item)}>
                  {item.count > 0 ? <button> Delete </button> : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        Total price:{" "}
        <strong id="totalPrice">
          $
          {cartItems.reduce((total, item) => {
            return item.subtotal + total;
          }, 0)}
          .00
        </strong>
        <div className="row">
          <Link to="/">
            <button>Continue shopping</button>
          </Link>
          <button className="tiny secondary" id="clear">
            Clear the cart
          </button>
          {this.props.isLoggedIn ? (
            <button onClick={() => this.props.saveUserCart(cartItems)}>
              Save cart
            </button>
          ) : (
            ""
          )}
          <Link to="/checkout">
            <button>Proceed to checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  //const userCart = this.props.isLoggedIn ? _loadUserCart() : state.cart;
  return {
    cart: state.cart,
    product: state.singleProduct,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (product) => dispatch(_removeFromCart(product)),
    addProduct: (product) => dispatch(_addToCart(product)),
    removeSingleProduct: (product) => dispatch(_subtractFromCart(product)),
    getUserCart: () => dispatch(_loadUserCart()),
    saveUserCart: () => dispatch(_saveUserCart()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
