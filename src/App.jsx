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
import Catalogo from "./views/CatalogoProductos";
import Estadisticas from "./views/Estasdisticas";
import Dashboard from "./views/Dashboard";

const App = () => {
  return (
    
    <Router>
      <main className="margen-superior-main">
      <Encabezado/>
        <Routes>
      

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/empleado" element={<Empleados />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/estadistica" element={<Estadisticas />} />
        <Route path="/dashboard" element={<Dashboard />} />




        </Routes>
      </main>
    </Router>
  );
};

export default App;