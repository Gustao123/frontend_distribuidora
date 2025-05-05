// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/Tablacliente'; // Importa el componente de tabla
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroCliente from '../components/clientes/ModalRegistroClientes';
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';
import ModalEdicionClientes from '../components/clientes/ModalEdicionClientes';
import ModalEliminacionClientes from '../components/clientes/ModalEliminacionClientes';

// Declaración del componente Categorias
const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [ListaCliente, setListaCliente] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición
const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '',      
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });

  const [clienteFiltradas, setClientesFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");


  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  
  const [clienteEditado, setClienteEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  


  const obtenerClientes = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las clientes');
      }
      const datos = await respuesta.json();
      setListaCliente(datos);    // Actualiza el estado con los datos
      setClientesFiltradas(datos);
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerClientes();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  // Maneja los cambios en los inputs del modal
const manejarCambioInput = (e) => {
  const { name, value } = e.target;
  setNuevoCliente(prev => ({
    ...prev,
    [name]: value
  }));
};


 // Manejo la inserción de una nueva categoría
 const agregarCliente = async () => {
  if (!nuevoCliente.primer_nombre || !nuevoCliente.segundo_nombre || !nuevoCliente.primer_apellido ||
    !nuevoCliente.segundo_apellido ||!nuevoCliente.celular || !nuevoCliente.direccion ||!nuevoCliente.cedula
  ) {
  setErrorCarga("Por favor, completa todos los campos antes de guardar.");
  return;
  }

  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarclientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente),
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar la cliente');
    }

    await obtenerClientes(); // Refresca toda la lista desde el servidor
    setNuevoCliente({  primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', celular: '', direccion: '', cedula: '' });
    setMostrarModal(false);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};



const eliminarClientes = async () => {
  if (!clienteAEliminar) return;

  try {
    const respuesta = await fetch(`http://localhost:3000/api/eliminarclientes/${clienteAEliminar.id_cliente}`, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error('Error al eliminar la cliente');
    }

    await obtenerClientes(); // Refresca la lista
    setMostrarModalEliminacion(false);
    establecerPaginaActual(1); // Regresa a la primera página
    setClienteAEliminar(null);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


const abrirModalEliminacion = (cliente) => {
  setClienteAEliminar(cliente);
  setMostrarModalEliminacion(true);
};




const manejarCambioInputEdicion = (e) => {
  const { name, value } = e.target;
  setClienteEditado(prev => ({
    ...prev,
    [name]: value
  }));
};


const actualizarClientes = async () => {
  if (!clienteEditado?.primer_nombre || !clienteEditado?.segundo_nombre || !clienteEditado?.primer_apellido
    || !clienteEditado?.segundo_apellido || !clienteEditado?.celular || !clienteEditado?.direccion || !clienteEditado?.cedula
  ) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:3000/api/actualizarclientes/${clienteEditado.id_cliente}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        primer_nombre: clienteEditado.primer_nombre,
        segundo_nombre: clienteEditado.segundo_nombre,
        primer_apellido: clienteEditado.primer_apellido,
        segundo_apellido: clienteEditado.segundo_apellido,
        celular: clienteEditado.celular,
        direccion: clienteEditado.direccion,
        cedula: clienteEditado.cedula,

      }),
    });

    if (!respuesta.ok) {
      throw new Error('Error al actualizar la categoría');
    }

    await obtenerClientes();
    setMostrarModalEdicion(false);
    setClienteEditado(null);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


const abrirModalEdicion = (cliente) => {
  setClienteEditado(cliente);
  setMostrarModalEdicion(true);
};





const manejarCambioBusqueda = (e) => {
  const texto = e.target.value.toLowerCase();
  setTextoBusqueda(texto);
  establecerPaginaActual(1);
  
  const filtradas = ListaCliente.filter(
    (clientes) =>
      clientes.primer_nombre.toLowerCase().includes(texto) ||
      clientes.segundo_nombre.toLowerCase().includes(texto) ||
      clientes.primer_apellido.toLowerCase().includes(texto) ||
      clientes.segundo_apellido.toLowerCase().includes(texto) ||
      clientes.celular.toLowerCase().includes(Number) ||
      clientes.direccion.toLowerCase().includes(texto) ||
      clientes.cedula.toLowerCase().includes(texto)
      
  );
  setClientesFiltradas(filtradas);
};


      // Calcular elementos paginados
      const ClientePaginadas = clienteFiltradas.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      );
      

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Clientes</h4>


        <Row>
          <Col lg={2} md={4} sm={4} xs={5}> 
          <Button variant="primary" onClick={() => setMostrarModal(true)}  style={{ width: "100%"}} >
          Nueva Cliente
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
        <TablaClientes
          clientes={ClientePaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={ListaCliente.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalEdicion={abrirModalEdicion}
        />


         <ModalRegistroCliente
                  mostrarModal={mostrarModal}
                  setMostrarModal={setMostrarModal}
                  nuevoCliente={nuevoCliente}
                  manejarCambioInput={manejarCambioInput}
                  agregarCliente={agregarCliente}
                  errorCarga={errorCarga}

                />

        <ModalEliminacionClientes
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarClientes={eliminarClientes}
        />

        <ModalEdicionClientes
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          clienteEditado={clienteEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarClientes={actualizarClientes}
          errorCarga={errorCarga}
        />

      </Container>
    </>
  );
};

// Exportación del componente
export default Clientes;