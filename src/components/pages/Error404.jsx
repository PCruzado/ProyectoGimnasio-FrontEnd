import { Container, Button } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router";

const Error404 = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-center text-light">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4 text-uppercase">¡Oops! Te saliste de la rutina</h2>
      <p className="lead mb-5 text-muted">
        La página que estás buscando no existe o fue movida a otro gimnasio.
      </p>
      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate("/")}
        className="fw-bold px-5"
      >
        VOLVER AL INICIO
      </Button>
    </Container>
  );
};

export default Error404;
