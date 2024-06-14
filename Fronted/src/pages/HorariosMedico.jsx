import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../styles/vista-4.css'; // Importa el archivo CSS

const VistaHorariosMedico = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [day, setDay] = useState('Lunes');

    const handleBack = () => {
        navigate('/GestionCitas')
    }

    const handleEstablecer = () => {
        // Aquí puedes manejar la lógica para establecer un nuevo horario
        console.log('Horario establecido:', {
            day,
            startTime,
            endTime
        });
    };

    const handleActualizar = () => {
        // Aquí puedes manejar la lógica para actualizar un horario existente
        console.log('Horario actualizado:', {
            day,
            startTime,
            endTime
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="position-absolute top-0 end-0 m-3">
                <Button variant="dark" onClick={handleBack}>Regresar</Button>
            </div>
            <Card className="p-4 mb-4">
                <Card.Body>
                    <h1 className="text-center-custom mb-4">Horarios del Médico</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Día de la Semana</Form.Label>
                                <Form.Control as="select" className="select-day" value={day} onChange={e => setDay(e.target.value)}>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Hora de Inicio</Form.Label>
                                <input
                                    type="time"
                                    className="form-control input-time"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Hora de Fin</Form.Label>
                                <input
                                    type="time"
                                    className="form-control input-time"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col className="button-col">
                                <Button variant="primary" className="primary-button" onClick={handleEstablecer}>Establecer Horario</Button>
                                <Button variant="secondary" className="secondary-button" onClick={handleActualizar}>Actualizar Horario</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default VistaHorariosMedico;
