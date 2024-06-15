import '../styles/Calendar.css';
import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

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

  const dias = Array.from({ length: diasEnMes(month) }, (_, i) => i + 1);

  const fetchSchedule = async (dia, mes, idDoctor) => {
    const fecha = new Date(2024, mes, dia);
    const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1);
    setSelectedDate(`${dia}/${mes + 1}/2024`);
    setDayName(nombreDia);

    try {
      // Simulating an API call response for now.
      const response = {
        data: [
          { startTime: "08:00 AM", endTime: "09:00 AM" },
          { startTime: "10:00 AM", endTime: "11:00 AM" },
          { startTime: "01:00 PM", endTime: "02:00 PM" }
        ]
      };
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
    console.log(`Agendar: ${selectedDate}, ${startTime}, ${endTime}, Doctor ID: ${doctorId}`);
    // Aquí puedes manejar la lógica para agendar la cita
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
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={index}>
                    <td>{schedule.startTime}</td>
                    <td>{schedule.endTime}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleAgendar(schedule.startTime, schedule.endTime,selectedDate)}>
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