import React, { useRef } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const PlanDetail = () => {
  const { id } = useParams(); // Captura 'musculacion', 'clases' o 'full'
  const form = useRef();

  // Diccionario de datos para evitar "hardcoding"
  const infoPlanes = {
    musculacion: {
      titulo: "Plan Solo Musculación",
      desc: "Enfoque total en hipertrofia y fuerza con seguimiento de rutina.",
      precio: "15.000",
    },
    clases: {
      titulo: "Plan Solo Clases",
      desc: "Acceso ilimitado a Yoga, Crossfit, Zumba y más.",
      precio: "18.000",
    },
    full: {
      titulo: "Plan Full",
      desc: "Acceso total: Musculación + Clases + Pileta + Nutricionista.",
      precio: "25.000",
    },
  };

  const planActual = infoPlanes[id] || infoPlanes.full;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Objeto con los datos exactos. 
    // AGREGAMOS 'reply_to' o 'to_email' según cómo lo tengas en EmailJS
    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value, // Asegurate que en el dashboard diga {{user_email}}
      user_phone: form.current.user_phone.value,
      plan_type: planActual.titulo,
      plan_price: planActual.precio,
      to_email: form.current.user_email.value, // Esto ayuda a dirigir el mail si es confirmación
    };

    console.log("Enviando datos:", templateParams); // Debugging para vos

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Usá tu variable de entorno aquí
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("ÉXITO!", response.status, response.text);
        Swal.fire({
          title: "¡Éxito!",
          text: "Revisá tu correo para confirmar",
          icon: "success",
          confirmButtonColor: "#ff4d00"
        });
        e.target.reset(); // Limpia el form
      })
      .catch((err) => {
        console.error("Error detallado:", err);
        Swal.fire("Error", "No se pudo enviar. Revisá la consola (F12)", "error");
      });
  };

  return (
    <Container className="py-5">
      <Row className="gy-4 align-items-center">
        <Col lg={6}>
          <h1 className="display-4 fw-bold text-primary text-uppercase">
            {planActual.titulo}
          </h1>
          <p className="lead text-muted mb-4">{planActual.desc}</p>
          <div className="p-4 bg-black rounded border border-secondary mb-4">
            <h3 className="mb-0">
              Desde <span className="text-primary">${planActual.precio}</span>
              /mes
            </h3>
          </div>
        </Col>

        <Col lg={6}>
          <Card className="bg-dark text-light border-secondary p-4 shadow-lg">
            <Card.Title className="text-center mb-4">
              SOLICITAR MÁS INFORMACIÓN
            </Card.Title>
            <Form ref={form} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  required
                  placeholder="Juan Pérez"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  required
                  placeholder="juan@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono de Contacto</Form.Label>
                <Form.Control
                  type="tel"
                  name="user_phone"
                  required
                  placeholder="381..."
                />
              </Form.Group>

              {/* Input oculto para que EmailJS sepa de qué plan es la consulta */}
              <input type="hidden" name="plan_type" value={planActual.titulo} />

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold py-3 mt-3"
              >
                ENVIAR CONSULTA
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanDetail;
