import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

const FooterGym = () => {
  return (
    <footer className="bg-black py-5 border-top border-secondary mt-auto">
      <Container>
        <Row className="gy-4 text-center text-md-start">
          <Col md={4}>
            <h5 className="text-primary fw-bold mb-3">ROLLING GYM</h5>
            <p className="text-secondary small">
              Transformando cuerpos y vidas en San Miguel de Tucumán desde 2026.
            </p>
          </Col>
          <Col md={4}>
            <Link
              to="/contacto"
              className="text-light fw-bold mb-3 text-decoration-none"
            >
              CONTACTO
            </Link>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2">
                <i className="bi bi-geo-alt text-primary me-2"></i> Gral. Paz
                576, Tucumán
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone text-primary me-2"></i> +54 381
                222-2222
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope text-primary me-2"></i>{" "}
                info@rollinggym.com
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h6 className="text-light fw-bold mb-3">SÍGUENOS</h6>
            <div className="d-flex justify-content-center gap-3 fs-4">
              <a href="#" className="text-primary">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-primary">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-primary">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <p className="text-center text-secondary mb-0 small">
          &copy; 2026 Rolling Gym. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default FooterGym;
