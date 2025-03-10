import "./WarehouseAddNew.scss";
import React, { useState } from "react";
import axios from "axios";
import backAerrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";

const WarehouseAddNew = () => {
  const [formData, setFormData] = useState({
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(phone);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on field change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate fields manually
    if (
      !formData.warehouseName ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.country ||
      !formData.contactName ||
      !formData.position ||
      !formData.phoneNumber ||
      !formData.email
    ) {
      newErrors.warehouseName = "Warehouse name is required.";
    }
    if (!formData.streetAddress) {
      newErrors.streetAddress = "Street address is required.";
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    if (!formData.country) {
      newErrors.country = "Country is required.";
    }
    if (!formData.contactName) {
      newErrors.contactName = "Contact name is required.";
    }
    if (!formData.position) {
      newErrors.position = "Contact position is required.";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Contact phone number is required.";
    }
    if (!formData.email) {
      newErrors.email = "Contact email is required.";
    }

    // Additional validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be in +1 (XXX) XXX-XXXX format.";
    }

    // If there are any errors, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestData = {
      warehouse_name: formData.warehouseName,
      address: formData.streetAddress,
      city: formData.city,
      country: formData.country,
      contact_name: formData.contactName,
      contact_position: formData.position,
      contact_phone: formData.phoneNumber,
      contact_email: formData.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/warehouses",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      alert("Warehouse added successfully!");

      // Reset form
      setFormData({
        warehouseName: "",
        streetAddress: "",
        city: "",
        country: "",
        contactName: "",
        position: "",
        phoneNumber: "",
        email: "",
      });
      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add warehouse.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to the warehouse list
  };
  return (
    <div className="warehouse-form">
      <div className="warehouse-form__header">
        <Link to="/" className="warehouse-form__header-link">
          <img src={backAerrow} alt="Back" className="back-arrow" />
        </Link>
        <h1>Add New Warehouse</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section">
            <h2>Warehouse Details</h2>
            <label>
              <h3>Warehouse Name</h3>
            </label>
            <input
              type="text"
              name="warehouseName"
              value={formData.warehouseName}
              onChange={handleChange}
              placeholder="Warehouse Name"
              className={errors.warehouseName ? "error" : ""}
            />
            <div>
              {errors.warehouseName && (
                <span className="error-message">{errors.warehouseName}</span>
              )}
            </div>
            <label>
              <h3>Street Address</h3>
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Street Address"
              className={errors.streetAddress ? "error" : ""}
            />
            <div>
              {errors.streetAddress && (
                <span className="error-message">{errors.streetAddress}</span>
              )}
            </div>
            <label>
              <h3>City</h3>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className={errors.city ? "error" : ""}
            />
            <div>
              {errors.city && (
                <span className="error-message">{errors.city}</span>
              )}
            </div>
            <label>
              <h3>Country</h3>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className={errors.country ? "error" : ""}
            />
            <div>
              {errors.country && (
                <span className="error-message">{errors.country}</span>
              )}
            </div>
          </div>

          <hr />
          {/* Contact Details */}
          <div className="section">
            <h2>Contact Details</h2>
            <label>
              <h3>Contact Name</h3>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Contact Name"
              className={errors.contactName ? "error" : ""}
            />
            <div>
              {errors.contactName && (
                <span className="error-message">{errors.contactName}</span>
              )}
            </div>
            <label>
              <h3>Position</h3>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className={errors.position ? "error" : ""}
            />
            <div>
              {errors.position && (
                <span className="error-message">{errors.position}</span>
              )}
            </div>
            <label>
              <h3>Phone Number</h3>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className={errors.phoneNumber ? "error" : ""}
            />
            <div>
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>
            <label>
              <h3>Email</h3>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            <div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="add-warehouse">
            + Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseAddNew;
