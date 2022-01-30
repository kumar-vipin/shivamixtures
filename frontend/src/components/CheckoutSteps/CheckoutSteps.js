import React from "react";
import "./CheckoutSteps.scss";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="row checkout-steps">
      <div className={step1 ? "active" : ""}>Signin</div>
      <div className={step2 ? "active" : ""}>Shipping</div>
      <div className={step3 ? "active" : ""}>Payment</div>
      <div className={step4 ? "active" : ""}>Place Order</div>
    </div>
  );
};

export { CheckoutSteps };
