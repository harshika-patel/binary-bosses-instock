import "./WarehousesPage.scss";
import WarehouseTableHeader from "../../components/WarehouseTableHeader/WarehouseTableHeader";
import WarehouseSearchBox from "../../components/WarehouseSearchBox/WarehouseSearchBox";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const WarehousesPage = () => {
  return (
    <div className="warehouse">
      <WarehouseSearchBox />
      <WarehouseTableHeader />
      <WarehouseList />
    </div>
  );
};

export default WarehousesPage;
