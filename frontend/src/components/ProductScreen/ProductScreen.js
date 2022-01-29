import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox, MessageBoxVariant } from "../MessageBox/MessageBox";
import { detailsProduct } from "./ProductScreen.actions";
import "./ProductScreen.scss";

const ProductScreen = ({}) => {
  const params = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(params.id));
  }, [dispatch, params]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
      ) : (
        <>
          <Link className="go-back" to="/">
            Back to result
          </Link>
          <div className="row top">
            <div className="col-1">
              <img className="large" src={product.image} alt={product.name}></img>
            </div>
            <div className="col-2">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Price: Rs. {product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="add-to-cart add-to-cart-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">Rs. {product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className="primary block">Add to cart</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { ProductScreen };
