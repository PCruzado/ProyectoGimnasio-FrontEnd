import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Reservation = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchClases();
  }, []);

  const fetchClases = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/clases`);
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
        confirmButtonColor: "#ff4d00",
      });
    }

    try {
      await axios.post(
        `${API_URL}/api/clases/${clase._id}/inscribir`,
        {},
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        },
      );

      Swal.fire({
        title: "¡Reserva Exitosa!",
        text: `Te anotaste en ${clase.nombreClase} con ${clase.profesor}.`,
        icon: "success",
        confirmButtonColor: "#ff4d00",
      });
      fetchClases();
    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje || "Error al realizar la reserva";
      Swal.fire("Error", mensaje, "error");
    }
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto my-5"
      />
    );

  return (
    <Container className="py-5 mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-uppercase text-white">
          Reserva tu <span className="text-primary">Lugar</span>
        </h1>

        <p className="lead text-light">
          Elegí tu disciplina y entrená con los mejores profesionales.
        </p>
      </div>

      {!loggedUser && (
        <Alert
          variant="warning"
          className="bg-dark text-warning border-warning text-center mb-4 shadow"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Recordá que debes estar logueado para poder confirmar tu reserva.
        </Alert>
      )}

      <Row className="gy-4">
        {clases.length === 0 ? (
          <Col className="text-center">
            <p className="text-light fs-5">
              No hay clases programadas para hoy.
            </p>
          </Col>
        ) : (
          clases.map((clase) => {
            const cuposDisponibles =
              clase.capacidadMax - (clase.usuariosInscriptos?.length || 0);
            return (
              <Col key={clase._id} xs={12} md={6} lg={4}>
                <Card className="bg-black border-secondary h-100 shadow-lg">
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge bg="primary" className="p-2 text-uppercase">
                        {clase.nombreClase}
                      </Badge>
                      <span className="text-primary fw-bold">
                        <i className="bi bi-clock me-1"></i> {clase.horario}hs
                      </span>
                    </div>

                    <Card.Title className="fs-3 fw-bold mb-2 text-white">
                      {clase.nombreClase}
                    </Card.Title>

                    <p className="text-light mb-1">
                      <i className="bi bi-person-badge text-primary me-2"></i>
                      Prof:{" "}
                      <strong className="text-white">{clase.profesor}</strong>
                    </p>
                    <p className="text-light mb-3">
                      <i className="bi bi-people text-primary me-2"></i>
                      Cupos:{" "}
                      <strong
                        className={
                          cuposDisponibles === 0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {cuposDisponibles} disponibles
                      </strong>
                    </p>

                    <div className="bg-dark p-2 rounded mb-4 text-center border border-secondary">
                      <small className="text-white text-uppercase tracking-wider">
                        <i className="bi bi-calendar3 me-2 text-primary"></i>
                        {clase.fecha}
                      </small>
                    </div>

                    <Button
                      variant={
                        loggedUser
                          ? cuposDisponibles > 0
                            ? "primary"
                            : "secondary"
                          : "outline-primary"
                      }
                      className="mt-auto fw-bold py-3 text-uppercase"
                      onClick={() => handleReserva(clase)}
                      disabled={loggedUser && cuposDisponibles === 0}
                    >
                      {loggedUser
                        ? cuposDisponibles > 0
                          ? "RESERVAR AHORA"
                          : "CLASE LLENA"
                        : "INICIÁ SESIÓN"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default Reservation;
