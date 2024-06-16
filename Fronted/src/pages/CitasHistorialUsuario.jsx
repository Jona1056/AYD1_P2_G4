import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/navbar";
import "../styles/vista-1.css"

const VistaHistorialMedico = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/doctores')
    }

    // Ejemplo de datos de citas, puedes reemplazarlo con datos reales
    const citas = [
        {
            paciente: "Juan Pérez",
            doctor: "Doctor Goku",
            fecha: "2023-06-14",
            hora: "10:00 AM",
            motivo: "Dolor de cabeza",
            direccion: "Enrique Segoviano",
            estado: "atendido"
        },
        {
            paciente: "María García",
            doctor: "Doctor Mario",
            fecha: "2023-06-15",
            hora: "11:00 AM",
            motivo: "Se me subio la bilirrubina",
            direccion: "Roberto Gómez Bolaños",
            estado: "atendido"
        },
        {
            paciente: "Son Goku",
            doctor: "Doctor Chapatin",
            fecha: "2023-06-16",
            hora: "01:00 PM",
            motivo: "Mal de amores",
            direccion: "Me llaman Romeo",
            estado: "Cita cancelada"
        },

        // Agrega más citas según sea necesario
    ];

    return (
        <div>
            <Navbar1 />
            <Container className="mt-5">
                <h1 className="text-center-custom mb-4">Historial de Citas Programadas</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Doctor</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Direccion</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={index}>
                                <td>{cita.paciente}</td>
                                <td>{cita.doctor}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.motivo}</td>
                                <td>{cita.direccion}</td>
                                <td>{cita.estado}</td>
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