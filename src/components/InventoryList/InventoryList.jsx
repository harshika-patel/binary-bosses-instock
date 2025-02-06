import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InventoryCard from "../../components/InventoryCard/InventoryCard";
import "./InventoryList.scss";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);

    const fetchInventories = async () => {
        try {
            const response = await axios.get(`${API_URL}/inventories`);
            setInventories(response.data);
        } catch (err) {
            console.error("Error fetching inventories:", err);
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
                    inventory_name={inventory.inventoryname}
                    address={inventory.address}
                    city={inventory.city}
                    country={inventory.country}
                    contact_name={inventory.contact_name}
                    contact_phone={inventory.contact_phone}
                    contact_email={inventory.contact_email}
                    refreshList={fetchInventories}
                    />
            ))}
        </section>
    );
};

export default InventoryList;
