import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/vista-5.css"

const VistaHistorialMedico = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/GestionCitas')
    }

    // Ejemplo de datos de citas, puedes reemplazarlo con datos reales
    const citas = [
        {
            fecha: "2023-06-14",
            hora: "10:00 AM",
            paciente: "Juan Pérez",
            estado: "Atendido"
        },
        {
            fecha: "2023-06-15",
            hora: "11:00 AM",
            paciente: "María García",
            estado: "Cancelado por el paciente"
        },
        {
            fecha: "2023-06-16",
            hora: "01:00 PM",
            paciente: "Carlos Sánchez",
            estado: "Cancelado por el médico"
        },
        // Agrega más citas según sea necesario
    ];

    return(
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
                    {citas.map((cita, index) => (
                        <tr key={index}>
                            <td>{cita.fecha}</td>
                            <td>{cita.hora}</td>
                            <td>{cita.paciente}</td>
                            <td>{cita.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-4">
                <Button variant="dark" onClick={handleBack}>Regresar</Button>
            </div>
        </Container>
    )
}

export default VistaHistorialMedico;