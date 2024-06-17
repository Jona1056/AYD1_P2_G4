import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/navbar";
import "../styles/vista-5.css"
import axios from 'axios';
import { format } from 'date-fns'; // Importa la función format de date-fns
import { useState, useEffect } from 'react';
const VistaHistorialMedico = () => {
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const idUsuario = sessionStorage.getItem("id_usuario");
                console.log(idUsuario);
                const response = await axios.post('http://localhost:3000/api/citas/returnDates', { idUsuario });
                console.log(response.data);
                setCitas(response.data);
                console.log("Datos de las citas:", response.data);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
            }
        };

        fetchCitas();
    }, []);

    const handleBack = () => {
        navigate('/doctores');
    };

    return (
        <div>
            <Navbar1 />
            <Container className="mt-5">
                <h1 className="text-center-custom mb-4">Citas programadas</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={index}>
                                <td>{cita.nombre_medico} {cita.apellido_medico}</td>
                                <td>{format((cita.Fecha), 'dd/MM/yyyy')}</td> 
                                <td>{((cita.Hora))}</td> 
                                <td>{cita.Motivo}</td>
                                <td>{cita.direccionClinica}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-4">
                    <Button variant="dark" onClick={handleBack}>Regresar</Button>
                </div>
            </Container>
        </div>
    );
};

export default VistaHistorialMedico;