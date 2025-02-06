import "./InventoryPage.scss";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import InventoryList from "../../components/InventoryList/InventoryList";

const InventoryPage = () => {
    return (
        <div className="inventory">
        <InventoryList />
      </div>
    );
};

export default InventoryPage;
