
import '../styles/MonthSelector.css';



const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = ({ currentMonth, setCurrentMonth }) => {
  const handlePrevMonth = () => {
    setCurrentMonth((currentMonth + 11) % 12);
  };

  const handleNextMonth = () => {
    setCurrentMonth((currentMonth + 1) % 12);
  };

  return (
    <div>
      <button onClick={handlePrevMonth}>Previous</button>
      <span>{months[currentMonth]}</span>
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
}

export default MonthSelector;
