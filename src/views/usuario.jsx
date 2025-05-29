// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuarios/Tablausuario'; // Importa el componente de tabla
import { Container, Button, Row, Col } from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';
import ModalRegistroUsuarios from '../components/usuarios/ModalRegistroUsuarios';
import ModalEliminacionUsuarios from '../components/usuarios/ModalEliminacionUsuario';
import ModalEdicionUsuarios from '../components/usuarios/ModalEdicionUsuarios';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Declaración del componente Categorias
const Usuarios = () => {
  // Estados para manejar los datos, carga y errores
  const [ListaUsuario, setListaUsuario] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '',
    contraseña: ''
 });        
    const [usuarioFiltradas,  setUsuariosFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    
      const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5; // Número de elementos por página
    

    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    
    const [usuarioEditada, setUsuarioEditado] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    


    const obtenerUsuarios = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://localhost:3001/api/usuarios');
        if (!respuesta.ok) {
          throw new Error('Error al cargar las usuarios');
        }
        const datos = await respuesta.json();
        setListaUsuario(datos);    // Actualiza el estado con los datos
        setUsuariosFiltradas(datos);
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };

    
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  // Maneja los cambios en los inputs del modal
const manejarCambioInput = (e) => {
  const { name, value } = e.target;
  setNuevoUsuario(prev => ({
    ...prev,
    [name]: value
  }));
};


 // Manejo la inserción de una nueva categoría
  const agregarUsuario = async () => {
  if (!nuevoUsuario.usuario || !nuevoUsuario.contraseña) {
  setErrorCarga("Por favor, completa todos los campos antes de guardar.");
  return;
  }

  try {
    const respuesta = await fetch('http://localhost:3001/api/registrarusuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar el usuario');
    }

    await obtenerUsuarios(); // Refresca toda la lista desde el servidor
    setNuevoUsuario({ usuario: '', contraseña: '' });
    setMostrarModal(false);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};



const eliminarUsuario = async () => {
  if (!usuarioAEliminar) return;

  try {
    const respuesta = await fetch(`http://localhost:3001/api/eliminarusuarios/${usuarioAEliminar.id_usuario}`, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    await obtenerUsuarios(); // Refresca la lista
    setMostrarModalEliminacion(false);
    establecerPaginaActual(1); // Regresa a la primera página
    setUsuarioAEliminar(null);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


const abrirModalEliminacion = (usuario) => {
  setUsuarioAEliminar(usuario);
  setMostrarModalEliminacion(true);
};



const manejarCambioInputEdicion = (e) => {
  const { name, value } = e.target;
  setCategoriaEditada(prev => ({
    ...prev,
    [name]: value
  }));
};


const actualizarUsuario = async () => {
  if (!usuarioEditada?.usuario || !usuarioEditada?.contraseña) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:3001/api/actualizarusuarios/${usuarioEditada.id_usuario}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: usuarioEditada.usuario,
        contraseña: usuarioEditada.contraseña,
      }),
    });

    if (!respuesta.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    await obtenerUsuarios();
    setMostrarModalEdicion(false);
    setUsuarioEditado(null);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


const abrirModalEdicion = (usuario) => {
  setUsuarioEditado(usuario);
  setMostrarModalEdicion(true);
};



  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtradas = ListaUsuario.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contraseña.toLowerCase().includes(texto)
    );
    setUsuariosFiltradas(filtradas);
  };



  
  
  // Calcular elementos paginados
  const usuarioPaginadas = usuarioFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  
  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Usuarios</h4>


        <Row>
        <Col lg={2} md={4} sm={4} xs={5}> 
            <Button variant="primary" onClick={() => setMostrarModal(true)}  style={{ width: "100%"}} >
            Nuevo Usuario
          </Button>
          </Col>
          <Col lg={6} md={8} sm={8} xs={7}> 
              <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
          </Col>
        </Row>

        {/* Pasa los estados como props al componente TablaCategorias */}
        <TablaUsuarios
          usuarios={usuarioPaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={ListaUsuario.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición 
        />


        <ModalRegistroUsuarios
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
          errorCarga={errorCarga}
        />


        <ModalEliminacionUsuarios
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarUsuario={eliminarUsuario}
        />


        <ModalEdicionUsuarios
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          usuarioEditado={usuarioEditada}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarUsuario={actualizarUsuario}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Usuarios;