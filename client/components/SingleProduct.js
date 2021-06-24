import React from "react"
import { fetchSingleProduct } from "../store/singleProduct"
import { _addToCart } from "../store/cartGuest"
import { _addToUserCart } from "../store/cartUser"
import { updateProduct } from "../store/singleProduct"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      imageURL: "",
      prepTime: 0,
      quantity: 0,
      price: 0,
      country: "",
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.loadSingleProduct(id)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleEdit(event) {
    event.preventDefault()
    this.props.editProduct({
      ...this.state,
      id: this.props.product.id,
    })
  }

  handleClick() {
    const product = this.props.product
    const showToast = () => {
      toast.info("Added to cart!", {
        position: "top-center",
        autoClose: 5000,
      })
    }

    if (!this.props.isLoggedIn) {
      this.props.addGuestProduct(product)
      showToast()
    } else {
      this.props.addUserProduct(product)
      showToast()
    }
  }

  render() {
    const product = this.props.product || {};
    const { handleClick, handleEdit, handleChange } = this;
    const { isAdmin } = this.props;

    const { name, description, imageURL, prepTime, quantity, price, country } =
      this.state
    return (
      <div id="single-product">
        <div id="image-container">
          <h3>{product.name}</h3>
          <img width={602} height={339} src={product.imageURL} />
        </div>
        <div id="product-info">
          <p>
            Prep Time:{" "}
            <strong>
              {product.prepTime} {product.prepTime > 1 ? "hours" : "hour"}
            </strong>
          </p>
          <p>
            Price per kit: <strong>${product.price}.00</strong>
          </p>
          <p>{product.description}</p>
          {product.quantity > 0 ? (
            <button onClick={() => handleClick()}>Add to Cart</button>
          ) : (
            "Sold Out"
          )}
        </div>

        {isAdmin ? (
          <form id="product-form" onSubmit={handleEdit}>
            <h2>Edit Product</h2>

            <label htmlFor="name">Name:</label>
            <input name="name" onChange={handleChange} value={name} />

            <label htmlFor="description">Description:</label>
            <input
              name="description"
              onChange={handleChange}
              value={description}
            />

            <label htmlFor="imageURL">Image URL:</label>
            <input name="imageURL" onChange={handleChange} value={imageURL} />

            <label htmlFor="prepTime">Prep Time:</label>
            <input name="prepTime" onChange={handleChange} value={prepTime} />

            <label htmlFor="quantity">Quantity:</label>
            <input name="quantity" onChange={handleChange} value={quantity} />

            <label htmlFor="price">Price:</label>
            <input name="price" onChange={handleChange} value={price} />

            <label htmlFor="country">Country:</label>
            <input name="country" onChange={handleChange} value={country} />
            <p>
              <button type="submit">Submit</button>
              <Link to="/products">Cancel</Link>
            </p>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addGuestProduct: (product) => dispatch(_addToCart(product)),
    addUserProduct: (product) => dispatch(_addToUserCart(product)),
    addProduct: (product) => dispatch(_addToCart(product)),
    removeProduct: (product) => dispatch(_removeFromCart(product)),
    editProduct: (id) => dispatch(updateProduct(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
