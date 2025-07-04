import { useState } from "react";
import "./style.css";
import ModalComponent from "./modalComponent";

const MODAL_HEADER = "This Is Modal Header";
const MODAL_BODY = "This is Modal Body";

const Modal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalToggle = () => setIsModalVisible((prev) => !prev);

  return (
    <div className={`modal-component ${isModalVisible ? "no-scroll" : ""}`}>
      <h1>Modal</h1>
      {isModalVisible && (
        <ModalComponent
          header={MODAL_HEADER}
          body={MODAL_BODY}
          handleModalToggle={handleModalToggle}
          isModalVisible={isModalVisible}
        />
      )}
      <button onClick={handleModalToggle}>Toggle Modal</button>
    </div>
  );
};

export default Modal;
