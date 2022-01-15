import React from "react";
import { Link } from "react-router-dom";
import './product.scss';

const Product = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="medium" />
      </Link>
      <div className="card-body">
        <a href="product.html">
          <h2>{product.name}</h2>
        </a>
        <a href="rent-now.html">Rent Now</a>
      </div>
    </div>
  );
};

export { Product };
