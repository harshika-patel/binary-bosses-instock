import "./WarehouseDetails.scss";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";

const WarehouseDetails = () => {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState(null);

    const baseUrl = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchWarehouse = async () => {
          try {
            const warehouseResponse = await axios.get(`${baseUrl}/warehouses/${warehouseId}`);
            setWarehouse(warehouseResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchWarehouse();
    }, [warehouseId]);

    if (!warehouse) return <p>Loading...</p>



    return (
    <section>
        <div>
            <img src={arrowBack} alt="back" />
            <h2>{warehouse.warehouse_name}</h2>
            <img src={editWhiteFill} alt="edit" />
        </div>

        <hr></hr>
        <div>
            <div>
                <p>WAREHOUSE ADDRESS:</p>
                <p>{warehouse.address}</p>
            </div>
            <div>
                <p>CONTANCT NAME:</p>
                <p>{warehouse.contact_name}</p>
                <p>{warehouse.contact_position}</p>
            </div>
            <div>
                <p>CONTACT INFORMATION</p>
                <p>{warehouse.contact_phone}</p>
                <p>{warehouse.contact_email}</p>
            </div>
        </div>

        <hr></hr>
        

    </section>
    );
};

export default WarehouseDetails;
