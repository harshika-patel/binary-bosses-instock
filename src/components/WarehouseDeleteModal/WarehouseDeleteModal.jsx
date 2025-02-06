import React from "react";
import "./WarehouseDeleteModal.scss";

const WarehouseDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal__title">Delete ___ warehouse?</h2>
                <p className="modal__text">Please confirm that youd like to delete the ___ from the list of warehouses. You wont be able to undo this action.</p>
                <div className="modal__actions">
                    <button className="modal__button modal__button--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal__button modal__button--confirm" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarehouseDeleteModal;

