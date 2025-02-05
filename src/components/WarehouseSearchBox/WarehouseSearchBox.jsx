import "./WarehouseSearchBox.scss";
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

        <button className="warehouse-search__add-button">
          + Add New Warehouse
        </button>
      </div>
    </div>
  );
};

export default WarehouseSearchBox;
