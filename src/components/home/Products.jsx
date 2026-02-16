import { Row, Col, Card, Button } from 'react-bootstrap';

const Products = () => {
  const productos = [
    { id: 1, nombre: "Proteína Whey 1kg", precio: "35.000", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400" },
    { id: 2, nombre: "Creatina Monohidrato", precio: "28.000", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=400" },
    { id: 3, nombre: "Remera Gym Oversize", precio: "12.000", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400" }
  ];

  return (
    <Row className="gy-4 py-4">
      {productos.map(p => (
        <Col key={p.id} xs={12} sm={6} lg={4}>
          <Card className="h-100 bg-transparent border-secondary text-light">
            <Card.Img variant="top" src={p.img} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body className="text-center">
              <Card.Title>{p.nombre}</Card.Title>
              <h5 className="text-primary fw-bold">${p.precio}</h5>
              <Button variant="outline-primary" size="sm" className="mt-2">Ver Detalle</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Products;