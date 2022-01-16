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
            <div className="col-2">
              <img src={product.image} alt={product.image}></img>
            </div>
            <div className="col-1">{product.name}</div>
            <div className="col-1">{product.category}</div>
          </div>
        </>
      )}
    </div>
  );
};

export { ProductScreen };
