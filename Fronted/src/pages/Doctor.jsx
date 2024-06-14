import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Doctores.css"; // Asegúrate de tener este archivo CSS
import { useNavigate } from "react-router-dom";
const Doctores = () => {
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const id_usuario = sessionStorage.getItem("id_usuario");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/usuarios/doctoresSinCita/${id_usuario}`
        );
        setDoctores(response.data);
        console.log("Datos del doctor:", response.data);
      } catch (error) {
        console.error("Error al obtener los datos del doctor:", error);
      }
    };

    fetchDoctorData();
  }, [id_usuario]);

  const GoHorarios = (id_doctor) => () => {
    console.log(id_doctor)
    navigate("/Horario", { state: { id_doctor} });
  };

  return (
    <div className="Doctores-div">
      {doctores.length > 0 ? (
        doctores.map((doctor) => (
          <div key={doctor.ID} id="login-container">
            <div
              className="profile-img"
              style={{
                backgroundImage: `url(${
                  doctor.Foto ||
                  "https://images.unsplash.com/photo-1504933350103-e840ede978d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
                })`,
              }}
            ></div>

            <h1 className="doctor">{`${doctor.Nombre} ${doctor.Apellido}`}</h1>
            <button className="info-doctor" onClick={GoHorarios(doctor.ID)}>Horarios</button>
            <footer>
              <div className="likes">
                <p>
                  <i className="fa fa-heart"></i>
                </p>
                <p>{doctor.Especialidad}</p>
              </div>
              <div className="projects">
                <p>{doctor.DireccionClinica}</p>
              </div>
            </footer>
          </div>
        ))
      ) : (
        <p>Cargando datos de los doctores...</p>
      )}
    </div>
  );
};

export default Doctores;
