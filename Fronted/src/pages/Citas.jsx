import React, { useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/vista-2.css"; // Importar el archivo de estilos CSS
import NavigationBar from "./Navbar";

const VistaCitas = () => {
    const navigate = useNavigate();
    const [citaTexto, setCitaTexto] = useState("Descripción de la cita del usuario...");
    const [alertVariant, setAlertVariant] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleAtender = () => {
        setAlertVariant("success");
        setAlertMessage("¡Cita atendida!");
        setShowAlert(true);
        // Aquí podrías agregar lógica adicional para marcar la cita como atendida en una aplicación real
    }

    const handleCancelar = () => {
        // Mostrar ventana emergente de confirmación
        if (window.confirm("¿Está seguro que desea cancelar la cita?")) {
            setAlertVariant("danger");
            setAlertMessage("¡Cita cancelada!");
            setShowAlert(true);
            // Aquí podrías agregar lógica adicional para cancelar la cita en una aplicación real
            navigate('/Email', {
                state: {
                    pacienteEmail: "usuario@example.com",
                    medicoEmail: "medico@example.com",
                    fechaCita: "2024-06-13",
                    horaCita: "15:00",
                }
            });
        }
    }

    const handleBack = () => {
        navigate('/GestionCitas')
    }

    const handleDismiss = () => {
        setShowAlert(false);
        setAlertVariant(null);
        setAlertMessage("");
    }

    return (
        <>
            <NavigationBar/>
            <div className="container">
                {showAlert && (
                    <Alert variant={alertVariant} onClose={handleDismiss} dismissible>
                        <Alert.Heading>{alertMessage}</Alert.Heading>
                    </Alert>
                )}
                <h1 className="text-center">Detalles de la Cita</h1>
                <div className="user-info text-center">
                    <Row className="mb-3 justify-content-center align-items-center">
                        <Col xs={12} md={2} className="mb-3 mb-md-0">
                            <img src="./src/assets/paciente.png" alt="Imagen de usuario" className="user-avatar" />
                        </Col>
                    </Row>
                    <Row className="mb-3 justify-content-center">
                        <Col xs={12} md={12}>
                            <h5>Nombre de Usuario</h5>
                        </Col>
                    </Row>
                </div>
                <div className="text-area-container">
                    <textarea
                        className="form-control mb-3"
                        rows="5"
                        readOnly
                        value={citaTexto}
                    />
                </div>
                <div className="button-container text-right">
                    <Button variant="success" className="mr-2" onClick={handleAtender}>Atender</Button>
                    <Button variant="danger" onClick={handleCancelar}>Cancelar</Button>
                    <Button variant="dark" onClick={handleBack}>Regresar</Button>
                </div>
            </div>
        </>
    );
}

export default VistaCitas;
