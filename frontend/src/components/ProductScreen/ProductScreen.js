import React from "react";
import { Link, useParams } from "react-router-dom";
import data from "../../data";
import "./ProductScreen.scss";

const ProductScreen = ({}) => {
  const params = useParams();
  console.log(params);
  const product = data.products.find((p) => p._id === params.id);
  return (
    <div>
      <Link className="go-back" to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img src={product.image} alt={product.image}></img>
        </div>
        <div className="col-1">{product.name}</div>
        <div className="col-1">{product.category}</div>
      </div>
    </div>
  );
};

export { ProductScreen };
