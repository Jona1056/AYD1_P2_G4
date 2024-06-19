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
      <div className="navbar-brand">Medicare</div>
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-item" onClick={() => navigateTo("/doctores")}>
          Doctores
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/CitasUsuario")}>
          Citas
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/CitasHistorialUsuario")}>
          Historial Citas
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/PerfilUsuario")}>
          Perfil
        </div>
     
        <div className="navbar-item" onClick={() => navigateTo("/")}>
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