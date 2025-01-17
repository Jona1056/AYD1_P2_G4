import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
import VistaMedico from './pages/GestionCitasMedico';
import VistaCitas from './pages/Citas';
import VistaEmail from './pages/CorreoCancelado';
import CitasUsuario from './pages/CitasUsuario';
import CitasHistorialUsuario from './pages/CitasHistorialUsuario';
import EditarPerfilPaciente from './pages/EditarPaciente';

import Doctores from './pages/Doctor'
import Horario from './pages/horarios';
import VistaHorariosMedico from './pages/HorariosMedico';
import ActualizarHorario from './pages/ActualizarHorario';

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
          <Route path='/CitasUsuario' element={<CitasUsuario/>} />
          <Route path='/CitasHistorialUsuario' element={<CitasHistorialUsuario/>} />
          <Route path='/PerfilUsuario' element={<EditarPerfilPaciente/>} />
          <Route path="/actualizar-horario" element={<ActualizarHorario/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;