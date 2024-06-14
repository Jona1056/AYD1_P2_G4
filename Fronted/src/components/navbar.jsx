import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">PeliFlix</div>
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-item" onClick={() => navigateTo("/catalogo")}>
          Catalogo
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/AlquilerUsuario")}>
          Alquileres
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/historial")}>
          Historial
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/perfil")}>
          Editar Perfil
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/login")}>
          Cerrar Sesion
        </div>

      </div>
      <div className="navbar-burger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar1;