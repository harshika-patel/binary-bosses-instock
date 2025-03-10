import "./WarehouseEdit.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";

const WarehouseEdit = ({ warehouseData }) => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (warehouseData) {
      setFormData((prevData) => ({
        ...prevData,
        warehouse_name: warehouseData.warehouse_name || "",
        address: warehouseData.address || "",
        city: warehouseData.city || "",
        country: warehouseData.country || "",
        contact_name: warehouseData.contact_name || "",
        contact_position: warehouseData.contact_position || "",
        contact_phone: warehouseData.contact_phone || "",
        contact_email: warehouseData.contact_email || "",
      }));
    }
  }, [warehouseData]);

  //handle for input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(`${baseUrl}/warehouses/${warehouseId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Warehouse updated successfully!");
      navigate("/"); //redirect to warehouse list;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error updating warehouse.";
      setMessage(errorMsg);
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="warehouse-form">
      <div className="warehouse-form__header">
        <Link to="/" className="warehouse-form__header-link">
          <img className="back-arrow" src={arrowBack} alt="Back" />
        </Link>
        <h1 className="warehouse-edit__title">Edit Warehouse</h1>
      </div>
      <hr className="warehouse-edit__divider" />
      <form onSubmit={handleSubmit} className="warehouse-edit__form">
        <article className="form-section">
          <div className="section">
            <h2>Warehouse Details</h2>
            <label htmlFor="warehouse_name">
              <h3>Warehouse Name</h3>
            </label>
            <input
              id="warehouse_name"
              type="text"
              name="warehouse_name"
              value={formData.warehouse_name}
              onChange={handleChange}
            />

            <label htmlFor="address" className="warehouse-edit__label">
              <h3>Street Address</h3>
            </label>
            <input
              id="address"
              type="text"
              name="address"
              className="warehouse-edit__input"
              value={formData.address}
              onChange={handleChange}
            />

            <label htmlFor="city" className="warehouse-edit__label">
              <h3>City</h3>
            </label>
            <input
              id="city"
              type="text"
              name="city"
              className="warehouse-edit__input"
              value={formData.city}
              onChange={handleChange}
            />

            <label htmlFor="country" className="warehouse-edit__label">
              <h3>Country</h3>
            </label>
            <input
              id="country"
              type="text"
              name="country"
              className="warehouse-edit__input"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <hr className="warehouse-edit__divider" />

          <div className="section">
            <h2>Contact Details</h2>
            <label htmlFor="contact_name" className="warehouse-edit__label">
              <h3>Contact Name</h3>
            </label>
            <input
              id="contact_name"
              type="text"
              name="contact_name"
              className="warehouse-edit__input"
              value={formData.contact_name}
              onChange={handleChange}
            />

            <label htmlFor="contact_position" className="warehouse-edit__label">
              <h3>Position</h3>
            </label>
            <input
              id="contact_position"
              type="text"
              name="contact_position"
              className="warehouse-edit__input"
              value={formData.contact_position}
              onChange={handleChange}
            />

            <label htmlFor="contact_phone" className="warehouse-edit__label">
              <h3>Phone Number</h3>
            </label>
            <input
              id="contact_phone"
              type="tel"
              name="contact_phone"
              className="warehouse-edit__input"
              value={formData.contact_phone}
              onChange={handleChange}
            />

            <label htmlFor="contact_email" className="warehouse-edit__label">
              <h3>Email</h3>
            </label>
            <input
              id="contact_email"
              type="email"
              name="contact_email"
              className="warehouse-edit__input"
              value={formData.contact_email}
              onChange={handleChange}
            />
          </div>
        </article>
        <div className="buttons">
          <Link to={"/"}>
            <button type="button" className="cancel">
              Cancel
            </button>
          </Link>
          <button type="submit" className="save" disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </button>
        </div>

        {message && <p className="warehouse-edit__message">{message}</p>}
      </form>
    </section>
  );
};

export default WarehouseEdit;
