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
    console.log("PRODUCTS", products);
    return (
      <div className="product-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageURL} />
                <h3>{product.name}</h3>
                <p>
                  {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("THIS IS STATE", state);
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
