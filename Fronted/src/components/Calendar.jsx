
import '../styles/Calendar.css'

const diasEnMes = (mes) => {
    return new Date(2024, mes + 1, 0).getDate();
  };
  
  const obtenerNombreDia = (año, mes, dia) => {
    const fecha = new Date(año, mes, dia);
    return fecha.toLocaleDateString('es-ES', { weekday: 'long' });
  };
  
  const Calendar = ({ month, horarios }) => {
    const dias = Array.from({ length: diasEnMes(month) }, (_, i) => i + 1);
  
    return (
      <div className="calendar">
        <h1>{month + 1}</h1>
        <ul>
          {dias.map(dia => (
            <li key={dia} className={dia === new Date().getDate() && month === new Date().getMonth() ? 'today' : ''}>
              <time dateTime={`2024-${month + 1}-${dia.toString().padStart(2, '0')}`}>{dia}</time>
              <span>{obtenerNombreDia(2024, month, dia)}</span>
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
      </div>
    );
  }
  
  export default Calendar;