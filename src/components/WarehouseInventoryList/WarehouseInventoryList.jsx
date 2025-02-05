import "./WarehouseInventoryList.scss";

import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const WarehouseInventoryList = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseResponse = await axios.get("http://localhost/warehouse");
        setWarehouse(warehouseResponse.data);
        
        const inventoryResponse = await axios.get(`http://localhost/warehouse/${id}/inventory`);
        setInventory(inventoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [id]);

  if (!warehouse) return <p>Loading...</p>;

  return (
    <div className="warehouse-container">
      
      <table>
        <thead>
          <tr>
            <th>Inventory Item</th>
            <th>Category</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td><a href={`/inventory/${item.id}`}>{item.name}</a></td>
              <td>{item.category}</td>
              <td className={item.status === "IN STOCK" ? "in-stock" : "out-of-stock"}>{item.status}</td>
              <td>{item.quantity}</td>
              <td>
                <FaTrash className="icon delete" />
                <FaEdit className="icon edit" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseInventoryList;