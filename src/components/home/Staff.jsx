import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router'; 
import { staff1, staff2, staff3, staff4 } from '../assets/staff';
import '../style/staff.css';

const Staff = () => {
  const navigate = useNavigate();

  const profesores = [
    { id: 1, nombre: "Franco Díaz", especialidad: "Musculación & Powerlifting", imagen: staff1 },
    { id: 2, nombre: "Lucía Torres", especialidad: "Yoga & Pilates", imagen: staff2 },
    { id: 3, nombre: "Marcos Ruiz", especialidad: "Crossfit & HIIT", imagen: staff3 },
    { id: 4, nombre: "Sofía Luna", especialidad: "Zumba & Ritmos", imagen: staff4 }
  ];

  return (
    <Row className="gy-4">
      {profesores.map((profe) => (
        <Col key={profe.id} xs={12} sm={6} lg={3}>
          <Card 
            className="staff-card border-0 shadow-sm overflow-hidden clickable-card"
            onClick={() => navigate(`/staff/${profe.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="img-container">
              <Card.Img variant="top" src={profe.imagen} alt={profe.nombre} />
              <div className="staff-overlay d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h5 className="text-white mb-0">{profe.nombre}</h5>
                  <small className="text-primary fw-bold text-uppercase">
                    {profe.especialidad}
                  </small>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Staff;