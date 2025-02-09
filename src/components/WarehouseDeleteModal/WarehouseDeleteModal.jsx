import React from "react";
import closeIcon from "../../assets/Icons/close-24px.svg";
import "./WarehouseDeleteModal.scss";

const WarehouseDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  warehouseName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img
          className="modal__close-icon"
          src={closeIcon}
          alt="close-icon"
          onClick={onClose}
        />
        <div className="modal__content">
          <h2 className="modal__title">Delete {warehouseName} warehouse?</h2>
          <p className="modal__text">
            Please confirm that you'd like to delete the {warehouseName} from
            the list of warehouses. You won't be able to undo this action.
          </p>
        </div>
        <div className="modal__actions">
          <button
            className="modal__button modal__button--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--confirm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
