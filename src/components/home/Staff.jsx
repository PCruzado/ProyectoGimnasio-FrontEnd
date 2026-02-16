import { Row, Col, Card } from 'react-bootstrap';
import '../style/staff.css';

const Staff = () => {
  // Datos de prueba (Luego vendrán de la base de datos de tus compañeros)
  const profesores = [
    {
      id: 1,
      nombre: "Franco Díaz",
      especialidad: "Musculación & Powerlifting",
      imagen: "https://images.unsplash.com/photo-1567013127542-490d757e51fe?q=80&w=500"
    },
    {
      id: 2,
      nombre: "Lucía Torres",
      especialidad: "Yoga & Pilates",
      imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500"
    },
    {
      id: 3,
      nombre: "Marcos Ruiz",
      especialidad: "Crossfit & HIIT",
      imagen: "https://images.unsplash.com/photo-1541534741688-6078c65b5a33?q=80&w=500"
    },
    {
      id: 4,
      nombre: "Sofía Luna",
      especialidad: "Zumba & Ritmos",
      imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500"
    }
  ];

  return (
    <Row className="gy-4">
      {profesores.map((profe) => (
        <Col key={profe.id} xs={12} sm={6} lg={3}>
          <Card className="staff-card border-0 shadow-sm overflow-hidden">
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