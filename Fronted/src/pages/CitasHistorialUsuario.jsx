import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/navbar";
import "../styles/vista-1.css"
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns"; // Importa la función format de date-fns
const VistaHistorialMedico = () => {
    const navigate = useNavigate();
    const [Citas, setCitas] = useState([]);
 
    const idUsuario = sessionStorage.getItem("id_usuario");

    const handleBack = () => {
        navigate('/doctores')
    }

    useEffect(() => {
        const fetchCitasHistorial = async () => {
          try {
            const response = await axios.get(
                `http://localhost:3000/api/citas/returncitashistorial/${idUsuario}`,
                { idUsuario }
              );
            setCitas(response.data);
            console.log("Datos del doctor:", response.data);
          } catch (error) {
            console.error("Error al obtener los datos del doctor:", error);
          }
        };
    
        fetchCitasHistorial();
    }, [idUsuario]);
    // Ejemplo de datos de citas, puedes reemplazarlo con datos reales
  

    return (
        <div>
            <Navbar1 />
            <Container className="mt-5">
                <h1 className="text-center-custom mb-4">Historial de Citas Programadas</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                           
                            <th>Doctor</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Direccion</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Citas.map((cita, index) => (
                            <tr key={index}>
                             
                                <td>{cita.nombre_medico} {cita.apellido_medico}</td>
                                <td>{format(cita.Fecha, "dd/MM/yyyy")}</td>
                                <td>{cita.Hora}</td>
                                <td>{cita.Motivo}</td>
                                <td>{cita.direccionClinica}</td>
                                <td>{cita.Estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-4">
                    <Button variant="dark" onClick={handleBack}>Regresar</Button>
                </div>
            </Container>
        </div>
    )
}

export default VistaHistorialMedico;