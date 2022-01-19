import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../product/product";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox } from "../MessageBox/MessageBox";
import { listProducts } from "../ProductScreen/ProductScreen.actions";
import "./HomeScreen.scss";

const HomeScreen = ({}) => {
  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="product-list row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export { HomeScreen };
