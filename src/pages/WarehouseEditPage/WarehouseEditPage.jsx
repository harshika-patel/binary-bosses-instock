// import "./WarehouseEditPage.scss";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// const WarehouseEditPage = () => {
//     return (
//         <div>
//             <p>Individual Warehouse Edit Page</p>
//         </div>
//     );
// };

// export default WarehouseEditPage;


// import "./WarehouseEdit.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseEdit from "../../components/WarehouseEdit/WarehouseEdit";

const WarehouseEditPage = () => {
  const { warehouseId } = useParams();
  const baseUrl = import.meta.env.API_URL;
  const [warehouseData, setWarehouseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${baseUrl}/warehouses/${warehouseId}`);
        setWarehouseData(response.data);
      } catch (err) {
        setError("Error fetching warehouse data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouse();
  }, [warehouseId, baseUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <WarehouseEdit warehouseData={warehouseData} />;
};

export default WarehouseEditPage;
