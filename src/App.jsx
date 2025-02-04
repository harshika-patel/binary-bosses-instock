import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehouseEditPage from "./pages/WarehouseEditPage/WarehouseEditPage";
import WarehouseAddNewPage from "./pages/WarehouseAddNewPage/WarehouseAddNewPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import InventoryItemDetailsPage from "./pages/InventoryItemDetailsPage/InventoryItemDetailsPage";
import InventoryEditItemPage from "./pages/InventoryEditItemPage/InventoryEditItemPage";
import InventoryAddNewPage from "./pages/InventoryAddNewPage/InventoryAddNewPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<WarehousesPage />} />
            <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />} />
            <Route path="/warehouses/:warehouseId/edit" element={<WarehouseEditPage />} />
            <Route path="/warehouses/add" element={<WarehouseAddNewPage />} />

            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/:inventoryId" element={<InventoryItemDetailsPage />} />
            <Route path="/inventory/:inventoryId/edit" element={<InventoryEditItemPage />} />
            <Route path="/inventory/add" element={<InventoryAddNewPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
