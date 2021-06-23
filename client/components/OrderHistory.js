import React from "react";
import { connect } from "react-redux";
import { _fetchOrders } from "../store/order";

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.isLoggedIn ? this.props.userId : null,
    };
  }
  componentDidMount() {
    // const userId = this.props.userId;
    console.log("type of this.props.userId", typeof userId);

    // this.props.loadOrders(this.props.userId);
    this.props.loadOrders(this.props.match.params.userId);
    console.log("props in comp did mount", this.props);
  }
  render() {
    console.log("props in order history!", this.props);
    const orders = this.props.orders || [];
    // if (this.props.auth.id !== Number(this.props.match.params.userId)) {
    //   return <p>Unauthorized.</p>;
    // } else
    if (orders.length === 0) {
      return <p>No order history.</p>;
    } else {
      return (
        <div>
          <h3>My Order History</h3>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Recipient</th>
                <th>Shipping Address</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
              {orders.map((order) => (
                <tr key={order.id}>
                  <th>{order.updatedAt.slice(0, 10)}</th>
                  <th>{order.recipient}</th>
                  <th>{order.shippingAddress}</th>
                  <th>{order.totalQty}</th>
                  <th>${order.totalPrice}.00</th>
                  <th>{order.status}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  console.log("state in order history", state);
  return {
    orders: state.order.orders,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadOrders: (id) => dispatch(_fetchOrders(id)),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
