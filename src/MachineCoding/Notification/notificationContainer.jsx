import { useState } from "react";
import "./notification.css";

const NotificationContainer = ({ type, toastVisible }) => {
  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-content">
        <p>{type}</p>
        <button className="notification-close">X</button>
      </div>
    </div>
  );
};

export default NotificationContainer;
