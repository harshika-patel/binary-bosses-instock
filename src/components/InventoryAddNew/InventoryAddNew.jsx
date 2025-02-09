import "./InventoryAddNew.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryAddNew = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
  });

  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_URL}/warehouses`);
        console.log("Warehouses fetched:", response.data);
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "status" && value === "Out of Stock" ? { quantity: 0 } : {}),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "This field is required." : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.warehouse_id)
      newErrors.warehouse_id = "Warehouse is required.";
    if (!formData.item_name) newErrors.item_name = "Item name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    if (
      formData.status === "In Stock" &&
      (!formData.quantity ||
        isNaN(Number(formData.quantity)) ||
        Number(formData.quantity) < 1)
    ) {
      newErrors.quantity = "Quantity must be a valid number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestData = {
      warehouse_id: Number(formData.warehouse_id),
      item_name: formData.item_name,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      quantity:
        formData.status === "Out of Stock"
          ? 0
          : parseInt(formData.quantity, 10),
    };

    try {
      const response = await axios.post(`${API_URL}/inventories`, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      alert("Inventory item added successfully!");

      setFormData({
        warehouse_id: "",
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: "",
      });

      navigate("/inventory");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add inventory.");
    }
  };

  return (
    <div className="inventory-form">
      <div className="inventory-form__header">
        <Link to="/inventory" className="inventory-form__header-link">
          <img src={backArrow} alt="Back" className="back-arrow" />
        </Link>
        <h1>Add New Inventory Item</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section">
            <h2>Item Details</h2>

            <label><h3>Item Name</h3></label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Item Name"
            />
            {errors.item_name && (
              <span className="error-message">{errors.item_name}</span>
            )}

          <label><h3>Description</h3></label>
            <textarea
              className="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}

          <label><h3>Category</h3></label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Please select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Gear">Gear</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>

          <hr className="form-divider" />

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
                <text> In Stock</text>
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={handleChange}
                />
                <text>Out of Stock</text>
              </label>
            </div>

            {formData.status === "In Stock" && (
              <div className="quantity-field">
                <label><h3>Quantity</h3></label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="Enter quantity"
                  disabled={formData.status === "Out of Stock"}
                  className={
                    formData.status === "Out of Stock" ? "disabled" : ""
                  }
                />
              </div>
            )}

            <label><h3>Warehouse</h3></label>
            <select
              name="warehouse_id"
              value={formData.warehouse_id}
              onChange={handleChange}
            >
              <option value="">Please select</option>
              {warehouses.length > 0 ? (
                warehouses.map((wh, index) => {
                  console.log(`Rendering Warehouse #${index + 1}:`, wh);
                  return (
                    <option key={wh.id} value={wh.id}>
                      {wh.warehouse_name || wh.name}
                    </option>
                  );
                })
              ) : (
                <option disabled>Loading warehouses...</option>
              )}
            </select>

            {errors.warehouse_id && (
              <span className="error-message">{errors.warehouse_id}</span>
            )}
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="cancel"
            onClick={() => navigate("/inventory")}
          >
            Cancel
          </button>
          <button type="submit" className="add-item">
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryAddNew;
