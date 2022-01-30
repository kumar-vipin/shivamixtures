import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MessageBox, MessageBoxVariant } from "../MessageBox/MessageBox";
import { addToCart, removeFromCart } from "./ProductCart.actions";

import './ProductCart.scss';

const ProductCart = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  let [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty");

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleAddToCart = (id, qty) => {
    dispatch(addToCart(id, Number(qty)));
  };

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=shipping');
  };

  useEffect(() => {
    if (productId && qty) {
      handleAddToCart(productId, Number(qty));
    }
  }, [dispatch, productId, qty]);

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {isCartEmpty ? (
          <MessageBox variant={MessageBoxVariant.INFO}>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        handleAddToCart(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>Rs. {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItemFromCart(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!isCartEmpty && (<div className="col-1">
        <div className="cart cart-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} Items): Rs.{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button type="button" onClick={checkoutHandler} className="primary block">Proceed to Checkout</button>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export { ProductCart };
