import "./WarehouseInventoryList.scss";
import axios from "axios";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import right from "../../assets/Icons/chevron_right-24px.svg";
import InventoryDeleteModal from "../InventoryDeleteModal/InventoryDeleteModal";
import dropdown from "../../assets/Icons/sort-24px.svg";
import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseInventoryList = ({ warehouseId }) => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  // Fetch warehouse and inventory list
  const fetchInventoryData = async () => {
    try {
      const warehouseResponse = await axios.get(
        `${API_URL}/warehouses/${warehouseId}`
      );
      setWarehouse(warehouseResponse.data);

      const inventoryResponse = await axios.get(
        `${API_URL}/warehouses/${warehouseId}/inventories`
      );
      setInventory(inventoryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, [warehouseId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  if (!warehouse) return <p>Loading...</p>;

  const openDeleteModal = (item) => {
    setSelectedInventory(item);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };

  const handleDelete = async () => {
    if (!selectedInventory) return;

    try {
      await axios.delete(`${API_URL}/inventories/${selectedInventory.id}`);
      console.log(`Item ${selectedInventory.item_name} deleted successfully`);

      closeDeleteModal();
      fetchInventoryData();
    } catch (error) {
      console.error("Error deleting inventory item", error);
    }
  };

  return (
    <div className="warehouse-containers">
      {isMobile ? (
        inventory.map((item) => (
          <div key={item.id} className="inventory-cards">
            <div className="inventory-cards__data">
              <div className="inventory-cards__info">
                <div className="inventory-cards__detail">
                  <div className="inventory-cards__detail-item">
                    <p className="inventory-cards__detail-item__title">
                      INVENTORY ITEM
                    </p>
                    <p className="inventory-cards__detail-item__data">
                      <Link to={`/inventory/${item.id}`}>
                        {item.item_name} <img src={right} alt="more detail" />
                      </Link>
                    </p>
                  </div>
                  <div className="inventory-cards__detail-item">
                    <p className="inventory-cards__detail-item__title">
                      STATUS
                    </p>
                    <p
                      className={`inventory-cards__status ${
                        item.status === "In Stock" ? "in-stock" : "out-of-stock"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
                <div className="inventory-cards__detail">
                  <div className="inventory-cards__detail-item">
                    <p className="inventory-cards__detail-item__title">
                      CATEGORY
                    </p>
                    <p className="inventory-cards__detail-item__data">
                      {item.category}
                    </p>
                  </div>
                  <div className="inventory-cards__detail-item">
                    <p className="inventory-cards__detail-item__title">QTY</p>
                    <p className="inventory-cards__detail-item__data">
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="inventory-cards__actions">
                <button
                  className="inventory-cards__button"
                  onClick={() => openDeleteModal(item)}
                >
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="inventory-cards__delete-icon"
                  />
                </button>
                <Link to={`/inventory/${item.id}/edit`}>
                  <img
                    src={edit}
                    alt="edit"
                    className="inventory-cards__edit-icon"
                  />
                </Link>
              </div>
              {isModalOpen && selectedInventory && (
                <InventoryDeleteModal
                  isOpen={isModalOpen}
                  onClose={closeDeleteModal}
                  onConfirm={handleDelete}
                  inventoryName={selectedInventory.item_name}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="warehouse-inventory-table-container">
          <table className="warehouse-inventory-table">
            <thead>
              <tr className="warehouse-inventory-table__header">
                <th className="warehouse-inventory-table__header-title">
                  Inventory Item <img src={dropdown} alt="dropdown" />
                </th>
                <th className="warehouse-inventory-table__header-title">
                  Category <img src={dropdown} alt="dropdown" />
                </th>
                <th className="warehouse-inventory-table__header-title">
                  Status <img src={dropdown} alt="dropdown" />
                </th>
                <th className="warehouse-inventory-table__header-title">
                  Quantity <img src={dropdown} alt="dropdown" />
                </th>
                <th className="warehouse-inventory-table__header-title">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="warehouse-inventory-table__body">
              {inventory.map((item) => (
                <tr key={item.id} className="warehouse-inventory-table__row">
                  <td className="warehouse-inventory-table__row-data">
                    <Link
                      className="warehouse-inventory-table__row-data__link"
                      to={`/inventory/${item.id}`}
                    >
                      {item.item_name}
                      <img
                        className="warehouse-inventory-table__row-data__icon"
                        src={right}
                        alt="get more detail arrow"
                      />
                    </Link>
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    {item.category}
                  </td>
                  <td
                    className={
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    {item.quantity}
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    <button
                      className="inventory-cards__button"
                      onClick={() => openDeleteModal(item)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className="warehouse-inventory-table__row-data__delete-icon"
                      />
                    </button>
                    <Link to={`/inventory/${item.id}/edit`}>
                      <img
                        src={edit}
                        alt="edit"
                        className="warehouse-inventory-table__row-data__edit-icon"
                      />
                    </Link>
                    {isModalOpen && selectedInventory && (
                      <InventoryDeleteModal
                        isOpen={isModalOpen}
                        onClose={closeDeleteModal}
                        onConfirm={handleDelete}
                        inventoryName={selectedInventory?.item_name}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WarehouseInventoryList;
