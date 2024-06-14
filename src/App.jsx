import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Inicio from "./Pages/modules/dashboard/Inicio";
import './App.css'
import Productos from "./Pages/modules/items/Productos";
import InventoryReport from "./Pages/modules/Inventory/inventory_report";
import InventoryKardex from "./Pages/modules/Inventory/inventory_kardex";
import Orders from "./Pages/modules/orders/ordes";
import Sales from "./Pages/modules/sales/sales";
import Reports from "./Pages/modules/reports/reports";
import Configuration from "./Pages/modules/configuration/configuration";
import Insumos from "./Pages/modules/insumos/Insumos";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/home" element={<Inicio />}></Route>
          <Route path="/items" element={<Productos />}></Route>
          <Route path="/insumos" element={<Insumos />}></Route>
          <Route path="/items/inventory_report" element={<InventoryReport/>}></Route>
          <Route path="/items/inventory_kardex" element={<InventoryKardex/>}></Route>
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/sales" element={<Sales/>}></Route>
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/configuration" element={<Configuration/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
