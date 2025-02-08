import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InventoryItemDetails from "../../components/InventoryItemDetails/InventoryItemDetails";

const InventoryItemDetailsPage = () => {
  const { inventoryId } = useParams();
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        console.log(`Fetching inventory details for ID: ${inventoryId}`);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/inventories/${inventoryId}`
        );
        setInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError("Error fetching inventory details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [inventoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <InventoryItemDetails inventory={inventory} />;
};

export default InventoryItemDetailsPage;
