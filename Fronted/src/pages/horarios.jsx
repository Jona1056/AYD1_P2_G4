import  { useState, useEffect } from "react";
import "../styles/horario.css"; // Suponiendo que tienes un archivo CSS para estilos

import Calendar from '../components/Calendar';
import MonthSelector from '../components/MonthSelector';
import Navbar1 from "../components/navbar";
const Horario = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [horarios, setHorarios] = useState({});



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actualizarHorarios = () => {
    const horariosMes = {};

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
