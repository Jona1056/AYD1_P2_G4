import  { useState, useEffect } from 'react';
import NavigationBar from "./Navbar";
import { Card, Button } from "react-bootstrap";

import axios from 'axios';
import "../styles/vista-1.css";
import swal from 'sweetalert';
import { format } from 'date-fns'; // Importa la función format de date-fns
const VistaMedico = () => {
   
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                // Realizar la solicitud para obtener las citas del médico
                const response = await axios.post('http://localhost:3000/api/citas/returndatesdoctor', { idUsuario: sessionStorage.getItem("id_usuario") });
                // Establecer las citas en el estado
                console.log(response.data)
                setCitas(response.data);
            } catch (error) {
                console.error("Error al obtener las citas del médico:", error);
            }
        };

        fetchCitas();
    }, []);


    const handleAtender = async (idCita) => {
        // Aquí podrías agregar lógica adicional para marcar la cita como atendida en una aplicación real
        try {
            const idUsuario = sessionStorage.getItem("id_usuario");
            console.log(idUsuario);
            const estado = "Atendida"
            const response = await axios.put('http://localhost:3000/api/citas/updateState', { idCita, estado});
            console.log(response.data);
            swal({
                title: '¡Listo!',
                text: 'La cita ha sido atendida',
                icon: 'success',
                buttons: {
                    confirm: 'OK',
                },
            }).then((result) => {

               
                if (result) {
                    // Recargar la página
                    window.location.reload();
                }
            });
            console.log("Datos de las citas:", response.data);
        } catch (error) {
            console.error("Error al atender cita:", error);
        }
    }
    // const handleCancelar = () => {
    //     // Mostrar ventana emergente de confirmación
    // }

    return (
        <div>
            <NavigationBar/>
            <div className="catalogo-citas">
                {/* Mapear sobre las citas y mostrar cada una como un Card */}
                {citas.map((cita, index) => (
                    <Card key={index} className="shadow-sm mb-3 cita-card">
                        <Card.Header className="bg-white border-0">
                            <div className="cita__usuario d-flex align-items-center">
                                <img src="./src/assets/paciente.png" alt="imagen de usuario"/>
                              
                                <span>Paciente: {cita.nombre_paciente} {cita.apellido_paciente}</span>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-2">
                            <Card.Title className="font-weight-bold mb-0">{cita.titulo}</Card.Title>
                            <Card.Text className="text-muted small">
                                Fecha de la cita:            <td>{format((cita.Fecha), 'dd/MM/yyyy')}</td> 
                              
                                Hora de la cita:            <td>{cita.Hora}</td> 
                                Motivo:                <td>{cita.Motivo}</td>
                                <br/>
                            </Card.Text>
                            <Button variant="success" className="mr-2"   onClick={() => handleAtender(cita.ID)}>Atender</Button>
                            <br/>
                            {/* <Button variant="danger" onClick={handleCancelar}>Cancelar</Button> */}
                        
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default VistaMedico;
