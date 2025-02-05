import "./WarehouseDetails.scss";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";

const WarehouseDetails = () => {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState([]);

    const baseUrl = import.meta.env.API_URL;

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
            <div className="title-wrapper">
                <div className="title-wrapper__left">
                    <Link to="/">
                        <img className="title-wrapper__arrow" src={arrowBack} alt="back" />
                    </Link>
                    <h2 className="title-wrapper__h2">{warehouse.warehouse_name}</h2>
                </div>
                <div className="title-wrapper__right">
                    <img src={editWhiteFill} alt="edit" />                  
                </div>
            </div>

            <hr className="divider"></hr>
            <div className="details">
                <div>
                    <p className="details__labels">WAREHOUSE ADDRESS:</p>
                    <p className="details__outputs">{warehouse.address}</p>
                </div>
                <div className="details__contact-section">
                    <div>
                        <p className="details__labels">CONTANCT NAME:</p>
                        <p className="details__outputs">{warehouse.contact_name}</p>
                        <p className="details__outputs">{warehouse.contact_position}</p>
                    </div>
                    <div>
                        <p className="details__labels">CONTACT INFORMATION:</p>
                        <p className="details__outputs">{warehouse.contact_phone}</p>
                        <p className="details__outputs">{warehouse.contact_email}</p>
                    </div>
                </div>
            </div>        

        </section>
    );
};

export default WarehouseDetails;
