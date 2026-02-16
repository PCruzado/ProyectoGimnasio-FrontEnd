import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import '../style/NavbarGym.css';

const NavbarGym = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          <span className="text-primary">ROLLING</span>GYM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="mx-2">Inicio</Nav.Link>
            <Nav.Link href="#servicios" className="mx-2">Servicios</Nav.Link>
            <Nav.Link href="#planes" className="mx-2">Planes</Nav.Link>
            <Nav.Link href="#staff" className="mx-2">Staff</Nav.Link>
            <Nav.Link href="#contacto" className="mx-2">Contacto</Nav.Link>
            {/* Botón de Login (Requerimiento) */}
            <Button variant="outline-primary" className="ms-lg-3 mt-3 mt-lg-0 px-4 fw-bold">
              LOGIN
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarGym;