import { useRef, useState, useEffect } from "react";
import NotificationContainer from "./notificationContainer.jsx";
import "./notification.css";

const Notifications = () => {
  const [notificationData, setNotificationData] = useState([]);
  const toastRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(toastRef.current).forEach((t) => clearTimeout(t));
      toastRef.current = {};
    };
  }, []);

  const handleClose = (id) => {
    setNotificationData((prev) => prev.filter((item) => item.id !== id));
    clearTimeout(toastRef.current[id]);
    delete toastRef.current[id];
  };

  const handleToastClick = (type) => {
    const id = Date.now();
    setNotificationData((prev) => [...prev, { id, type }]);
    toastRef.current[id] = setTimeout(() => handleClose(id), 4000);
  };

  return (
    <div className="notifications">
      <div className="notification-wrapper">
        {notificationData?.map((data) => (
          <NotificationContainer
            key={data.id}
            type={data.type}
            onClose={() => handleClose(data.id)}
          />
        ))}
      </div>

      <button onClick={() => handleToastClick("error")}>Success</button>
    </div>
  );
};

export default Notifications;
