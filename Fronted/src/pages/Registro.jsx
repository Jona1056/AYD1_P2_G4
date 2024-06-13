import "../styles/Registro.css"; // Asegúrate de tener tus estilos CSS importados correctamente
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    email: "",
    contraseña: "",
    tipoUsuario: "",
    fechaNacimiento: "",
    foto: "",
    especialidad: "",
    direccion: "",
  });

  const validarContrasena = (contrasena) => {
    // Verificar que tenga al menos 8 caracteres
    if (contrasena.length < 8) {
      return false;
    }
    
    // Verificar que contenga al menos una mayúscula y un número
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer lo que quieras con los datos del formulario
    //verificar que no existan campos vacios
    const contrasena = formData.contraseña;
  
    // Validar la contraseña
    if (!validarContrasena(contrasena)) {
      // Mostrar un SweetAlert de error si la contraseña no cumple con los requisitos
      swal("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número", "error");
      return;
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
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                className="login__input"
                placeholder="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
              <select
                className="login__input"
                name="genero"
                value={formData.genero}
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <input
                type="password"
                className="login__input"
                placeholder="Contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
                required
              />

              <select
                className="login__input"
                onChange={handleInputChange}
                name="tipoUsuario"
                value={formData.tipoUsuario}
                required
              >
                <option value="">Selecciona un tipo de usuario</option>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
              </select>

              {formData.tipoUsuario === "paciente" && (
                <input
                  type="date"
                  className="login__input"
                  placeholder="Fecha Nacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.tipoUsuario === "paciente" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Foto"
                  name="foto"
                  value={formData.foto}
                  onChange={handleInputChange}
                />
              )}

              {formData.tipoUsuario === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.tipoUsuario === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Direccion Clinica"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              )}

              {formData.tipoUsuario === "medico" && (
                <input
                  type="text"
                  className="login__input"
                  placeholder="Foto"
                  name="foto"
                  value={formData.foto}
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
