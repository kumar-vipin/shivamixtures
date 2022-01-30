import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../CheckoutSteps/CheckoutSteps";
import { saveShippingAddress } from "../ProductCart/ProductCart.actions";
import { ShippingAddressForm } from "./ShippingAddressForm";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignIn);
  if (!userInfo) {
    navigate("/signin");
  }
  const handleOnSubmit = useCallback(
    (shippingAddress) => {
      dispatch(saveShippingAddress(shippingAddress));
      navigate("/payment");
    },
    [dispatch]
  );

  return (
    <div className="shipping-address">
      <CheckoutSteps step1 step2 />
      <ShippingAddressForm onSubmit={handleOnSubmit} />
    </div>
  );
};

export { ShippingAddress };
