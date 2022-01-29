import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ProductCart = ({}) => {
  const params = useParams();
  const productId = params.id;
  let [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: ProductId: {productId} Qty: {qty}
      </p>
    </div>
  );
};

export { ProductCart };
