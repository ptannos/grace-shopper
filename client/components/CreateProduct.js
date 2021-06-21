import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store/createProduct';
import { Link } from 'react-router-dom';

class CreateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      imageURL: '',
      prepTime: 0,
      quantity: 0,
      price: 0,
      country: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addProduct({ ...this.state });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const {
      name,
      description,
      imageURL,
      prepTime,
      quantity,
      price,
      country
    } = this.state;
    return (
      <>
        <form id='product-form' onSubmit={handleSubmit}>

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
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    addProduct: (product) => dispatch(createProduct(product, history)),
  };
};
export default connect(null, mapDispatchToProps)(CreateProduct);
