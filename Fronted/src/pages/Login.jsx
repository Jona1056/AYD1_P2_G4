
import '../styles/login.css'; // Asegúrate de tener tus estilos CSS importados correctamente
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="container-login">
      <div className="screen">
        
        <div className="screen__content">
            
          <form className="login">
          <h1>Medicare</h1>
            <div className="login__field">
          
          
           
      
              <i className="login__icon fas fa-user"></i>
              
              <input type="text" className="login__input" placeholder="Email" />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Contraseña" />
            </div>
            <button className="button login__submit">
              <span className="button__text">Ingresar</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
          <Link to="/register">Crea tu cuenta</Link>
           
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
