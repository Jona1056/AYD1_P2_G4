import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      console.log('Respuesta del servidor:', response.data);
      if (response.status === 201){
        
        if (response.data.rol === 'Medico') {
          
          sessionStorage.setItem('id_usuario', response.data.id_usuario);
          navigate('/GestionCitas');
        } else {
          sessionStorage.setItem('id_usuario', response.data.id_usuario);
          navigate('/doctores');
        }
      }else{
        swal("Error", "Correo o Contraseña incorrectos", "error");
      }
    
    } catch (error) {
      swal("Error", "No se pudo iniciar sesión", "error");
    }
  };

  return (
    <div className="container-login2">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <h1>Medicare</h1>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Contraseña"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
          
              />
            </div>
            <button type="submit" className="button login__submit">
              <span className="button__text">Ingresar</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <br /><Link to="/register">Crea tu cuenta</Link>
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

export default Login;
