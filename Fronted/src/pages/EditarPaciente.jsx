import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "../styles/vista-6.css"; // Importa el archivo CSS
import NavigationBar from "./Navbar";

const EditarPerfilPaciente = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Nombre: "",
        Apellido: "",
        Genero: "",
        Correo: "",
        Contrasena: "",
        Foto: "",
        Rol: "",
        FechaNacimiento: ""
    });

    const id_usuario = sessionStorage.getItem('id_usuario');

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/usuarios/paciente/${id_usuario}`);
                const medicoData = response.data[0];
                setFormData({
                    Nombre: medicoData.Nombre,
                    Apellido: medicoData.Apellido,
                    Genero: medicoData.Genero,
                    Correo: medicoData.Correo,
                    Contrasena: "",
                    Foto: medicoData.Foto,
                    Rol: medicoData.Rol,
                    FechaNacimiento: medicoData.FechaNacimiento
                });
            } catch(error) {
                console.error('Error fetching medico data: ', error);
            }
        };
        fetchPacienteData();
    }, [id_usuario]);

    const validarContrasena = (contrasena) => {
        if (contrasena.length < 8) return false;
        const tieneMayuscula = /[A-Z]/.test(contrasena);
        const tieneNumero = /[0-9]/.test(contrasena);
        return tieneMayuscula && tieneNumero;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.Contrasena && !validarContrasena(formData.Contrasena)) {
            swal("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número", "error");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/usuarios/update/${formData.Correo}`, formData)
            console.log('Respuesta del servidor: ', response.data);
            swal("Exito", "Perfil actualizado correctamente", "success");
            navigate('/');
        } catch(error) {
            swal("Error", "No se pudo actualizar el perfil", "error");
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div>
              <NavigationBar/>
       
     
        <Container className="mt-5">
         
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
                                        name="Nombre"
                                        value={formData.Nombre}
                                        onChange={handleInputChange}
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
                                        name="Apellido"
                                        value={formData.Apellido}
                                        onChange={handleInputChange}
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
                                        name="Genero"
                                        value={formData.Genero}
                                        onChange={handleInputChange}
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
                                        value={formData.Correo} // Ejemplo de correo, este valor debería ser dinámico
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
                                        name="Contrasena"
                                        value={formData.Contrasena}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formRol">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Ingresa tu rol"
                                        name="Rol"
                                        value={formData.Rol}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group controlId="formFechaNacimiento">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Ingresa tu fecha de nacimiento"
                                        name="FechaNacimiento"
                                        value={formData.FechaNacimiento}
                                        onChange={handleInputChange}
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
        </div>
    );
}

export default EditarPerfilPaciente;