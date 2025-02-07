import "./WarehouseSearchBox.scss";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/Icons/search-24px.svg";

const WarehouseSearchBox = () => {
  return (
    <div className="warehouse-search">
      <h1 className="warehouse-search__title">Warehouses</h1>

      <div className="warehouse-search__controls">
        <div className="warehouse-search__input-container">
          <input
            type="text"
            className="warehouse-search__input"
            placeholder="Search..."
          />
          <img
            src={searchIcon}
            alt="Search"
            className="warehouse-search__icon"
          />
        </div>

        <Link to="/warehouses/add" className="warehouse-search__add-link">
          <button className="warehouse-search__add-button">
            + Add New Warehouse
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WarehouseSearchBox;
