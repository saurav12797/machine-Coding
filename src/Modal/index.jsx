import { useEffect, useRef, useState } from "react";
import "./style.css";

const MODAL_HEADER = "This Is Modal Header";
const MODAL_BODY = "This is Modal Body";

const ModalComponent = ({ header, body, handleModalToggle }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleModalToggle();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleModalToggle();
    }
  };

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Focus modal to capture keydown
    modalRef.current?.focus();

    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="modal-wrapper"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="modal"
        ref={modalRef}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">{header}</div>
        <div className="modal-content">{body}</div>
        <button onClick={handleModalToggle}>Close</button>
      </div>
    </div>
  );
};

const Modal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalToggle = () => setIsModalVisible((prev) => !prev);

  return (
    <div className="modal-component">
      <h1>Modal</h1>
      {isModalVisible && (
        <ModalComponent
          header={MODAL_HEADER}
          body={MODAL_BODY}
          handleModalToggle={handleModalToggle}
        />
      )}
      <button onClick={handleModalToggle}>Toggle Modal</button>
    </div>
  );
};

export default Modal;
