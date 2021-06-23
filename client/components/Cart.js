import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _addToUserCart,
  _subtractFromUserCart,
  _loadUserCart,
} from "../store/cartUser";
import {
  _addToCart,
  _removeFromCart,
  _subtractFromCart,
} from "../store/cartGuest";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) this.props.getUserCart();
  }

  render() {
    const { name } = this.props;
    const cartItems = this.props.cart || [];

    return (
      <div className="cart" name={name}>
        <h3>Plate Hopper's Shopping Cart</h3>
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
                  }
                >
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
          <Link to="/checkout">
            <button>Proceed to checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapGuest = (state) => {
  return {
    name: "guest",
    cart: state.cartGuest,
  };
};

const mapUser = (state) => {
  return {
    name: "user",
    cart: state.cartUser,
  };
};

const mapGuestDispatch = (dispatch) => {
  return {
    removeSingleProduct: (product) => dispatch(_subtractFromCart(product)),
    deleteProduct: (product) => dispatch(_removeFromCart(product)),
    addProduct: (product) => dispatch(_addToCart(product)),
  };
};

const mapUserDispatch = (dispatch) => {
  return {
    getUserCart: () => dispatch(_loadUserCart()),
    removeSingleProduct: (product) => dispatch(_subtractFromUserCart(product)),
    deleteProduct: (product) => dispatch(_subtractFromUserCart(product)),
    addProduct: (product) => dispatch(_addToUserCart(product)),
  };
};

export const GuestCart = connect(mapGuest, mapGuestDispatch)(Cart);
export const UserCart = connect(mapUser, mapUserDispatch)(Cart);
