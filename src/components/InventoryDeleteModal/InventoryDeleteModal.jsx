import React from "react";
import closeIcon from "../../assets/Icons/close-24px.svg";
import "./InventoryDeleteModal.scss";

const InventoryDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Close button */}
        <img
          className="modal__close-icon"
          src={closeIcon}
          alt="close-icon"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="modal__content">
          <h2 className="modal__title">Delete {itemName}?</h2>
          <p className="modal__text">
            Please confirm that you'd like to delete {itemName} from the
            inventory. You won't be able to undo this action.
          </p>
        </div>

        {/* Action Buttons */}
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

export default InventoryDeleteModal;
