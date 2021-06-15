import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <Router>
      <div>
        <h3>Welcome, {username}</h3>
        <Route path="/products/:id" component={SingleProduct} />
      </div>
    </Router>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
