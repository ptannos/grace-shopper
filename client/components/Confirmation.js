import React, { Component } from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div>
      <h3>Thank you for your order!</h3>
      <div>
        <Link to="/">
          <button>Continue shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
