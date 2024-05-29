import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import AddNewWarehouse from "./pages/AddNewWarehouse/AddNewWarehouse";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryItemDetails from "./pages/InventoryItemDetails/InventoryItemDetails";
import AddNewInventoryItem from "./pages/AddNewInventoryItem/AddNewInventoryItem";
import EditInventoryItem from "./pages/EditInventoryItem/EditInventoryItem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WarehouseList />} />
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/warehouses/:warehouseId" element={<WarehouseDetails />} />
          <Route path="/warehouses/new" element={<AddNewWarehouse />} />
          <Route path="/warehouses/:warehouseId/edit" element={<EditWarehouse />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/:inventoryId" element={<InventoryItemDetails />} />
          <Route path="/inventory/new" element={<AddNewInventoryItem />} />
          <Route path="/inventory/:inventoryId/edit" element={<EditInventoryItem />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
