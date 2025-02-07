import "./InventoryTableHeader.scss";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const InventoryTableHeader = () => {
  return (
    <div className="inventory-table-header">
      <div className="inventory-table-header__column">
        <h3>INVENTORY ITEM</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="inventory-table-header__icon"
        />
      </div>

      <div className="inventory-table-header__column">
        <h3>CATEGORY</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="inventory-table-header__icon"
        />
      </div>

      <div className="inventory-table-header__column">
        <h3>STATUS</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="inventory-table-header__icon"
        />
      </div>

      <div className="inventory-table-header__column">
        <h3>QTY</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="inventory-table-header__icon"
        />
      </div>

      <div className="inventory-table-header__column">
        <h3>WAREHOUSE</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="inventory-table-header__icon"
        />
      </div>

      <div className="inventory-table-header__column inventory-table-header__column--actions">
        <h3>ACTIONS</h3>
      </div>
    </div>
  );
};

export default InventoryTableHeader;
