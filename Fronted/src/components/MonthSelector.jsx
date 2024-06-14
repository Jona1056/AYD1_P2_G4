
import '../styles/MonthSelector.css';

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const MonthSelector = ({ currentMonth, setCurrentMonth }) => {
    const handlePreviousMonth = () => {
      setCurrentMonth((currentMonth + 11) % 12);
    };
  
    const handleNextMonth = () => {
      setCurrentMonth((currentMonth + 1) % 12);
    };
  
    return (
      <div className="month-selector">
        <button onClick={handlePreviousMonth}>Anterior</button>
        <span>{meses[currentMonth]}</span>
        <button onClick={handleNextMonth}>Siguiente</button>
      </div>
    );
  }
  
  export default MonthSelector;