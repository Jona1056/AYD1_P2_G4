import  { useState, useEffect } from "react";
import "../styles/horario.css"; // Suponiendo que tienes un archivo CSS para estilos

import Calendar from '../components/Calendar';
import MonthSelector from '../components/MonthSelector';
import Navbar1 from "../components/navbar";
const Horario = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [horarios, setHorarios] = useState({});

  // Horarios fijos de los doctores
  const horariosDoctores = {
    doctor1: {
      martes: ['9:00', '10:00', '11:00'],
      miercoles: ['9:00', '10:00', '11:00'],
      jueves: ['9:00', '10:00', '11:00'],
      viernes: ['9:00', '10:00', '11:00']
    },
    doctor2: {
      jueves: ['8:00', '9:00', '10:00'],
      viernes: ['8:00', '9:00', '10:00']
    },
    doctor3: {
      lunes: ['13:00', '14:00', '15:00'],
      martes: ['13:00', '14:00', '15:00'],
      miercoles: ['13:00', '14:00', '15:00'],
      jueves: ['13:00', '14:00', '15:00'],
      viernes: ['13:00', '14:00', '15:00']
    }
  };

  const obtenerHorarios = (dia) => {
    const horariosDia = {};
    Object.keys(horariosDoctores).forEach(doctor => {
      if (horariosDoctores[doctor][dia]) {
        horariosDia[doctor] = horariosDoctores[doctor][dia];
      }
    });
    return horariosDia;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actualizarHorarios = () => {
    const horariosMes = {};
    const diasEnMes = new Date(2024, currentMonth + 1, 0).getDate();

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(2024, currentMonth, dia);
      const nombreDia = fecha.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      horariosMes[dia] = obtenerHorarios(nombreDia);
    }

    setHorarios(horariosMes);
  };

  useEffect(() => {
    actualizarHorarios();
  }, [actualizarHorarios, currentMonth]);

  return (
    <div>
    <Navbar1 />
    <div className="app">
       
      <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <Calendar month={currentMonth} horarios={horarios} />
    </div>
    </div>
  );
}

export default Horario;
