import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _addToCart,
  _subtractFromCart,
  _removeFromCart,
  _addToUserCart,
} from "../store/cart";

//import singleProduct from "../store/singleProduct";
//import { fetchCart, fetchGuestCart, _saveGuestCart } from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
  }
  //   handleClick(event) {
  //     console.log(event.target);
  //     this.props.addProduct();
  //     const cartItems = window.localStorage.getItem("cartItems");
  //     if (this.props.isLoggedIn) {
  //       this.props.addUserCart(cartItems);
  //     }
  //   }
  render() {
    const cartItems = this.props.cart.cartItems || [];
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

const mapState = (state) => {
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
    //addUserCart: (product) => dispatch(_addToUserCart(product)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
