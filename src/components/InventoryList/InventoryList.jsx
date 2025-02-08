import "./InventoryList.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import InventoryCard from "../InventoryCard/InventoryCard";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`${API_URL}/inventories`);
      setInventories(response.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };
  useEffect(() => {
    fetchInventories();
  }, []);

  return (
    <section className="inventory-list">
      {inventories.map((inventory) => (
        <InventoryCard
          key={inventory.id}
          inventory_id={inventory.id}
          item_name={inventory.item_name}
          category={inventory.category}
          status={inventory.status}
          quantity={inventory.quantity}
          warehouse_id={inventory.warehouse_id}
          refreshList={fetchInventories}
        />
      ))}
    </section>
  );
};

export default InventoryList;
