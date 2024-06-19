import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import "../styles/vista-6.css"; // Importa el archivo CSS

const EditarPerfilMedico = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/GestionCitas')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
    };

    return (
        <Container className="mt-5">
            <Button variant="dark" className="btn-regresar" onClick={handleBack}>Regresar</Button>
            <h1 className="text-center mb-4">Editar Perfil Médico</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa tu nombre" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa tu apellido" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formGenero">
                                    <Form.Label>Género</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        required
                                    >
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        value="medico@example.com" // Ejemplo de correo, este valor debería ser dinámico
                                        readOnly 
                                        disabled 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Ingresa una contraseña" 
                                        pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$" 
                                        title="La contraseña debe tener al menos 8 caracteres, una mayúscula y un número" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEspecialidad">
                                    <Form.Label>Especialidad</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa tu especialidad" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formDireccionClinica">
                                    <Form.Label>Dirección Clínica</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa la dirección de tu clínica" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formFoto">
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="mt-4">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarPerfilMedico;
