import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

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
        confirmButtonColor: "#ff4d00"
      });
      form.reset();
      setValidated(false);
      return;
    }

    setValidated(true);
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="bg-black border-secondary shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center fw-bold text-primary mb-4 text-uppercase">Contacto</h2>
              {/* Cambiado a text-light para que sea legible sobre negro */}
              <p className="text-center text-light mb-5">
                ¿Tenés alguna duda sobre nuestros planes o instalaciones? Escribinos.
              </p>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Nombre Completo - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label className="text-white fw-bold">Nombre y Apellido</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ej: Mario Pérez"
                    className="bg-dark text-light border-secondary shadow-sm"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresá tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="text-white fw-bold">Correo Electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="nombre@email.com"
                    className="bg-dark text-light border-secondary shadow-sm"
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresá un correo electrónico válido.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Asunto - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formAsunto">
                  <Form.Label className="text-white fw-bold">Asunto</Form.Label>
                  <Form.Select required className="bg-dark text-light border-secondary shadow-sm">
                    <option value="">Seleccioná una opción...</option>
                    <option value="planes">Consulta sobre Planes</option>
                    <option value="clases">Horarios de Clases</option>
                    <option value="otros">Otras Consultas</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Seleccioná el motivo de tu contacto.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Mensaje - Etiqueta en Blanco */}
                <Form.Group className="mb-4" controlId="formMensaje">
                  <Form.Label className="text-white fw-bold">Tu Mensaje</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={4}
                    placeholder="Escribí tu consulta aquí..."
                    className="bg-dark text-light border-secondary shadow-sm"
                  />
                  <Form.Control.Feedback type="invalid">
                    El mensaje no puede estar vacío.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold py-3 shadow">
                  ENVIAR MENSAJE
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sección Extra de Datos - Textos en Blanco/Gris Claro */}
      <Row className="mt-5 text-center text-white">
        <Col md={4} className="mb-4 mb-md-0">
          <i className="bi bi-geo-alt text-primary fs-2"></i>
          <h5 className="mt-2 fw-bold">Ubicación</h5>
          <p className="text-light">San Miguel de Tucumán, Argentina</p>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <i className="bi bi-telephone text-primary fs-2"></i>
          <h5 className="mt-2 fw-bold">Teléfono</h5>
          <p className="text-light">+54 381 222-2222</p>
        </Col>
        <Col md={4}>
          <i className="bi bi-envelope text-primary fs-2"></i>
          <h5 className="mt-2 fw-bold">Email Directo</h5>
          <p className="text-light">info@rollinggym.com</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;