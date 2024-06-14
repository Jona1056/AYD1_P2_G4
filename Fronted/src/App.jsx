import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
import VistaMedico from './pages/GestionCitasMedico';
import VistaCitas from './pages/Citas';
import VistaEmail from './pages/CorreoCancelado';
import VistaHorariosMedico from './pages/HorariosMedico';
import Doctores from './pages/Doctor'
import Horario from './pages/horarios';
import VistaHistorialMedico from './pages/HistorialCitasMedico';
import VistaPerfilMedico from './pages/EditarMedico';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/GestionCitas' element={<VistaMedico/>} />
          <Route path='/Citas' element={<VistaCitas/>} />
          <Route path='/Email' element={<VistaEmail/>} />
          <Route path='/Doctores' element={<Doctores />} />
          <Route path='/Horario' element={<Horario />} />
          <Route path='/horarios' element={<VistaHorariosMedico/>} />
          <Route path='/historial-citas' element={<VistaHistorialMedico/>} />
          <Route path='/actualizar-perfil' element={<VistaPerfilMedico/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;