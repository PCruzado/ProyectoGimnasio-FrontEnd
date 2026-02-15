import { Container, Nav, Navbar } from "react-bootstrap";

function NavbarGym() {
  return (
    <Navbar expand="lg" id="navbar-gym" variant="dark">
      <Container>
        <Navbar.Brand className="text-white" href="#home">
          <strong>GYM</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="text-white" href="#home">
              Inicio
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              Nosotros
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              Contactos
            </Nav.Link>
            {/* API CLIMA */}
            {/* BOTON INGRESAR */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarGym;
