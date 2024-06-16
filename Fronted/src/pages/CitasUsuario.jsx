import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/navbar";
import "../styles/vista-5.css"

const VistaHistorialMedico = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/doctores')
    }

    // Ejemplo de datos de citas, puedes reemplazarlo con datos reales
    const citas = [
        {
            paciente: "Juan Pérez",
            fecha: "2023-06-14",
            hora: "10:00 AM",
            motivo: "Dolor de cabeza",
            direccion: "Enrique Segoviano"
        },
        {
            paciente: "María García",
            fecha: "2023-06-15",
            hora: "11:00 AM",
            motivo: "Se me subio la bilirrubina",
            direccion: "Roberto Gómez Bolaños"
        },
        {
            paciente: "Son Goku",
            fecha: "2023-06-16",
            hora: "01:00 PM",
            motivo: "Mal de amores",
            direccion: "Me llaman Romeo"
        },
        // Agrega más citas según sea necesario
    ];

    return (
        <div>
            <Navbar1 />
            <Container className="mt-5">
                <h1 className="text-center-custom mb-4">Citas programadas</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={index}>
                                <td>{cita.paciente}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.motivo}</td>
                                <td>{cita.direccion}</td>
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