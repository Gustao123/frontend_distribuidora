import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Portada from "../assets/portada.jpg";
import Proposito from "../components/inicio/Proposito";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  return (
    <Container>
      <br /><br /><br />
      <h1 className="text-center">¡Bienvenido, {nombreUsuario}!</h1>
      <Image width={"100%"} src={Portada} fluid rounded />
      <Proposito />
    </Container>
  );
};

export default Inicio;