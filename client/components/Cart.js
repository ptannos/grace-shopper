import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    try {
      this.props.loadCart(this.props.match.params.orderId);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log("this.props", this.props);
    return <div>Test</div>;
  }
}

const mapState = (state) => {
  console.log("here is state", state);
  return {
    order: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (orderId) => dispatch(fetchCart(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
