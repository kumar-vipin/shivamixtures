import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../CheckoutSteps/CheckoutSteps";

import "./PlaceOrderView.scss";

const PlaceOrderView = () => {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod]);

  const toPrice = (num) => Number(num.toFixed(2)); //5.123 => "5.12" => 5.12

  const itemsPrice = toPrice(
    cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  const shippingPrice = itemsPrice > 100 ? toPrice(0) : toPrice(10);
  const taxPrice = toPrice(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = () => {};

  return (
    <div className="place-order-view">
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="cart-details">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {shippingAddress?.fullName} <br />
                    <strong>Address:</strong> {shippingAddress?.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </p>
                </div>
              </li>
              <li>
                <div className="cart-details">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {paymentMethod}
                  </p>
                </div>
              </li>
              <li>
                <div className="cart-details">
                  <h2>Order Items</h2>
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            {item.qty} x Rs. {item.price} = Rs.{" "}
                            {item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="cart-details">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items</div>
                    <div>Rs. {itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>Rs. {shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>Rs. {taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Order Total</div>
                    <div>Rs. {totalPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <button
                    className="primary block"
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderView;
