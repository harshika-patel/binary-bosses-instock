import { useState } from "react";
import WarehouseDelete from "../WarehouseDelete/WarehouseDelete";
import WarehouseConfirmationModal from "../WarehouseConfirmationModal/WarehouseConfirmationModal";
import "./WarehouseList.scss";

const WarehouseList = ({ warehouses, handleDeleteWarehouse }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const openDeleteModal = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalIsOpen(false);
    };

    const confirmDelete = () => {
        if (selectedWarehouse) {
            handleDeleteWarehouse(selectedWarehouse.id); 
            setModalIsOpen(false);
        }
    };

    return (
    <section>
        <h1>Warehouse List</h1>
        {warehouses.length === 0 ? (
                <p>No warehouses available.</p>
            ) : (
            warehouses.map((warehouse) => (
                <div key={warehouse.id} className="warehouse-item">
                    <h2>{warehouse.name}</h2>
                    <p>Location: {warehouse.location}</p>
                    <WarehouseDelete onClick={() => openDeleteModal(warehouse)} />
                </div>
                ))
        )}
        <WarehouseConfirmationModal 
            isOpen={modalIsOpen} 
            onClose={closeDeleteModal} 
            warehouse={selectedWarehouse} 
            onConfirm={confirmDelete} 
        />
    </section>
    );
};

export default WarehouseList;
