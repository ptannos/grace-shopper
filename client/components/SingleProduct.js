import React from "react";
import { fetchSingleProduct } from "../store/singleProduct";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageUrl: "",
      prepTime: 0.0,
      quantity: 0,
      price: 0.0,
      country: "",
    };
  }

  componentDidMount() {
    try {
      const id = this.props.match.params.id;
      this.props.loadSingleProduct(id);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const product = this.props.product || {};
    console.log('PRODUCT', product);
    return (
      <div>
        <p>
          <img src={product.imageUrl} />
        </p>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log('THIS IS STATE', state)
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
