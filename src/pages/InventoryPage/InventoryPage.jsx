import "./InventoryPage.scss";
import InventoryList from "../../components/InventoryList/InventoryList";
import InventoryTableHeader from "../../components/InventoryTableHeader/InventoryTableHeader";
import InventorySearchBox from "../../components/InventorySearchBox/InventorySearchBox";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const InventoryPage = () => {
  return (
    <div className="inventory">
      <InventorySearchBox />
      <InventoryTableHeader />
      <InventoryList />
    </div>
  );
};

export default InventoryPage;
