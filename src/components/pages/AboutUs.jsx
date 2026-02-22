import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  const equipo = [
    { nombre: "Facundo Vera", rol: "Frontend Lead / Senior Dev", ig: "@faundovera647" },
    { nombre: "Compañero 2", rol: "Frontend Developer", ig: "@user2" },
    { nombre: "Compañero 3", rol: "Frontend Developer", ig: "@user3" },
    { nombre: "Compañero 4", rol: "Backend Lead / Architect", ig: "@user4" },
    { nombre: "Compañero 5", rol: "Backend Developer", ig: "@user5" },
    { nombre: "Compañero 6", rol: "Backend Developer", ig: "@user6" },
  ];

  return (
    <Container className="py-5 text-light">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-primary">NUESTRO EQUIPO</h1>
          <p className="lead text-muted">
            "Unidos por el código, motivados por el fitness. Desarrollamos soluciones que transforman vidas."
          </p>
        </Col>
      </Row>

      <Row className="gy-4">
        {equipo.map((miembro, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="bg-black border-secondary h-100 text-center shadow-lg hover-card">
              <div className="pt-4">
                {/* Avatar Genérico con estilo Gym */}
                <div className="rounded-circle bg-dark d-inline-block p-4 border border-primary mb-3">
                  <i className="bi bi-person-bounding-box text-primary fs-1"></i>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">{miembro.nombre}</Card.Title>
                <Card.Text className="text-primary small fw-bold text-uppercase">
                  {miembro.rol}
                </Card.Text>
                <div className="mt-3">
                  <a href="#" className="text-muted text-decoration-none mx-2 small">
                    <i className="bi bi-github"></i> GitHub
                  </a>
                  <a href="#" className="text-muted text-decoration-none mx-2 small">
                    <i className="bi bi-instagram"></i> Instagram
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;