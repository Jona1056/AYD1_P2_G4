import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Doctores.css";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/navbar";

const Doctores = () => {
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    console.log(id_doctor);
    navigate("/Horario", { state: { id_doctor } });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar doctores por especialidad
  const filteredDoctores = doctores.filter((doctor) =>
    doctor.Especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar1 />
      <div className="search">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="especialidad"
            type="search"
            className="inputsearch"
            value={searchTerm}
            onChange={handleSearchChange}
          ></input>
        </div>
      </div>
      <div className="Doctores-div">
        {filteredDoctores.length > 0 ? (
          filteredDoctores.map((doctor) => (
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
              <button className="info-doctor" onClick={GoHorarios(doctor.ID)}>
                Horarios
              </button>
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
          <p>No se encontraron doctores con esa especialidad.</p>
        )}
      </div>
    </div>
  );
};

export default Doctores;
