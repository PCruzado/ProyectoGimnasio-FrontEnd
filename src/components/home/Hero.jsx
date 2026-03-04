import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router"; 
import "../style/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container d-flex align-items-center text-light">
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6}>
            <div className="hero-content p-3 p-md-4 rounded">
              <h1 className="display-4 fw-bold">
                TRANSFORMÁ <br /> <span>TU CUERPO</span>
              </h1>
              <p className="lead my-3">
                Entrenamiento de elite, planes personalizados y el mejor
                ambiente de Tucumán.
              </p>
              <div className="d-grid d-md-flex gap-3 mt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="btn-hero fw-bold"
                  onClick={() => scrollToSection("planes")}
                >
                  VER PLANES
                </Button>
                
                {/* Botón de Reservas: Ahora redirige a la página de turnos */}
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="btn-hero fw-bold"
                  onClick={() => navigate("/reservas")}
                >
                  RESERVÁ TU CLASE
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;