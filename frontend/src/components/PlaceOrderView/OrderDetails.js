import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox, MessageBoxVariant } from "../MessageBox/MessageBox";
import { orderDetails } from "./PlaceOrderView.actions";

import "./PlaceOrderView.scss";

const OrderDetails = () => {
  const params = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const orderId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      console.log("data=============== ",data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    console.log('order ============= ', order);
    if (!order?._id) {
      dispatch(orderDetails(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderId, dispatch, order, sdkReady]);

  const successPaymentHandler = useCallback(() => {
    console.log('successPaymentHandler');
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
  ) : order ? (
    <div className="place-order-view">
      <div>
        <h2>Order: {order._id}</h2>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="cart-details">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress?.fullName}{" "}
                    <br />
                    <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant={MessageBoxVariant.SUCCESS}>
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant={MessageBoxVariant.ERROR}>
                      Not Delivered
                    </MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="cart-details">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variant={MessageBoxVariant.SUCCESS}>
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant={MessageBoxVariant.ERROR}>
                      Not Paid
                    </MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="cart-details">
                  <h2>Order Items</h2>
                  <ul>
                    {order.orderItems.map((item) => (
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
                    <div>Rs. {order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>Rs. {order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>Rs. {order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Order Total</div>
                    <div>Rs. {order.totalPrice.toFixed(2)}</div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderDetails;
