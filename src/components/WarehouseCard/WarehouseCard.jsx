import { useState } from "react";
import "./WarehouseCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import chevron_right from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import WarehouseDeleteModal from "../WarehouseDeleteModal/WarehouseDeleteModal";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseCard = ({
  warehouse_id,
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
    setSelectedWarehouse({ warehouse_id, name: warehouse_name });
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouse(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/warehouses/${selectedWarehouse.warehouse_id}`
      );
      console.log(`Warehouse ${selectedWarehouse.warehouse_name} deleted successfully`);
      closeDeleteModal();
      refreshList();
    } catch (error) {
      console.error("Error deleting warehouse", error);
    }
  };

  return (
    <article className="warehouse-card">
      <div className="warehouse-card__content">
        <div className="warehouse-card__section">
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">WAREHOUSE</h3>
            <div className="warehouse-card__name">
              <Link
                to={`/warehouses/${warehouse_id}`}
                className="warehouse-card__name-text"
              >
                {warehouse_name}
              </Link>
              <img
                className="warehouse-card__icon"
                src={chevron_right}
                alt="chevron_right_icon"
              />
            </div>
          </div>
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">ADDRESS</h3>
            <p className="warehouse-card__text">{`${address}, ${city}, ${country}`}</p>
          </div>
        </div>
        <div className="warehouse-card__section">
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">CONTACT NAME</h3>
            <p className="warehouse-card__text">{contact_name}</p>
          </div>
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">CONTACT INFORMATION</h3>
            <div className="warehouse-card__contact">
              <p className="warehouse-card__contact-text">{contact_phone}</p>
              <p className="warehouse-card__contact-text">{contact_email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="warehouse-card__actions">
        <button className="warehouse-card__button" onClick={openDeleteModal}>
          <img
            className="warehouse-card__icon"
            src={deleteIcon}
            alt="delete-icon"
          />
        </button>
        <Link to={`/warehouses/${warehouse_id}/edit`}>
          <img
            className="warehouse-card__icon"
            src={editIcon}
            alt="edit-icon"
          />
        </Link>
      </div>
      {isModalOpen && selectedWarehouse && (
        <WarehouseDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          warehouseName={selectedWarehouse.warehouse_name}
        />
      )}
    </article>
  );
};

export default WarehouseCard;
