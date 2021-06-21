import React from "react";
import { fetchSingleProduct } from "../store/singleProduct";
import { updateProduct } from "../store/singleProduct";
import { _addToCart, _removeFromCart } from "../store/cart";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleProduct(id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleEdit(id) {
    this.props.editProduct(id);
  }


  handleClick() {
    this.props.addProduct(this.props.product);
    alert("Added to cart!");
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


        <form id='product-form' onSubmit={() => handleEdit(product.id)}>

          <h2>Add Product</h2>

          <label htmlFor='name'>Name:</label>
          <input name='name' onChange={handleChange} value={name} />

          <label htmlFor='description'>Description:</label>
          <input name='description' onChange={handleChange} value={description} />

          <label htmlFor='imageURL'>Image URL:</label>
          <input name='imageURL' onChange={handleChange} value={imageURL} />

          <label htmlFor='prepTime'>Prep Time:</label>
          <input name='prepTime' onChange={handleChange} value={prepTime} />

          <label htmlFor='quantity'>Quantity:</label>
          <input name='quantity' onChange={handleChange} value={quantity} />

          <label htmlFor='price'>Price:</label>
          <input name='price' onChange={handleChange} value={price} />

          <label htmlFor='country'>Country:</label>
          <input name='country' onChange={handleChange} value={country} />
          <p>
          <button type='submit'>Submit</button>
          <Link to='/products'>Cancel</Link>
          </p>
        </form>

      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addProduct: (product) => dispatch(_addToCart(product)),
    removeProduct: (product) => dispatch(_removeFromCart(product)),
    editProduct: (id) => dispatch(updateProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
