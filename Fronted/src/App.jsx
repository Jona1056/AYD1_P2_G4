
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Registro';
import Doctores from './pages/Doctor'
import Horario from './pages/horarios';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Doctores' element={<Doctores />} />
          <Route path='/Horario' element={<Horario />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;