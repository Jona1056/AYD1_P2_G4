import { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

import '../styles/vista-4.css'; // Importa el archivo CSS
import swal from 'sweetalert';
import axios from "axios"
import NavigationBar from "./Navbar";
const VistaHorariosMedico = () => {

    const [horaInicio, sethoraInicio] = useState('');
    const [horaFin, sethoraFin] = useState('');
    const [dia, setdia] = useState('Lunes');
    const medicoId = sessionStorage.getItem("id_usuario");
  

    const handleEstablecer = async () => {
        // Aquí puedes manejar la lógica para establecer un nuevo horario
        console.log('Horario establecido:', {
            dia,
            horaInicio,
            horaFin
        });
        try {
            const response = await axios.post('http://localhost:3000/api/horarios/add', { medicoId, horaInicio, horaFin, dia });
            swal("Exito", "Horario agregado correctamente", "success");
            console.log('Respuesta del servidor:', response.data);
          } catch (error) {
            swal("Error", "No se pudo agregar el horario", "error");
            console.error("Error al obtener los datos del doctor:", error);
          }
    };

    const handleActualizar = () => {
        // Aquí puedes manejar la lógica para actualizar un horario existente
        console.log('Horario actualizado:', {
            dia,
            horaInicio,
            horaFin
        });
    };

    return (
        <div>
             <NavigationBar/>
       
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="position-absolute top-0 end-0 m-3">
                
            </div>
            <Card className="p-4 mb-4">
                <Card.Body>
                    <h1 className="text-center-custom mb-4">Horarios del Médico</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Día de la Semana</Form.Label>
                                <Form.Control as="select" className="select-dia" value={dia} onChange={e => setdia(e.target.value)}>
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
                                    value={horaInicio}
                                    onChange={e => sethoraInicio(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Hora de Fin</Form.Label>
                                <input
                                    type="time"
                                    className="form-control input-time"
                                    value={horaFin}
                                    onChange={e => sethoraFin(e.target.value)}
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
        </div>
    );
};

export default VistaHorariosMedico;
