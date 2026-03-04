import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect es el "disparador" que trae los datos al abrir la página
  useEffect(() => {
    const traerProductos = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/productos");
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la tienda", error);
        setLoading(false);
      }
    };

    traerProductos();
  }, []);

  if (loading) return <Spinner animation="grow" variant="primary" className="d-block mx-auto my-4" />;

  return (
    <Row className="gy-4 py-4">
      {productos.length === 0 ? (
        <p className="text-center text-secondary">No hay suplementos disponibles en este momento.</p>
      ) : (
        productos.map(p => (
          <Col key={p._id} xs={12} sm={6} lg={4}>
            <Card className="h-100 bg-black border-secondary text-light shadow hover-card">
              <Card.Img variant="top" src={p.imagen} style={{ height: '220px', objectFit: 'contain', padding: '10px' }} />
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="fw-bold">{p.nombre}</Card.Title>
                <Card.Text className="text-secondary small flex-grow-1">
                  {p.categoria}
                </Card.Text>
                <h5 className="text-primary fw-bold mb-3">${p.precio}</h5>
                <Button 
                  variant="outline-primary" 
                  className="w-100 fw-bold mt-auto"
                  onClick={() => navigate(`/producto/${p._id}`)}
                >
                  VER DETALLES
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default Products;