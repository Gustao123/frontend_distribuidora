// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,

}) => {

  const validarletras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;

    // Permitir solo letras [A-Z, a-z]
    if (
        (charCode < 65 || charCode > 90) && // Letras mayúsculas
        (charCode < 97 || charCode > 122) && // Letras minúsculas
        charCode !== 46 && // Retroceso
        charCode !== 8 // Borrar
    ) {
        e.preventDefault(); // Evita que se escriba el carácter
    }
};

const validarnumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;

    // Permitir solo números [0-9]
    if (
        (charCode < 48 || charCode > 57) && // Números
        charCode !== 8 && // Retroceso
        charCode !== 46 // Borrar
    ) {
        e.preventDefault(); // Evita que se escriba el carácter
    }
};


const validarFormulario = () => {
    return (
        nuevoCliente.primer_nombre.trim() !== "" &&
        nuevoCliente.segundo_nombre.trim() !== "" &&
        nuevoCliente.apellido.trim() !== "" &&
        nuevoCliente.celular.trim() !== "" &&
        nuevoCliente.direccion.trim() !== "" &&
        nuevoCliente.cedula.trim() !== ""
    );
};



  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formprimernombreCliente">
            <Form.Label>primer_nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onKeyDown={validarletras}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formsegundonombreCliente">
            <Form.Label>segundo_nombre</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
                onKeyDown={validarletras}
              onChange={manejarCambioInput}
              placeholder="Ingresa la segundo nombre (máx. 100 caracteres)"
              maxLength={100}
            />

            </Form.Group>
          <Form.Group className="mb-3" controlId="formprimerapellidoCliente">
            <Form.Label>primer_apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
                onKeyDown={validarletras}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer apellido (máx. 100 caracteres)"
              maxLength={100}
            />

            </Form.Group>
          <Form.Group className="mb-3" controlId="formsegundoapellidoCliente">
            <Form.Label>segundo_apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
                onKeyDown={validarletras}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo apellido (máx. 100 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formcelularCliente">
            <Form.Label>celular</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 50 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formdireccionCliente">
            <Form.Label>direccion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer direccion (máx. 100 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formcedulaCliente">
            <Form.Label>cedula</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer cedula (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>


        
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCliente} disabled={!validarFormulario()}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;