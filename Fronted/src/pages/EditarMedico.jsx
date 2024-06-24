import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

import axios from "axios";
import swal from "sweetalert";
import "../styles/vista-6.css"; // Importa el archivo CSS
import NavigationBar from "./Navbar";

const EditarPerfilMedico = () => {

    const [formData, setFormData] = useState({
        Nombre: "",
        Apellido: "",
        Genero: "",
        Correo: "",
        Contrasena: "",
        Especialidad: "",
        DireccionClinica: "",
        Foto: "",
        Rol: "",
        FechaNacimiento: ""
    })

    const id_usuario = sessionStorage.getItem('id_usuario');

    useEffect(() => {
        const fetchMedicoData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/usuarios/medico/${id_usuario}`);
                const medicoData = response.data[0];
                setFormData({
                    Nombre: medicoData.Nombre,
                    Apellido: medicoData.Apellido,
                    Genero: medicoData.Genero,
                    Correo: medicoData.Correo,
                    Contrasena: "",
                    Especialidad: medicoData.Especialidad,
                    DireccionClinica: medicoData.DireccionClinica,
                    Foto: medicoData.Foto,
                    Rol: medicoData.Rol,
                    FechaNacimiento: medicoData.FechaNacimiento
                });
            } catch(error) {
                console.error('Error fetching medico data: ', error);
            }
        };
        fetchMedicoData();
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
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                       
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
                                <Form.Group controlId="formEspecialidad">
                                    <Form.Label>Especialidad</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa tu especialidad"
                                        name="Especialidad"
                                        value={formData.Especialidad}
                                        onChange={handleInputChange}
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
                                        name="DireccionClinica"
                                        value={formData.DireccionClinica}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formFoto">
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Ingresa la url de tu foto"
                                        name="Foto"
                                        value={formData.Foto}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
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
                        <Button variant="primary" type="submit" className="mt-4">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default EditarPerfilMedico;
