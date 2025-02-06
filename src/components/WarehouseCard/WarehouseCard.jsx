import { useState } from "react";
import "./WarehouseCard.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import WarehouseDeleteModal from "../WarehouseDeleteModal/WarehouseDeleteModal";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseCard = ({
    id,
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
    refreshList,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const openDeleteModal = () => {
        setIsModalOpen(true);
        setSelectedWarehouse({ id,  name: warehouse_name });
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedWarehouse(null);
    };

    const handleDelete = async () => {
        if (!selectedWarehouse) return;

        try {
            await axios.delete(`${API_URL}/warehouses/${selectedWarehouse.id}`);
            console.log(`Warehouse ${selectedWarehouse.name} deleted successfully"`);
            closeDeleteModal();
            refreshList();
        } catch (error) {
            console.error("Error deleting warehouse", error);
        }
    };

    return (
    <article className="warehouse-card">
        <div className="warehouse-card__content">
            <p className="warehouse-card__name-text">{warehouse_name}</p>
            <p className="warehouse-card__text">{`${address}, ${city}, ${country}`}</p>
            <p className="warehouse-card__text">{contact_name}</p>
            <p className="warehouse-card__contact-text">{contact_phone}</p>
            <p className="warehouse-card__contact-text">{contact_email}</p>
        </div>

        <div className="warehouse-card__actions">
            <button className="warehouse-card__button" onClick={openDeleteModal}>
                <img
                    className="warehouse-card__icon"
                    src={deleteIcon}
                    alt="delete-icon"
                />
            </button>
        </div>
        {isModalOpen &&  selectedWarehouse && (
            <WarehouseDeleteModal isOpen={isModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete}  warehouseName={selectedWarehouse.name}
            />)}
    </article>
    );
};

export default WarehouseCard;