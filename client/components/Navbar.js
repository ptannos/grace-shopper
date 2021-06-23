import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Home from "./Home";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h1>Plate Hopper</h1>
    <Home />
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {isAdmin ? (
        <div>
          <Link to="/products/create">Add New Product</Link>
          <Link to="/users">View All Users</Link>
        </div>
      ) : (
        ""
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

// {isAdmin ? (
//   <div>
//     <Link to="/products/create">Add New Product</Link>
//     <Link to="/users">View All Users</Link>
//   </div>
// ) : (
//   <div>''</div>
// )}
