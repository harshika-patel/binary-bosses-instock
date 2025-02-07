import "./InventoryCard.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import chevron_right from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import InventoryDeleteModal from "../InventoryDeleteModal/InventoryDeleteModal";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryCard = ({
  inventory_id,
  item_name,
  category,
  status,
  quantity,
  warehouse_id,
  refreshList,
}) => {
  const [warehouseName, setWarehouseName] = useState("Loading...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Fetch warehouse name using warehouse_id
  useEffect(() => {
    const fetchWarehouseName = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/warehouses/${warehouse_id}/details`
        );
        setWarehouseName(response.data.warehouse_name);
      } catch (error) {
        console.error("Error fetching warehouse name:", error);
        setWarehouseName("Unknown");
      }
    };

    if (warehouse_id) {
      fetchWarehouseName();
    }
  }, [warehouse_id]);

  const openDeleteModal = () => {
    setIsModalOpen(true);
    setSelectedItem({ inventory_id, item_name });
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/inventory/${selectedItem.inventory_id}`);
      console.log(`Item ${selectedItem.item_name} deleted successfully`);
      closeDeleteModal();
      refreshList();
    } catch (error) {
      console.error("Error deleting inventory item", error);
    }
  };

  return (
    <article className="inventory-card">
      <div className="inventory-card__content">
        {/* Left Section: Inventory Item Name & Category */}
        <div className="inventory-card__section">
          <div className="inventory-card__details">
            <h3 className="inventory-card__label">INVENTORY ITEM</h3>
            <div className="inventory-card__name">
              <Link
                to={`/inventory/${inventory_id}`}
                className="inventory-card__name-text"
              >
                {item_name}
              </Link>

              <img
                className="inventory-card__icon"
                src={chevron_right}
                alt="chevron_right_icon"
              />
            </div>
          </div>
          <div className="inventory-card__details">
            <h3 className="inventory-card__label">CATEGORY</h3>
            <p className="inventory-card__text">{category}</p>
          </div>
        </div>

        {/* Right Section: Status & Quantity & Warehouse*/}
        <div className="inventory-card__section">
          <div className="inventory-card__details">
            <h3 className="inventory-card__label">STATUS</h3>
            <p
              className={`inventory-card__status ${
                status === "In Stock" ? "in-stock" : "out-of-stock"
              }`}
            >
              {status}
            </p>
          </div>
          <div className="inventory-card__details">
            <h3 className="inventory-card__label">QTY</h3>
            <p className="inventory-card__text">{quantity}</p>
          </div>
          <div className="inventory-card__details">
            <h3 className="inventory-card__label">WAREHOUSE</h3>
            <p className="inventory-card__text">{warehouseName}</p>
          </div>
        </div>
      </div>

      <div className="inventory-card__actions">
      <button className="inventory-card__button" onClick={openDeleteModal}>
          <img className="inventory-card__icon" src={deleteIcon} alt="delete-icon" />
        </button>
        <Link to={`/inventory/${inventory_id}/edit`}>
          <img
            className="inventory-card__icon"
            src={editIcon}
            alt="Edit Item"
          />
        </Link>
      </div>
      {isModalOpen && selectedItem && (
        <InventoryDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          itemName={selectedItem.item_name}
        />
      )}
    </article>
  );
};

export default InventoryCard;
