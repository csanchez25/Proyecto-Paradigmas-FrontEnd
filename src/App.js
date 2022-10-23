import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPersona from "./components/AddPersona";
import AddProducto from "./components/AddProducto";
import AddTipoVenta from "./components/AddTipoVenta";
import AddVenta from "./components/AddVenta";
import VentaList from "./components/VentaList";
import Venta from "./components/Venta";
import Persona from "./components/Persona";
import Producto from "./components/Producto";
import TipoVenta from "./components/TipoVenta";
import PersonaList from "./components/PersonaList";
import ProductoList from "./components/ProductoList";
import TipoVentaList from "./components/TipoVentaList";
import LogList from "./components/LogList";
import "./App.css";

function App() {
  return (<div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="navbar-nav mr-auto">
        <a className="navbar-brand" href="Logo"><img src="Logo.jpg" alt="Logo" class="rounded-pill" /></a>
        <li className="nav-item">
          <Link to={"/addPersona"} className="nav-link">Añadir Persona</Link>
        </li>
        <li className="nav-item">
          <Link to={"/personas"} className="nav-link">Lista de Personas</Link>
        </li>
        <li className="nav-item">
          <Link to={"/addProducto"} className="nav-link">Añadir Producto</Link>
        </li>
        <li className="nav-item">
          <Link to={"/productos"} className="nav-link">Lista de Productos</Link>
        </li>
        <li className="nav-item">
          <Link to={"/addTipoVenta"} className="nav-link">Añadir Tipo de Venta</Link>
        </li>
        <li className="nav-item">
          <Link to={"/tipoVentas"} className="nav-link">Lista de Tipos de Ventas</Link>
        </li>
        <li className="nav-item">
          <Link to={"/addVenta"} className="nav-link">Añadir Venta</Link>
          </li>
        <li className="nav-item">
          <Link to={"/ventas"} className="nav-link">Lista de Ventas</Link>
          </li>
        <li className="nav-item">
          <Link to={"/audit"} className="nav-link">Auditoria</Link>
        </li>
      </div>
    </nav>
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<ProductoList />} />
        <Route path="/addPersona" element={<AddPersona />} />
        <Route path="/personas" element={<PersonaList />} />
        <Route path="/personas/:id" element={<Persona />} />
        <Route path="/addProducto" element={<AddProducto />} />
        <Route path="/productos" element={<ProductoList />} />
        <Route path="/productos/:id" element={<Producto />} />
        <Route path="/addTipoVenta" element={<AddTipoVenta />} />
        <Route path="/tipoVentas" element={<TipoVentaList />} />
        <Route path="/tipoVentas/:id" element={<TipoVenta />} />
        <Route path="/audit" element={<LogList />} />
        <Route path="/addVenta" element={<AddVenta />} />
        <Route path="/ventas" element={<VentaList />} />
        <Route path="/ventas/:id" element={<Venta />} />
      </Routes>
    </div>
  </div>
  );
}

export default App;
