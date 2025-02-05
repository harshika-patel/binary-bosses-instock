import ReactModal from "react-modal";
import axios from "axios";
import React, { useState } from "react";
import "./WarehouseConfirmationModal.scss";

ReactModal.setAppElement("#root");

const WarehouseConfirmationModal = ({ isOpen, onClose, warehouse }) => {
    // const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
       try {
          const response = await axios.delete(`{API_URL}/warehouse/${warehouse.id}`);
          setWarehouse(response.data);
       } catch (error) {
          console.error(error);
       }
    };
    
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose} 
            contentLabel="Confirm Deletion"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
        <button className="back" onClick={onClose}>x</button>
        {warehouse && (
            <>
                <h2>Delete {warehouse.name} warehouse?</h2>
                <p>Please confirm that youd like to delete the {warehouse.name} from the list of warehouses. You wont be able to undo this action.</p>
            </>    
        )}
        <div className="button-group">
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="confirm" onClick={handleDelete}>Delete</button>
        </div>
        </ReactModal>
    );
};

export default WarehouseConfirmationModal;

