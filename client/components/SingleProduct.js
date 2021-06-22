import React from "react";
import { fetchSingleProduct } from "../store/singleProduct";
//import { _addToCart, _removeFromCart } from "../store/cart";
import { _addToCart } from "../store/cartGuest"
import { _addToUserCart } from '../store/cartUser';
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleProduct(id);
  }

  handleClick() {
    const product = this.props.product
    if (!this.props.isLoggedIn) {
      this.props.addGuestProduct(product)
    } else {
      this.props.addUserProduct(product);
    }
    //alert("Added to cart!");
  }

  render() {
    const product = this.props.product || {};
    console.log("PRODUCT", product);
    return (
      <div>
        <img src={product.imageURL} />
        <h3>{product.name}</h3>
        <p>
          {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
        </p>
        <p>${product.price}.00</p>
        <p>{product.description}</p>
        {product.quantity > 0 ? (
          <button onClick={() => this.handleClick()}> Add to Cart</button>
        ) : (
          "Sold Out"
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addGuestProduct: (product) => dispatch(_addToCart(product)),
    addUserProduct: (product) => dispatch(_addToUserCart(product))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
