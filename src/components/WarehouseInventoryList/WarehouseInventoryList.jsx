import "./WarehouseInventoryList.scss";
import axios from "axios";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import right from "../../assets/Icons/chevron_right-24px.svg";
import dropdown from "../../assets/Icons/sort-24px.svg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseInventoryList = ({ warehouseId }) => {
  // const { id } = useParams();
  // const [warehouse, setWarehouse] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const warehouseResponse = await axios.get(
        //   "http://localhost:8080/warehouses"
        // );
        // setWarehouse(warehouseResponse.data);

        const inventoryResponse = await axios.get(
          `${API_URL}/warehouses/${warehouseId}/inventories`
        );
        setInventory(inventoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [warehouseId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);
<<<<<<< HEAD
    fetchData();
  }, [id];
=======
>>>>>>> develop

  if (!inventory) return <p>Loading...</p>;

  return (
    <div className="warehouse-container">
      {isMobile ? (
        inventory.map((item) => (
          <div key={item.id} className="inventory-card">
            <div className="inventory-card__content">
              <div className="inventory-card__info">
                <hr className="inventory-card__line" />
                <div className="inventory-card__details">
                  <div className="inventory-card__details-item">
                    <p className="inventory-card__details-item__title">
                      INVENTORY ITEM
                    </p>
                    <p className="inventory-card__details-item__data">
                      <a href={`/inventory/${item.id}`}>
                        {item.item_name} <img src={right} alt="more details" />
                      </a>
                    </p>
                  </div>
                  <div className="inventory-card__details-item">
                    <p className="inventory-card__details-item__title">
                      STATUS
                    </p>
                    <p
                      className={`inventory-card__status ${
                        item.status == "In Stock" ? "in-stock" : "out-of-stock"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
                <div className="inventory-card__details">
                  <div className="inventory-card__details-item">
                    <p className="inventory-card__details-item__title">
                      CATEGORY{" "}
                    </p>
                    <p className="inventory-card__details-item__data">
                      {item.category}
                    </p>
                  </div>
                  <div className="inventory-card__details-item">
                    <p className="inventory-card__details-item__title">QTY</p>
                    <p className="inventory-card__details-item__data">
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="inventory-card__actions">
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="inventory-card__delete-icon"
                />
                <img
                  src={edit}
                  alt="edit"
                  className="inventory-card__edit-icon"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div class name="warehouse-inventory-table-container">
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
                    <a
                      className="warehouse-inventory-table__row-data__link"
                      href={`/inventory/${item.id}`}
                    >
                      {item.item_name}
                      <img
                        className="warehouse-inventory-table__row-data__icon"
                        src={right}
                        alt="get more details arrow"
                      ></img>
                    </a>
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    {item.category}
                  </td>
                  <td
                    className={
                      item.status == "In Stock" ? "in-stock" : "out-of-stock"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    {item.quantity}
                  </td>
                  <td className="warehouse-inventory-table__row-data">
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className="warehouse-inventory-table__row-data__delete-icon"
                    />
                    <img
                      src={edit}
                      alt="edit"
                      className="warehouse-inventory-table__row-data__edit-icon"
                    />
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
