import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  _loadUserCart,
  _addToUserCart,
  _subtractFromUserCart,
  _deleteFromUserCart,
  _clearUserCart,
} from "../store/cartUser"

class UserCart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserCart()
  }

  render() {
    const cartItems = this.props.cart || []

    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th></th>
              <th>Qty</th>
              <th></th>
              <th>Price</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
            {cartItems.map((item) => {
              const { id, name, price, subtotal, count, quantity } = item
              return (
                <tr key={item.id}>
                  <td>{name}</td>
                  <td onClick={() => this.props.removeProduct({ id, price })}>
                    {count > 0 ? <button> - </button> : ""}
                  </td>
                  <td>{count}</td>
                  <td onClick={() => this.props.addProduct({ id, price })}>
                    {quantity > 0 ? <button> + </button> : ""}
                  </td>
                  <td id="cart-price">${price}.00</td>
                  <td id="cart-price">${subtotal}.00</td>
                  <td onClick={() => this.props.deleteProduct(id)}>
                    {count > 0 ? <button> Delete </button> : ""}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td id="cart-price">
                Total price:{" "}
                <strong id="totalPrice">
                  $
                  {cartItems.reduce((total, item) => {
                    return item.subtotal + total
                  }, 0)}
                  .00
                </strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="cart-buttons">
          <Link to="/">
            <button>Continue shopping</button>
          </Link>
          <button
            className="tiny secondary"
            id="clear"
            onClick={() => this.props.clearCart()}
          >
            Clear the cart
          </button>
          <Link to="/checkout">
            <button>Proceed to checkout</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapUser = (state) => {
  return {
    name: "user",
    cart: state.cartUser,
  }
}

const mapUserDispatch = (dispatch) => {
  return {
    getUserCart: () => dispatch(_loadUserCart()),
    removeProduct: (product) => dispatch(_subtractFromUserCart(product)),
    addProduct: (product) => dispatch(_addToUserCart(product)),
    deleteProduct: (id) => dispatch(_deleteFromUserCart(id)),
    clearCart: () => dispatch(_clearUserCart()),
  }
}

export default connect(mapUser, mapUserDispatch)(UserCart)
