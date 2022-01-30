import React from "react";
import "./MessageBox.scss";

const MessageBox = ({ variant, children }) => {
  return (
    <div className={`message-box ${variant ? variant : "info"}`}>
      {children}
    </div>
  );
};

const MessageBoxVariant = {
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
};

export { MessageBox, MessageBoxVariant };
