import "./InventoryItemDetails.scss";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";

const InventoryItemDetails = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const [inventory, setInventory] = useState([]);

    const baseUrl = import.meta.env.API_URL;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const warehouseResponse = await axios.get(`${baseUrl}/warehouses`);
          setWarehouse(warehouseResponse.data);
          
          const inventoryResponse = await axios.get(`${baseUrl}/warehouses/${id}/inventories`);
          setInventory(inventoryResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [id]);

    return ( 
    <section className="component-card">
        <div className="title-wrapper">
                <div className="title-wrapper__left">
                    <Link to="/warehouses/:warehouseId">
                        <img className="title-wrapper__arrow" src={arrowBack} alt="back" />
                    </Link>
                    <h2 className="title-wrapper__h2">{inventory.inventory_name}</h2>
                </div>
                <div className="title-wrapper__right">
                    <img src={editWhiteFill} alt="edit" />                  
                </div>
        </div>

        <hr className="divider"></hr>

        <div className="details">
            <div>
                <div>
                    <p className="details__labels">ITEM DESCRIPTION:</p>
                    <p className="details__outputs">{inventory.description}</p>
                </div>
                <div>
                    <p className="details__labels">CATEGORY:</p>
                    <p className="details__outputs">{inventory.category}</p>
                </div>
            </div>
            <div className="details_right-data">
                <div className="status-and-quantity">
                    <div>
                        <p className="details__labels">STATUS:</p>
                        <p>
                            {inventory.status}
                        </p>
                    </div>
                    <div>
                        <p className="details__labels">QUANTITY:</p>
                        <p className="details__outputs">{inventory.quantity}</p>
                    </div>
                </div>
                <div>
                    <p className="details__labels">WAREHOUSE:</p>
                    <p className="details__outputs">{warehouse.warehouse_name}</p>
                </div>
            </div>
        </div>

    </section>
    );
};

export default InventoryItemDetails;
