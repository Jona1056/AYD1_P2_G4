import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/navegador.css'
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();
    
    const handleBackLogin = () => {
        navigate('/');
    }

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <img src='./src/assets/equipo-medico.png' className='navbar-logo' />
                <Navbar.Brand className='ml-0 text-title'>Medicare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link className='navbar-items'>Horarios</Nav.Link>
                        <Nav.Link className='navbar-items'>Historial de Citas</Nav.Link>
                        <Nav.Link className='navbar-items'>Actualizar Perfil</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link className='navbar-items' onClick={handleBackLogin}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;