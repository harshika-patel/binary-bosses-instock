import "./InventoryItemDetails.scss";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";

const InventoryItemDetails = () => {
    const { id } = useParams(); // Fetch ID from URL params
    const [inventory, setInventory] = useState(null); // Changed to null initially
    const [loading, setLoading] = useState(true); // To handle loading state

    const baseUrl = import.meta.env.API_URL; // Ensure this is set to your API base URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/inventories/${id}`);
                setInventory(response.data); // Set inventory data which includes warehouse_name
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchData();
    }, [id]); // Dependency on id, will refetch if the id changes

    if (loading) {
        return <p>Loading...</p>; // Display loading message while fetching data
    }

    if (!inventory) {
        return <p>Inventory item not found.</p>; // Show error message if inventory is not found
    }

    return ( 
    <section className="component-card">
        <div className="title-wrapper">
                <div className="title-wrapper__left">
                    <Link to="/inventory">
                        <img className="title-wrapper__arrow" src={arrowBack} alt="back" />
                    </Link>
                    <h2 className="title-wrapper__h2">{inventory.warehouse_name}</h2>
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
                    <p className="details__outputs">{inventory.warehouse_name}</p>
                </div>
            </div>
        </div>

    </section>
    );
};

export default InventoryItemDetails;
