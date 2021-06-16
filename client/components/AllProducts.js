import React from "react";
import { fetchAllProducts } from "../store/allProducts";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

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
    console.log('PRODUCTS', products);
    return (
      <div>
        <ul>
          {products.map(product => {
            return (
              <div key={product.id}>
                <li>
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                    <img src={product.imageURL} />
                  </Link>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
      )
  }
}

const mapState = (state) => {
  console.log('THIS IS STATE', state)
  return {
    products: state.allProducts
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
