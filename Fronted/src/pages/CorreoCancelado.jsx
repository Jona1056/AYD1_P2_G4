import React, { useState } from "react";
import NavigationBar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import "../styles/vista-3.css"

const VistaEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pacienteEmail, medicoEmail, fechaCita, horaCita } = location.state;
    const [motivoCancelacion, setMotivoCancelacion] = useState("");

    const handleChangeMotivo = (e) => {
        setMotivoCancelacion(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías implementar lógica para enviar el correo o hacer lo necesario con el motivo de cancelación
        console.log("Motivo de cancelación:", motivoCancelacion);
    }

    const handleBack = () => {
        navigate('/Citas')
    }

    return (
        <>
            <NavigationBar />
            <div className="container-custom">
                <h1>Correo Electrónico para Paciente</h1>
                <Card className="email-card">
                    <Card.Body>
                        <div className="email-header">
                            <p><strong>Para:</strong> {pacienteEmail}</p>
                            <p><strong>De:</strong> {medicoEmail}</p>
                        </div>
                        <Card.Title className="mb-4">Cita Cancelada</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formMotivo">
                                <Form.Label>Motivo de cancelación</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={motivoCancelacion}
                                    onChange={handleChangeMotivo}
                                    required
                                />
                            </Form.Group>
                            <p>Fecha de la cita: {fechaCita}</p>
                            <p>Hora de la cita: {horaCita}</p>
                            <div className="button-container text-right">
                                <Button type="submit">Responder</Button>
                            </div>
                        </Form>
                        <div className="button-container text-left mt-3">
                            <Button variant="secondary" onClick={handleBack}>Regresar</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default VistaEmail;
