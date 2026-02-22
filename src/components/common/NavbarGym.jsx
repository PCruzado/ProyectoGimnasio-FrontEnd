import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router'; // Importamos los componentes de navegación
import '../style/NavbarGym.css'; // Asegúrate de tener estilos para el navbar

const NavbarGym = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-lg">
      <Container>
        {/* El logo debe ser un Link a "/" para volver siempre al inicio */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <span className="text-primary">ROLLING</span>GYM
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Usamos 'as={NavLink}' para que React Router tome el control */}
            <Nav.Link as={NavLink} to="/" className="mx-2">Inicio</Nav.Link>
            <Nav.Link href="/#servicios" className="mx-2">Servicios</Nav.Link>
            <Nav.Link href="/#planes" className="mx-2">Planes</Nav.Link>
            <Nav.Link as={NavLink} to="/staff" className="mx-2">Staff</Nav.Link>
            
            <Button as={Link} to="/login" variant="outline-primary" className="ms-lg-3 mt-3 mt-lg-0 px-4 fw-bold">
              LOGIN
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarGym;