import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router"; 
import "../style/NavbarGym.css";

const NavbarGym = ({ onLoginClick, user, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <span className="text-primary">ROLLING</span>GYM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="mx-2">Inicio</Nav.Link>
            <Nav.Link href="/#servicios" className="mx-2">Servicios</Nav.Link>
            <Nav.Link href="/#planes" className="mx-2">Planes</Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/nosotros"
              className={({ isActive }) => isActive ? "nav-link active text-primary" : "nav-link"}
            >
              Nosotros
            </Nav.Link>

            {/* Renderizado Condicional */}
            {user ? (
              <>
                {user.role === "admin" && (
                  <Nav.Link as={NavLink} to="/admin" className="mx-2 text-warning fw-bold">
                    ADMIN
                  </Nav.Link>
                )}
                
                <span className="text-secondary mx-3 d-none d-lg-inline">
                  Hola, <span className="text-light">{user.nombre}</span>
                </span>

                <Button
                  onClick={onLogout}
                  variant="outline-danger"
                  className="ms-lg-3 mt-3 mt-lg-0 px-4 fw-bold"
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <Button
                onClick={onLoginClick}
                variant="outline-primary"
                className="ms-lg-3 mt-3 mt-lg-0 px-4 fw-bold"
              >
                LOGIN
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarGym;