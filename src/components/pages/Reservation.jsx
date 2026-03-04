import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Reservation = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtenemos el usuario del storage para saber si puede reservar
  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));

  useEffect(() => {
    fetchClases();
  }, []);

  const fetchClases = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/clases");
      setClases(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al traer clases", error);
      setLoading(false);
    }
  };

  const handleReserva = async (clase) => {
    if (!loggedUser) {
      return Swal.fire({
        title: "¡Atención!",
        text: "Debes iniciar sesión para reservar una clase.",
        icon: "info",
        confirmButtonColor: "#ff4d00"
      });
    }

    try {
      // Aquí enviamos la reserva al backend
      // Tus compañeros del backend deben tener el endpoint POST /api/reservas
      await axios.post("http://localhost:4000/api/reservas", {
        claseId: clase._id,
        usuarioId: loggedUser._id,
        nombreUsuario: loggedUser.nombre
      }, {
        headers: { Authorization: `Bearer ${loggedUser.token}` }
      });

      Swal.fire({
        title: "¡Reserva Exitosa!",
        text: `Te anotaste en ${clase.nombre} con ${clase.profesor}.`,
        icon: "success",
        confirmButtonColor: "#ff4d00"
      });
    } catch (error) {
      Swal.fire("Error", "Ya estás anotado o no hay cupos disponibles.", "error");
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />;

  return (
    <Container className="py-5 mt-5 text-light">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-uppercase">Reserva tu <span className="text-primary">Lugar</span></h1>
        <p className="lead text-secondary">Elegí tu disciplina y entrená con los mejores profesionales.</p>
      </div>

      {!loggedUser && (
        <Alert variant="warning" className="bg-dark text-warning border-warning text-center mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> 
          Recordá que debes estar logueado para poder confirmar tu reserva.
        </Alert>
      )}

      <Row className="gy-4">
        {clases.length === 0 ? (
          <Col className="text-center">
            <p className="text-secondary">No hay clases programadas para hoy.</p>
          </Col>
        ) : (
          clases.map((clase) => (
            <Col key={clase._id} xs={12} md={6} lg={4}>
              <Card className="bg-black border-secondary h-100 shadow-lg hover-card">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg="primary" className="p-2 text-uppercase">{clase.nombre}</Badge>
                    <span className="text-primary fw-bold"><i className="bi bi-clock me-1"></i> {clase.hora}hs</span>
                  </div>
                  
                  <Card.Title className="fs-3 fw-bold mb-2">{clase.nombre}</Card.Title>
                  <p className="text-secondary mb-3">
                    <i className="bi bi-person-badge text-primary me-2"></i>
                    Prof: <strong>{clase.profesor}</strong>
                  </p>
                  
                  <div className="bg-dark p-2 rounded mb-4 text-center border border-secondary">
                    <small className="text-uppercase tracking-wider">
                      <i className="bi bi-calendar3 me-2"></i>{clase.fecha}
                    </small>
                  </div>

                  <Button 
                    variant={loggedUser ? "primary" : "outline-secondary"} 
                    className="mt-auto fw-bold py-3"
                    onClick={() => handleReserva(clase)}
                  >
                    {loggedUser ? "RESERVAR AHORA" : "INICIÁ SESIÓN"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Reservation;