import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

const FooterGym = () => {
  return (
    <footer className="bg-black py-5 border-top border-secondary mt-auto">
      <Container>
        <Row className="gy-4 text-center text-md-start">
          <Col md={4}>
            <h5 className="text-primary fw-bold mb-3">ROLLING GYM</h5>
            <p className="text-secondary small pe-md-5">
              Transformando cuerpos y vidas en San Miguel de Tucumán desde 2026. 
              Unite a la comunidad fitness más grande de la región.
            </p>
          </Col>

          <Col md={4}>
            <h6 className="text-light fw-bold mb-3 text-uppercase">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none hover-primary">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="text-secondary text-decoration-none hover-primary">Sobre Nosotros</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-secondary text-decoration-none hover-primary">Contacto</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="text-light fw-bold mb-3 text-uppercase">Encontranos</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2">
                <i className="bi bi-geo-alt text-primary me-2"></i> 
                <a 
                  href="https://maps.app.goo.gl/3X8S5Y2Y7Y7Y7Y7Y7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary text-decoration-none"
                >
                  Gral. Paz 576, San Miguel de Tucumán
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone text-primary me-2"></i> +54 381 222-2222
              </li>
              <li className="mb-2 text-primary fw-bold">
                <i className="bi bi-envelope me-2"></i> info@rollinggym.com
              </li>
            </ul>
            
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-4 mt-3">
              <a href="https://instagram.com" target="_blank" className="text-primary transition-all hover-scale">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" className="text-primary transition-all hover-scale">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" className="text-primary transition-all hover-scale">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small">
          <p className="mb-2 mb-md-0">&copy; 2026 Rolling Gym. Todos los derechos reservados.</p>
          <p className="mb-0 text-uppercase tracking-wider">Desarrollado por el Staff de Rolling School</p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterGym;