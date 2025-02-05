import "./WarehouseTableHeader.scss";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const WarehouseTableHeader = () => {
  return (
    <div className="warehouse-table-header">
      <div className="warehouse-table-header__column">
        <h3>WAREHOUSE</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="warehouse-table-header__icon"
        />
      </div>

      <div className="warehouse-table-header__column">
        <h3>ADDRESS</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="warehouse-table-header__icon"
        />
      </div>

      <div className="warehouse-table-header__column">
        <h3>CONTACT NAME</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="warehouse-table-header__icon"
        />
      </div>

      <div className="warehouse-table-header__column">
        <h3>CONTACT INFORMATION</h3>
        <img
          src={sortIcon}
          alt="Sort"
          className="warehouse-table-header__icon"
        />
      </div>

      <div className="warehouse-table-header__column warehouse-table-header__column--actions">
        <h3>ACTIONS</h3>
      </div>
    </div>
  );
};

export default WarehouseTableHeader;
