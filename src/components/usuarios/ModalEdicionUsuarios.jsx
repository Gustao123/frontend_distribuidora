import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionUsuarios = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  usuarioEditado,
  manejarCambioInputEdicion,
  actualizarUsuario,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="Usuario"
              value={usuarioEditado?.usuario || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContraseña">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="contraseña"
              value={usuarioEditado?.contraseña || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarUsuario}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionUsuarios;

