import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/vista-5.css"
import NavigationBar from "./Navbar";
import  { useState, useEffect } from 'react';
import { format } from "date-fns"; // Importa la función format de date-fns
import axios from 'axios';
const VistaHistorialMedico = () => {
  
    const navigate = useNavigate();
    const [Citas, setCitas] = useState([]);
 
    const idUsuario = sessionStorage.getItem("id_usuario");
    const handleBack = () => {
        navigate('/GestionCitas')
    }
    useEffect(() => {
        const fetchCitasHistorial = async () => {
          try {
            const response = await axios.get(
                `http://localhost:3000/api/citas/returncitashistorialdoctor/${idUsuario}`,
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
   
        // Agrega más citas según sea necesario


    return(
        <div>
        <NavigationBar/>
        <Container className="mt-5">
             
            <h1 className="text-center-custom mb-4">Historial de Citas del Médico</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha de la Cita</th>
                        <th>Hora</th>
                        <th>Nombre del Paciente</th>
                        <th>Estado de la Cita</th>
                    </tr>
                </thead>
                <tbody>
                    {Citas.map((cita, index) => (
                        <tr key={index}>
                          <td>{format(cita.Fecha, "dd/MM/yyyy")}</td>
                            <td>{cita.Hora}</td>
                            <td>{cita.nombre_paciente} {cita.apellido_paciente}</td>
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