import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      Swal.fire({
        title: "¡Mensaje Enviado!",
        text: "Nos pondremos en contacto con vos a la brevedad.",
        icon: "success",
        confirmButtonColor: "#ff4d00",
      });
      form.reset();
      setValidated(false);
      return;
    }

    setValidated(true);
  };

  return (
    <Container className="py-5 mt-5 text-light">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="bg-black border-secondary shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center fw-bold text-primary mb-4 text-uppercase">
                Contacto
              </h2>
              <p className="text-center text-secondary mb-5">
                ¿Tenés alguna duda sobre nuestros planes o instalaciones?
                Escribinos.
              </p>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ej: Mario Pérez"
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresá tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="nombre@email.com"
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresá un correo electrónico válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAsunto">
                  <Form.Label>Asunto</Form.Label>
                  <Form.Select
                    required
                    className="bg-dark text-light border-secondary"
                  >
                    <option value="">Seleccioná una opción...</option>
                    <option value="planes">Consulta sobre Planes</option>
                    <option value="clases">Horarios de Clases</option>
                    <option value="otros">Otras Consultas</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Seleccioná el motivo de tu contacto.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMensaje">
                  <Form.Label>Tu Mensaje</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={4}
                    placeholder="Escribí tu consulta aquí..."
                    className="bg-dark text-light border-secondary"
                  />
                  <Form.Control.Feedback type="invalid">
                    El mensaje no puede estar vacío.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold py-3"
                >
                  ENVIAR MENSAJE
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col md={4}>
          <i className="bi bi-geo-alt text-primary fs-2"></i>
          <h5 className="mt-2">Ubicación</h5>
          <p className="text-secondary">San Miguel de Tucumán, Argentina</p>
        </Col>
        <Col md={4}>
          <i className="bi bi-telephone text-primary fs-2"></i>
          <h5 className="mt-2">Teléfono</h5>
          <p className="text-secondary">+54 381 000-0000</p>
        </Col>
        <Col md={4}>
          <i className="bi bi-envelope text-primary fs-2"></i>
          <h5 className="mt-2">Email Directo</h5>
          <p className="text-secondary">info@rollinggym.com</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
