import React from "react";
import { fetchSingleProduct } from "../store/singleProduct";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleProduct(id);
  }

  handleClick() {

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
        {product.quantity > 0 ? <button onClick={handleClick()}> Add to Cart</button> : "Sold Out"}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("THIS IS STATE", state);
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
