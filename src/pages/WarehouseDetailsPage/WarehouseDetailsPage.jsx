import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import "./WarehouseDetailsPage.scss";

const WarehouseDetailsPage = () => {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const warehouseResponse = await axios.get(
          `${baseUrl}/warehouses/${warehouseId}`
        );
        setWarehouse(warehouseResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWarehouse();
  }, [warehouseId]);

  if (!warehouse) return <p>Loading...</p>;
  return (
    <div className="warehouseDetails">
      <WarehouseDetails warehouse={warehouse} />
      <WarehouseInventoryList warehouseId={warehouseId} />
    </div>
  );
};

export default WarehouseDetailsPage;
