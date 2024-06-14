import NavigationBar from "./Navbar";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/vista-1.css";

const VistaMedico = () => {
    const navigate = useNavigate();

    const handleCitas = () => {
        navigate('/Citas')
    }

    return (
        <div>
            <NavigationBar/>
            <div className="catalogo-citas">
                <Card className="shadow-sm mb-3 cita-card">
                    <Card.Header className="bg-white border-0">
                        <div className="cita__usuario d-flex align-items-center">
                            <img src="./src/assets/paciente.png" alt="imagen de usuario"/>
                            <span>Nombre de Usuario</span>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-2">
                        <Card.Title className="font-weight-bold mb-0">Titulo de la Cita</Card.Title>
                        <Card.Text className="text-muted small">
                            Fecha de la cita: AAAA/MM/DD
                            <br/>
                        </Card.Text>
                        <Button variant="dark" size="sm" onClick={handleCitas}>Detalle de la Cita</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default VistaMedico;