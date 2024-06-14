import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
<<<<<<< HEAD
import VistaMedico from './pages/GestionCitasMedico';
import VistaCitas from './pages/Citas';
import VistaEmail from './pages/CorreoCancelado';

=======
import Doctores from './pages/Doctor'
import Horario from './pages/horarios';
>>>>>>> develop
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
<<<<<<< HEAD
          <Route path='/GestionCitas' element={<VistaMedico/>} />
          <Route path='/Citas' element={<VistaCitas/>} />
          <Route path='/Email' element={<VistaEmail/>} />
=======
          <Route path='/Doctores' element={<Doctores />} />
          <Route path='/Horario' element={<Horario />} />
>>>>>>> develop
        </Routes>
      </Router>
    </>
  )
}

export default App;