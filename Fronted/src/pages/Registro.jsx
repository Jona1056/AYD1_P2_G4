import "../styles/Registro.css"; // Asegúrate de tener tus estilos CSS importados correctamente
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Genero: "",
    Correo: "",
    Contrasena: "",
    Rol: "",
    FechaNacimiento: "",
    Foto: "",
    Especialidad: "",
    DireccionClinica: "",
  });

  const validarContrasena = (contrasena) => {
    // Verificar que tenga al menos 8 caracteres
    if (contrasena.length < 8) {return false;}
    

    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);
    
    return tieneMayuscula && tieneNumero;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes hacer lo que quieras con los datos del formulario
    //verificar que no existan campos vacios
    const contrasena = formData.Contrasena;
  
    // Validar la contraseña
    if (!validarContrasena(contrasena)) {
      // Mostrar un SweetAlert de error si la contraseña no cumple con los requisitos
      swal("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número", "error");
      return;
    }
    if (formData.Rol === "medico"){
      formData.FechaNacimiento = null;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/usuarios/add`, formData);
      console.log('Respuesta del servidor:', response.data);
      navigate("/");
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito al usuario
    } catch (error) {
      swal("Error", "No se pudo crear el usuario", "error");
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
    console.log(formData);
  };
  return (
    <div className="container-registro">
      <div className="screen-registro">
        <div className="screen__content">
          <form className="Registro" onSubmit={handleSubmit}>
            <div className="titulo">  <h1>Medicare</h1></div>
          
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>

              <input
                type="text"
                className="login__input"
                placeholder="Nombre"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                className="login__input"
                placeholder="Apellido"
                name="Apellido"
                value={formData.Apellido}
                onChange={handleInputChange}
                required
              />
              <select
                className="login__input"
                name="Genero"
                value={formData.Genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>

              <input
                type="email"
                className="login__input"
                placeholder="Email"
                name="Correo"
                value={formData.Correo}
                onChange={handleInputChange}
                required
              />

              <input
                type="password"
                className="login__input"
                placeholder="Contraseña"
                name="Contrasena"
                value={formData.Contrasena}
                onChange={handleInputChange}
                required
              />

              <select
                className="login__input"
                onChange={handleInputChange}
                name="Rol"
                value={formData.Rol}
                required
              >
                <option value="">Selecciona un tipo de usuario</option>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
              </select>

              {formData.Rol === "paciente" && (
                <input
                  type="date"
                  className="login__input"
                  placeholder="Fecha Nacimiento"
                  name="FechaNacimiento"
                  value={formData.FechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.Rol === "paciente" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Foto"
                  name="Foto"
                  value={formData.Foto}
                  onChange={handleInputChange}
                />
              )}

              {formData.Rol === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Especialidad"
                  name="Especialidad"
                  value={formData.Especialidad}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.Rol === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Direccion Clinica"
                  name="DireccionClinica"
                  value={formData.DireccionClinica}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.Rol === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Foto"
                  name="Foto"
                  value={formData.Foto}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>

            <button type="submit" className="button login__submit">
              <span className="button__text">Crear</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <Link to="/">Inicia Sesion</Link>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
