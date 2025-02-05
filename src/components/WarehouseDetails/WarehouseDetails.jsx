import "./WarehouseDetails.scss";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";

const WarehouseDetails = () => {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState(null);

    const baseUrl = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchWarehouse = async () => {
          try {
            const { data } = await fetch(`${baseUrl}/warehouses/${id}`);
            setWarehouse(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchWarehouse();
    }, [warehouseId]);



    return (
    <section>
        <div>
            <img src={arrowBack} alt="back" />
            <h2>{warehouse_name}</h2>
            <img src={editWhiteFill} alt="edit" />
        </div>

        <hr></hr>
        <div>
            <div>
                <p>WAREHOUSE ADDRESS:</p>
                <p>{address}</p>
            </div>
            <div>
                <p>CONTANCT NAME:</p>
                <p>{contact_name}</p>
                <p>{contanct_position}</p>
            </div>
            <div>
                <p>CONTACT INFORMATION</p>
                <p>{contanct_phone}</p>
                <p>{contanct_email}</p>
            </div>
        </div>

        <hr></hr>
        

    </section>
    );
};

export default WarehouseDetails;
