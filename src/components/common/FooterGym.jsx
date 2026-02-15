import { Col, Row } from "react-bootstrap";
import "../style/FooterGym.css";

const FooterGym = () => {
  return (
    <div className="bgFooter container-fluid mt-auto" >
      <Row className="py-4">
        <Col>
          <Row className="text-center">
            <div className="mb-3">
              <strong>Seguinos</strong>
            </div>

            <Col>
              <i className="bi bi-facebook fs-3"></i>
            </Col>
            <Col>
              <i className="bi bi-instagram fs-3"></i>
            </Col>
            <Col>
              <i className="bi bi-twitter-x fs-3"></i>
            </Col>
          </Row>
        </Col>

        <Col className="text-center">
          <div className="mb-3">
            <strong>Contacto</strong>
          </div>

          <p>Direccion</p>
          <p>222222222</p>
          <p>info@gym.com</p>
        </Col>
        <Col className="text-center">
          <div className="mb-3">
            <strong>Links Rapidos</strong>
          </div>

          <p>Inicio</p>
          <p>Nosotros</p>
          <p>Contacto</p>
          <p>Registrarse</p>
        </Col>
      </Row>
      <Row className="text-center container-fluid">
        <div className="py-4 border-top border-secondary ">
          <div className="text-white">
            <p>© 2026 Gym. Todos los derechos reservados.</p>
          </div>
          <div className="text-white">
            <p>Desarrollado por Nosotros</p>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default FooterGym;
