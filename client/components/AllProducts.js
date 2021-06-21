import React from "react";
import { fetchAllProducts } from "../store/allProducts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "react-dom";

class AllProducts extends React.Component {
  componentDidMount() {
    try {
      this.props.loadProducts();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const products = this.props.products || [];
    return (
      <div className="product-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <img src={product.imageURL} />
              <div id="product-details">
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p>
                  {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
