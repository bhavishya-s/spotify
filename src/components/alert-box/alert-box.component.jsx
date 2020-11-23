import React from "react";
import "./alert-box.styles.scss";

const AlertBox = ({ title, message }) => {
  return (
    <div className="overlay">
      <div className="alert-container">
        <div className="alert-header">
          <span className="alert-title">{title}</span>
          <span className="alert-close">x</span>
        </div>
        <span className="alert-message">{message}</span>
      </div>
    </div>
  );
};

export default AlertBox;
