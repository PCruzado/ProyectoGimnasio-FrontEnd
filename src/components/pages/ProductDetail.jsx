import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_URL}/api/productos/${id}`,
        );
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al traer el producto:", error);
        Swal.fire("Error", "No pudimos encontrar el producto", "error");
        navigate("/");
      }
    };

    fetchProducto();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="text-light mt-3">Cargando suplemento...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5 text-light">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-4 border-0"
      >
        ← Volver a la tienda
      </Button>

      <Row className="bg-black p-4 rounded-4 border border-secondary shadow-lg align-items-center">
        <Col md={6} className="text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded-3 shadow"
            style={{ maxHeight: "450px", objectFit: "contain" }}
          />
        </Col>

        <Col md={6} className="ps-md-5 mt-4 mt-md-0">
          <Badge bg="primary" className="mb-2 text-uppercase">
            {producto.categoria}
          </Badge>
          <h1 className="display-5 fw-bold text-uppercase">
            {producto.nombre}
          </h1>
          <h2 className="text-primary fw-bold mb-4">${producto.precio}</h2>

          <h5 className="text-secondary">Descripción:</h5>
          <p className="lead mb-4">{producto.descripcion}</p>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" className="fw-bold py-3">
              AGREGAR AL CARRITO
            </Button>
            <p className="text-center text-secondary small mt-2">
              <i className="bi bi-truck me-2"></i> Envío gratis a todo San
              Miguel de Tucumán
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
