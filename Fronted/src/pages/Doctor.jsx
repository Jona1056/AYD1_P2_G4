
import '../styles/Doctores.css'; // Asumiendo que tienes un archivo CSS para los estilos
// Asegúrate de incluir la librería Font Awesome en tu proyecto para los iconos, si aún no lo has hecho.

const Doctores = () => {
  return (
    <div className='Doctores-div'>
    <div id="login-container">
      <div className="profile-img"></div>
      <h1 className="doctor">Juan Pedro Galvez</h1>
      <button className='info-doctor'>Informacion</button>
      <footer>
        <div className="likes">
          <p><i className='fa fa-heart'></i></p>
          <p>Especialidad</p>
        </div>
        <div className="projects">
          <p>Direccion Clnica</p>
         
        </div>
      </footer>
    </div>
    
    </div>
  );
}

export default Doctores;
