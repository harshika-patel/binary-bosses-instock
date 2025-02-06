import { useState } from "react";
import "./WarehouseCard.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import WarehouseDeleteModal from "../WarehouseDeleteModal/WarehouseDeleteModal";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseCard = ({
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_URL}/warehouses/{id}`);
            console.log("Warehouse deleted successfully", response.data);
            closeDeleteModal();
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
        {isModalOpen && <WarehouseDeleteModal isOpen={isModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />}
    </article>
    );
};

export default WarehouseCard;