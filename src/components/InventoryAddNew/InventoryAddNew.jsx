import "./InventoryAddNew.scss";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import backAerrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link} from "react-router-dom"; // Use history for navigation

const InventoryAddNew = () => {
  
  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on field change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate fields manually
    if (!formData.warehouse_id || !formData.item_name||!formData.description||!formData.category||!formData.status||(formData.status === "In Stock" && !formData.quantity)) {
      newErrors.warehouse_id = 'All fields are required.';
    }
    if (!formData.warehouse_id) {
        newErrors.warehouse_id = 'Warehouse name is required.';
    }
    if (!formData.item_name) {
      newErrors.item_name = 'Item name is required.';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required.';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required.';
    }
    if (formData.status === "In Stock" && isNaN(formData.quantity)) {
        setError("Quantity must be a valid number.");
        return;
      }
    // If there are any errors, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestData = {
        warehouse_id: formData.warehouseId,
        item_name: formData.itemName,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        quantity: formData.quantity,
    };

    try {
      const response = await axios.post("http://localhost:8080/inventories", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      alert("Inventory item added successfully!");

      // Reset form
      setFormData({
        warehouse_id: "",
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add inventory.");
    }
  };

  const handleCancel = () => {
    // Optionally navigate away or reset form
    history.push("/inventory-details"); // Navigate back to warehouse details page
  };

  return (
    <div className="inventory-form">
      <div className="inventory-form__header">
        <Link to="/inventory-details" className="inventory-form__header-link">
            <img src={backArrow} alt="Back" className="back-arrow" />
        </Link>
        <h1>Add New Inventory</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h2>Inventory Details</h2>
          <label><h3>Inventory ID</h3></label>
          <input
            type="number"
            name="warehouseId"
            value={formData.warehouse_id}
            onChange={handleChange}
            placeholder="Warehouse ID"
            className={errors.warehouse_id ? "error" : ""}
          />
          {errors.warehouse_id && <span className="error-message">{errors.warehouse_id}</span>}

          <label><h3>Item Name</h3></label>
          <input
            type="text"
            name="itemName"
            value={formData.item_name}
            onChange={handleChange}
            placeholder="Item Name"
            className={errors.item_name ? "error" : ""}
          />
          {errors.item_name && <span className="error-message">{errors.itemName}</span>}

          <label><h3>Description</h3></label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className={errors.description ? "error" : ""}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}

          <label><h3>Category</h3></label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className={errors.category ? "error" : ""}
          />
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <hr />
        {/* Status*/}
        <div className="section">
        <h2>Status:</h2>
        <label><h3>Status</h3></label>
        <select name="status" value={formData.status} onChange={handleChange}>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
        </select>

        {formData.status === "In Stock" && (
        <>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </>
        )}

        <div className="buttons">
        <Link to="/inventory-details"><button type="button" className="cancel" onClick={handleCancel}>Cancel</button></Link>
        <Link to="/inventory-details"><button type="save" className="save">Save</button></Link> 
        </div>
      </form>
    </div>
  );
};

export default InventoryAddNew;