import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import { createOrder } from thunk

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: this.props.cart.cartItems.reduce((total, item) => {
        return item.subtotal + total;
      }, 0),
      totalQty: this.props.cart.cartItems.reduce((total, item) => {
        return item.count + total;
      }, 0),
      recipient: "",
      shippingAddress: "",
      status: "cart",
      products: this.props.cart.cartItems,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("Checkout state in handleChange: ", this.state);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log("Checkout state in handleSubmit: ", this.state);
    event.preventDefault();
    this.props.createNewOrder({ ...this.state });
  }

  render() {
    const cartItems = this.props.cart.cartItems || [];
    console.log("this.props.cart", this.props.cart);

    const totalPrice = cartItems.reduce((total, item) => {
      return item.subtotal + total;
    }, 0);

    return (
      <div>
        {cartItems ? (
          <div className="cart">
            <h2>Checkout</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                  <th>Count</th>
                </tr>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}.00</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            Order total:{" "}
            <strong id="totalPrice">
              ${totalPrice}
              .00
            </strong>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="recipient">
                    Recipient:
                    <input
                      type="text"
                      name="recipient"
                      value={this.state.recipient}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <label htmlFor="address">
                    Shipping address:
                    <input
                      type="text"
                      name="shippingAddress"
                      value={this.state.shippingAddress}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <div className="row">
                    <Link to="/cart">
                      <button>Back To Cart</button>
                    </Link>
                    <Link to="/confirmation">
                      <button type="submit">Place your order</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <h3>Nothing to checkout!</h3>
            <Link to="/cart">
              <button>Back To Cart</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("Checkout state in mapState: ", state);
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => ({
  createNewOrder: (order) => dispatch(createOrder(order)),
});

export default connect(mapState, mapDispatch)(Checkout);
