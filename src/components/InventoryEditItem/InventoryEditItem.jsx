import "./InventoryEditItem.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryEditItem = () => {
  const navigate = useNavigate();
  const { inventoryId } = useParams();

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/inventories/${inventoryId}`
        );
        setFormData((prevData) => ({
          ...prevData,
          warehouse_id: response.data.warehouse_id || "",
          item_name: response.data.item_name || "",
          description: response.data.description || "",
          category: response.data.category || "",
          status: response.data.status || "In Stock",
          quantity: response.data.quantity || "",
        }));
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    if (inventoryId) {
      fetchInventoryItem();
    }
  }, [inventoryId]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_URL}/warehouses`);
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
      const response = await axios.put(
        `${API_URL}/inventories/${inventoryId}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Updated Inventory Item:", response.data);
      alert("Inventory item updated successfully!");
      navigate("/inventory");
    } catch (error) {
      console.error(
        "Error updating inventory item:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to update inventory.");
    }
  };

  return (
    <div className="inventory-form">
      <div className="inventory-form__header">
        <Link to="/inventory" className="inventory-form__header-link">
          <img src={backArrow} alt="Back" className="back-arrow" />
        </Link>
        <h1>Edit Inventory Item</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section section-deatils">
            <h2>Item Details</h2>

            <label>Item Name</label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Enter item name"
            />
            {errors.item_name && (
              <span className="error-message">{errors.item_name}</span>
            )}

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}

            <label>Category</label>
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

          <div className="section section-about">
            <h2>Item Availability</h2>

            <label>Status</label>
            <div className="status-options">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={formData.status === "In Stock"}
                  onChange={handleChange}
                />
                <span> In Stock</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={handleChange}
                />
                <span>Out of Stock</span>
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

            <label>Warehouse</label>
            <select
              name="warehouse_id"
              value={formData.warehouse_id}
              onChange={handleChange}
            >
              <option value="">Select Warehouse</option>
              {warehouses.length > 0 ? (
                warehouses.map((wh, index) => (
                  <option key={wh.id} value={wh.id}>
                    {wh.warehouse_name || wh.name}
                  </option>
                ))
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryEditItem;
