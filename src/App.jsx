import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/clientes"; 
import Productos from "./views/productos";
import Categorias from "./views/categorias";
import Ventas from "./views/ventas";
import Usuarios from "./views/usuario";
import Empleados from "./views/Empleados";
import Compras from "./views/Compras";
import CatalogoProductos from "./views/CatalogoProductos";
import Estadisticas from "./views/Estasdisticas";
import Dashboard from "./views/Dashboard";
import RutasProtegidas from "./components/rutas/RutaProtegida";
import PiePagina from "./components/infopie/PiePagina";


const App = () => {
return (
  <Router>
    <div className="app-wrapper">
      <Encabezado />
      <main className="margin-superior-main content">
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<RutasProtegidas vista={<Inicio />} />} />
          <Route path="/categorias" element={<RutasProtegidas vista={<Categorias />} />} />
          <Route path="/clientes" element={<RutasProtegidas vista={<Clientes />} />} />
          <Route path="/usuarios" element={<RutasProtegidas vista={<Usuarios />} />} />
          <Route path="/ventas" element={<RutasProtegidas vista={<Ventas />} />} />
          <Route path="/empleados" element={<RutasProtegidas vista={<Empleados />} />} />
          <Route path="/compras" element={<RutasProtegidas vista={<Compras />} />} />
          <Route path="/productos" element={<RutasProtegidas vista={<Productos />} />} />
          <Route path="/catalogo" element={<RutasProtegidas vista={<CatalogoProductos />} />} />
          <Route path="/estadisticas" element={<RutasProtegidas vista={<Estadisticas />} />} />
          <Route path="/dashboard" element={<RutasProtegidas vista={<Dashboard />} />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  </Router>
);
 }
export default App;