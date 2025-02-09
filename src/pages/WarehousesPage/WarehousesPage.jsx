import "./WarehousesPage.scss";
import WarehouseTableHeader from "../../components/WarehouseTableHeader/WarehouseTableHeader";
import WarehouseSearchBox from "../../components/WarehouseSearchBox/WarehouseSearchBox";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

const WarehousesPage = () => {
  return (
    <div className="warehouse">
      <WarehouseSearchBox />
      <WarehouseTableHeader />
      <WarehouseList />
    </div>
  );

};

export default WarehousesPage;
