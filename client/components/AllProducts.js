import React from "react";
import { fetchAllProducts, deleteProduct } from "../store/allProducts";
import { updateProduct } from "../store/singleProduct";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "react-dom";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    try {
      this.props.loadProducts();
    } catch (err) {
      console.log(err);
    }
  }

  handleEdit(id) {
    this.props.editProduct(id);
  }

  handleDelete(id) {
    this.props.removeProduct(id);
  }

  render() {
    const products = this.props.products || [];
    const { isAdmin } = this.props;
    console.log("props in AllProducts", this.props);
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
                {isAdmin ? (
                  <div>
                    <button onClick={() => this.handleEdit(product.id)}>
                      Edit
                    </button>
                    <button onClick={() => this.handleDelete(product.id)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("state in AllProducts", state);
  return {
    products: state.allProducts,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchAllProducts()),
    removeProduct: (id) => dispatch(deleteProduct(id)),
    editProduct: (id) => dispatch(updateProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
