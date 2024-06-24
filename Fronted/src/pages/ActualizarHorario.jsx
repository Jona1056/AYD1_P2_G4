import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Container } from "react-bootstrap";
import Navbar1 from "../components/navbar";
import "../styles/vista-1.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ActualizarHorario = () => {
    const navigate = useNavigate();
    const [Horarios, setHorarios] = useState([]);
    const medicoId = sessionStorage.getItem("id_usuario");
    const [dia, setdia] = useState('Lunes');
    const [horaInicio, sethoraInicio] = useState('');
    const [horaFin, sethoraFin] = useState('');

    const handleBack = () => {
        navigate('/horarios');
    };

    useEffect(() => {
        const fetchHorario = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/horarios/${medicoId}`);
                console.log('Respuesta del servidor:', response.data);
                setHorarios(response.data);
            } catch (error) {
                console.error("Error al obtener los datos del doctor:", error);
            }
        };
        fetchHorario();
    }, [medicoId]);

    const handleActualizar = (index) => {
        Swal.fire({
            title: "¿Desea actualizar el horario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
        }).then((result) => {
            if (result.isConfirmed) {
                const horario = Horarios[index];
                actualizar(medicoId, horario.DiaSemana, horario.HoraInicio, horario.HoraFin, dia, horaInicio, horaFin);
            }
        });
    };

    const actualizar = async (medicoId, dia, HoraInicio, horaFin, diaN, horaInicioN, horaFinN) => {
        console.log('Horario establecido:', { medicoId, dia, HoraInicio, horaFin, diaN, horaInicioN, horaFinN });
        const formData = {
            medicoID: medicoId,
            DiaSemana: dia,
            HoraInicio: HoraInicio,
            HoraFin: horaFin,
            diaN: diaN,
            horaInicioN: horaInicioN,
            horaFinN: horaFinN
        };
        console.log("Datos: ", formData);
        try {
            const response = await axios.put(`http://localhost:3000/api/horarios/update/${medicoId}`, formData);
            Swal.fire("Éxito", "Horario actualizado correctamente", "success");
            console.log('Respuesta del servidor:', response.data);
            // Actualiza la lista de horarios
            // const nuevosHorarios = [...Horarios];
            // nuevosHorarios[index] = { ...nuevosHorarios[index], dia: diaN, HoraInicio: horaInicioN, HoraFin: horaFinN };
            // setHorarios(nuevosHorarios);
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el horario", "error");
            console.error("Error al actualizar el horario:", error);
        }
    };

    return (
        <div>
            <Navbar1 />
            <Container className="mt-5">
                <h1 className="text-center-custom mb-4">Horario de Citas</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Día</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Nuevo Día</th>
                            <th>Nuevo Inicio</th>
                            <th>Nuevo Fin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Horarios.map((horario, index) => (
                            <tr key={index}>
                                <td>{horario.DiaSemana}</td>
                                <td>{horario.HoraInicio}</td>
                                <td>{horario.HoraFin}</td>
                                <td>
                                    <Form.Control as="select" className="select-dia" value={index.dia} onChange={e => setdia(e.target.value)}>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miércoles">Miércoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sábado">Sábado</option>
                                    </Form.Control>
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        className="form-control input-time"
                                        value={index.horaInicio}
                                        onChange={e => sethoraInicio(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        className="form-control input-time"
                                        value={index.horaFin}
                                        onChange={e => sethoraFin(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Button variant="primary" className="primary-button" onClick={() => handleActualizar(index)}>Actualizar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-4">
                    <Button variant="dark" onClick={handleBack}>Regresar</Button>
                </div>
            </Container>
        </div>
    );
};

export default ActualizarHorario;
