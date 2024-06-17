import '../styles/Calendar.css';
import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import {  useNavigate } from 'react-router-dom';
const diasEnMes = (mes) => {
  return new Date(2024, mes + 1, 0).getDate();
};

const obtenerNombreDia = (año, mes, dia) => {
  const fecha = new Date(año, mes, dia);
  return fecha.toLocaleDateString('es-ES', { weekday: 'long' });
};

const Calendar = ({ month, horarios, doctorId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dayName, setDayName] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [motivos, setMotivos] = useState({}); // Estado para almacenar los motivos ingresados
  const id_usuario = sessionStorage.getItem("id_usuario");
  const idDoctor = doctorId;
  const navigate = useNavigate();
  // Función para manejar el cambio en el campo de entrada del motivo
  const handleMotivoChange = (event, horaInicio) => {
    const { value } = event.target;
    setMotivos(prevState => ({
      ...prevState,
      [horaInicio]: value // Asigna el motivo ingresado al estado, utilizando la hora de inicio como clave
    }));
  };

  const dias = Array.from({ length: diasEnMes(month) }, (_, i) => i + 1);

  const fetchSchedule = async (dia, mes, idDoctor) => {
    const fecha = new Date(2024, mes, dia);
    const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1);
    setSelectedDate(`2024/${mes+1}/${dia}`);
    setDayName(nombreDia);
    const capitalizedDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
    try {
      // Simulating an API call response for now.
      console.log(capitalizedDia)
      const response = await axios.get(`http://localhost:3000/api/horarios/getHorarioDoctorDia/${capitalizedDia}/${idDoctor}`);

      setSchedules(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAgendar = (startTime, endTime) => {
    if (!motivos[startTime]) {
      swal({
        title: '¡Alto!',
        text: 'Debes agregar un motivo en la cita',
        icon: 'error'
    });
      return;
    }

    const data = {
      pacienteID: id_usuario,
      medicoID: idDoctor,
      fecha: selectedDate,
      hora: startTime,
      motivo: motivos[startTime],
      estado: 'Programada',
      direccionClinica: 'La dirección de la clínica' // Puedes obtener esta información de algún lugar, o proporcionarla como un valor fijo
    };
  
    console.log(selectedDate)
    axios.post('http://localhost:3000/api/citas/add', data)
      .then(response => {
        swal({
          title: '¡Listo!',
          text: 'La cita ha sido agendada exitosamente',
          icon: 'success'
      });
      navigate("/doctores")
        console.log('Cita agendada exitosamente:', response.data);
        // Aquí puedes manejar la respuesta si es necesario
      })
      .catch(error => {
        swal({
          title: '¡Error!',
          text: 'No puedes agendar a esta hora, ya que está ocupada. Por favor, selecciona otro horario.',
          icon: 'error'
      });
        console.error('Error al agendar la cita:', error);
        // Aquí puedes manejar el error si es necesario
      });
  };
  return (
    <div className="calendar">
      <h1>{month + 1}</h1>
      <ul>
        {dias.map(dia => (
          <li key={dia} className={dia === new Date().getDate() && month === new Date().getMonth() ? 'today' : ''}>
            <time dateTime={`2024-${(month + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`}>{dia}</time>
            <span>{obtenerNombreDia(2024, month, dia)}</span>
            <Button variant="secondary" onClick={() => fetchSchedule(dia, month, doctorId)}>Ver horarios</Button>
            {horarios[dia] && (
              <div className="horarios">
                {Object.keys(horarios[dia]).map(doctor => (
                  <div key={doctor}>
                    <span>{doctor}</span>
                    <ul>
                      {horarios[dia][doctor].map((horario, index) => (
                        <li key={index}>{horario}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title><div className='content-Modal'><h1>Detalles del Horario</h1></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-Modal'>
            <h4>Fecha: {selectedDate} ({dayName})</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hora de Inicio</th>
                  <th>Hora Final</th>
                  <th>Motivo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
          
                {schedules.map((schedule, index) => (
                  <tr key={index}>
                    <td>{schedule.HoraInicio}</td>
                    <td>{schedule.HoraFin}</td>
                    <input type="text"  placeholder="Motivo"  value={motivos[schedule.HoraInicio] || ''} required onChange={(event) => handleMotivoChange(event, schedule.HoraInicio)}/>
                    <td>
                      <Button variant="primary" onClick={() => handleAgendar(schedule.HoraInicio, schedule.HoraFin,selectedDate,idDoctor)}>
                        Agendar
                      </Button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;