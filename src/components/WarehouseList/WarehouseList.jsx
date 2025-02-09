import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import "./WarehouseList.scss";

const API_URL = import.meta.env.VITE_API_URL;

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouses`);
      setWarehouses(response.data);
    } catch (err) {
      console.error("Error fetching warehoue:", err);
    }
  };
  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <section className="warehouse-list">
      {warehouses.map((warehouse) => (
        <WarehouseCard
          key={warehouse.id}
          warehouse_id={warehouse.id}
          warehouse_name={warehouse.warehouse_name}
          address={warehouse.address}
          city={warehouse.city}
          country={warehouse.country}
          contact_name={warehouse.contact_name}
          contact_phone={warehouse.contact_phone}
          contact_email={warehouse.contact_email}
          refreshList={fetchWarehouses}
        />
      ))}
    </section>
  );
};

export default WarehouseList;
