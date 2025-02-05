import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import WarehouseCard from "../WarehouseCard/WarehouseCard";
import "./WarehouseList.scss";

const API_URL = import.meta.env.VITE_API_URL;

function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_URL}/warehouses`);
        setWarehouses(response.data);
      } catch (err) {
        console.error("Error fetching warehoue:", err);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <section className="warehouse-list">
      {warehouses.map((warehouse) => (
        <WarehouseCard
          key={warehouse.id}
          warehouse_name={warehouse.warehouse_name}
          address={warehouse.address}
          city={warehouse.city}
          country={warehouse.country}
          contact_name={warehouse.contact_name}
          contact_phone={warehouse.contact_phone}
          contact_email={warehouse.contact_email}
        />
      ))}
    </section>
  );
}

export default WarehouseList;
