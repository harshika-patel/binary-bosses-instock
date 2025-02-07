import "./InventorySearchBox.scss";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/Icons/search-24px.svg";

const InventorySearchBox = () => {
  return (
    <div className="inventory-search">
      <h1 className="inventory-search__title">Inventory</h1>

      <div className="inventory-search__controls">
        <div className="inventory-search__input-container">
          <input
            type="text"
            className="inventory-search__input"
            placeholder="Search..."
          />
          <img
            src={searchIcon}
            alt="Search"
            className="inventory-search__icon"
          />
        </div>

        <Link to="/inventory/add" className="inventory-search__add-link">
          <button className="inventory-search__add-button">
            + Add New Item
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InventorySearchBox;
