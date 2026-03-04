import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router"; 
import "../style/NavbarGym.css";

const NavbarGym = ({ onLoginClick, user, onLogout }) => {
  const location = useLocation();

  // Función para subir al inicio (Scroll to top)
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Hace que el subidón sea suave
    });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-lg">
      <Container>
        {/* Logo con subida automática al inicio */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          onClick={handleScrollToTop} 
          className="fw-bold fs-3"
        >
          <span className="text-primary">ROLLING</span>GYM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            {/* Inicio: Agregamos 'end' para que no quede activo cuando entras a otras páginas */}
            <Nav.Link 
              as={NavLink} 
              to="/" 
              end 
              onClick={handleScrollToTop} 
              className="mx-2"
            >
              Inicio
            </Nav.Link>

            {/* Cambiamos href por NavLink para evitar recargas bruscas */}
            <Nav.Link as={NavLink} to="/nosotros" className="mx-2">
              Nosotros
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contacto" className="mx-2">
              Contacto
            </Nav.Link>

            {/* Renderizado Condicional */}
            {user ? (
              <>
                {/* Corregido: Tu modelo de backend usa 'rol' y 'administrador' */}
                {user.rol === "administrador" && (
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