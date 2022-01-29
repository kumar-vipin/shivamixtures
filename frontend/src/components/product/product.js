import React from "react";
import { Link } from "react-router-dom";
import './product.scss';

const Product = ({ product }) => {
  return (
    <div className="card">
      <Link className="image-wrapper" to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="medium" />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <a href="rent-now.html">Rent Now</a>
      </div>
    </div>
  );
};

export { Product };
