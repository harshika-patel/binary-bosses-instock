import "./WarehousesPage.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

const WarehousesPage = ({ warehouses, handleDeleteWarehouse }) => {
    // const [warehouses, setWarehouses] = useState([]);

    // useEffect(() => {
    //     fetchWarehouses();
    // }, []);
    // const handleDeleteWarehouse = async (id) => {
    //     try {
    //         const response = await fetch(`/api/warehouses/${id}`, { method: "DELETE" });
    //         if (response.ok) {
    //             setWarehouses((prevWarehouses) => prevWarehouses.filter((w) => w.id !== id));
    //         } else {
    //             console.error("Failed to delete warehouse");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting warehouse:", error);
    //     }
    // };
    return (
        <>
            <p>Warehouse Page</p>
            <WarehouseList warehouses={warehouses} handleDeleteWarehouse={handleDeleteWarehouse} />
        </>
    );
};

export default WarehousesPage;
