import "./InventoryAddNew.scss";
import React, { useState } from "react";
import axios from "axios"; 
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link} from "react-router-dom"; 

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
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};


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

    history.push("/inventory-details");
  };

  return (
    <div className="inventory-form">
      <div className="inventory-form__header">
        <Link to="/inventory-details" className="inventory-form__header-link">
            <img src={backArrow} alt="Back" className="back-arrow" />
        </Link>
        <h1>Add New Inventory Item</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="section">
            <h2>Item Details</h2>
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
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? "dropdown error" : "dropdown"}
            >
                <option value="">Please select</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
            </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <hr />
        {/* Status*/}
        <div className="section">
            <h2>Item Availability</h2>
        <label><h3>Status</h3></label>
        <div className="status-options">
        <label>
            <input 
                type="radio" 
                name="status" 
                value="In Stock" 
                checked={formData.status === "In Stock"}
                onChange={handleChange}
            />
            In Stock
        </label>
        
        <label>
            <input 
                type="radio" 
                name="status" 
                value="Out of Stock" 
                checked={formData.status === "Out of Stock"}
                onChange={handleChange}
            />
            Out of Stock
        </label>
        </div>

    {formData.status === "In Stock" && (
        <div className="quantity-field">
            <label>Quantity:</label>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                placeholder="Enter quantity"
            />
        </div>
    )}

        <label><h3>Warehouse</h3></label>
        <select
            name="warehouse"
            value={formData.warehouseId}
            onChange={handleChange}
            className={errors.warehouse ? "dropdown error" : "dropdown"}
        >
            <option value="">Please select</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
            <option value="Warehouse D">Warehouse D</option>
        </select>
        {errors.warehouse && <span className="error-message">{errors.warehouse}</span>}
        </div>
        <div className="buttons">
        <Link to="/inventory-details"><button type="button" className="cancel" onClick={handleCancel}>Cancel</button></Link>
        <Link to="/inventory-details"><button type="submit" className="add-inventoryitem">+ Add Warehouse</button></Link> 
        </div>
      </form>
    </div>
  );
};

export default InventoryAddNew;