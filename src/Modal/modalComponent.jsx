import { useEffect, useRef } from "react";
import "./style.css";

const ModalComponent = ({
  header,
  body,
  handleModalToggle,
  isModalVisible,
}) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleModalToggle();
    }
  };

  const handleEscape = (e) => {
    if (e.code == "Escape") handleModalToggle();
  };

  useEffect(() => {
    if (isModalVisible && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isModalVisible]);

  return (
    <div
      className={`modal-wrapper `}
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={handleEscape}
      tabIndex={-1}
    >
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-content">{body}</div>
        <button onClick={handleModalToggle}>Close</button>
      </div>
    </div>
  );
};

export default ModalComponent;
