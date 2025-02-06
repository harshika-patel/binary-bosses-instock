import { useState } from "react";
import "./InventoryCard.scss";
import chevron_right from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import InventoryDeleteModal from "../InventoryDeleteModal/InventoryDeleteModal";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryCard = ({
    inventory_name,
    refreshList,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);

    const openDeleteModal = () => {
        setIsModalOpen(true);
        setSelectedInventory({ id,  name: inventory_name });
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedInventory(null);
    };

    const handleDelete = async () => {
        if (!selectedInventory) return;

        try {
            await axios.delete(`${API_URL}/inventories/${selectedInventory.id}`);
            console.log(`Inventory ${selectedInventory.name} deleted successfully"`);
            closeDeleteModal();
            refreshList();
        } catch (error) {
            console.error("Error deleting inventory", error);
        }
    };

    return (
        <>
            <div className="inventory-card__actions">
            <button className="inventory-card__button" onClick={openDeleteModal}>
                <img
                    className="inventory-card__icon"
                    src={deleteIcon}
                    alt="delete-icon"
                />
            </button>
            </div>
            {isModalOpen && selectedInventory && (
                <InventoryDeleteModal isOpen={isModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete}  inventoryName={selectedInventory.name}
                />
            )}
        </>
    );
};

export default InventoryCard;
