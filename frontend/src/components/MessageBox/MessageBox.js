import { process_params } from "express/lib/router";
import React from "react";
import "./MessageBox.scss";

const MessageBox = ({ variant, children }) => {
  return (
    <div className={`message-box ${variant ? variant : 'info'}`}>{children}</div>
  );
};

export { MessageBox };
