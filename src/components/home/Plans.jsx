import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import '../style/Plans.css';

const Plans = () => {
  const planes = [
    {
      id: 1,
      nombre: "Plan Solo Musculación",
      precio: "15.000",
      beneficios: ["Acceso a sala de pesas", "Rutina personalizada", "Seguimiento básico"],
      destacado: false
    },
    {
      id: 2,
      nombre: "Plan Full",
      precio: "25.000",
      beneficios: ["Musculación completa", "Todas las clases (Yoga, Crossfit, etc.)", "Acceso a pileta", "Nutricionista incluido"],
      destacado: true
    },
    {
      id: 3,
      nombre: "Plan Solo Clases",
      precio: "18.000",
      beneficios: ["Acceso a todas las clases", "Profesores certificados", "Sin límite de horario"],
      destacado: false
    }
  ];

  return (
    <Row className="gy-4 py-4 justify-content-center">
      {planes.map((plan) => (
        <Col key={plan.id} xs={12} md={6} lg={4}>
          <Card className={`h-100 plan-card ${plan.destacado ? 'plan-destacado' : ''}`}>
            <Card.Body className="d-flex flex-column text-center">
              <Card.Title className="fw-bold mb-3">{plan.nombre}</Card.Title>
              <div className="precio-container my-3">
                <span className="simbolo">$</span>
                <span className="monto">{plan.precio}</span>
                <span className="periodo">/mes</span>
              </div>
              <ListGroup variant="flush" className="mb-4 flex-grow-1">
                {plan.beneficios.map((item, index) => (
                  <ListGroup.Item key={index} className="bg-transparent text-light border-secondary">
                    <i className="bi bi-check2-circle text-primary me-2"></i> {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button 
                variant={plan.destacado ? "primary" : "outline-light"} 
                size="lg" 
                className="w-100 fw-bold"
              >
                ELEGIR PLAN
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Plans;