import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../product/product";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox } from "../MessageBox/MessageBox";
import "./HomeScreen.scss";

const HomeScreen = ({}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox />
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export { HomeScreen };
