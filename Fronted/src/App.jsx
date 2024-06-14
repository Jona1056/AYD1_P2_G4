import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
import VistaMedico from './pages/GestionCitasMedico';
import VistaCitas from './pages/Citas';
import VistaEmail from './pages/CorreoCancelado';

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
        </Routes>
      </Router>
    </>
  )
}

export default App;