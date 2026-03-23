import React from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const PlanDetail = () => {
  const { id } = useParams();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    mode: "onTouched" 
  });

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

  const onSubmit = (data) => {
    // EmailJS recibe los datos ya limpios por las validaciones de RHF
    const templateParams = {
      user_name: data.user_name.trim(),
      user_email: data.user_email.trim(),
      user_phone: data.user_phone.trim(),
      plan_type: planActual.titulo,
      plan_price: planActual.precio,
      to_email: data.user_email.trim(), 
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          title: "¡Consulta Enviada!",
          text: "Te enviaremos la info a la brevedad. ¡Nos vemos en el gym!",
          icon: "success",
          confirmButtonColor: "#ff4d00"
        });
        reset();
      })
      .catch((err) => {
        console.error("Error:", err);
        Swal.fire("Error", "No se pudo procesar tu consulta.", "error");
      });
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="gy-4 align-items-center">
        <Col lg={6}>
          <h1 className="display-4 fw-bold text-primary text-uppercase">
            {planActual.titulo}
          </h1>
          <p className="lead text-light mb-4">{planActual.desc}</p>
          <div className="p-4 bg-black rounded border border-secondary mb-4 shadow">
            <h3 className="mb-0 text-white">
              Desde <span className="text-primary">${planActual.precio}</span> /mes
            </h3>
          </div>
        </Col>

        <Col lg={6}>
          <Card className="bg-black border-secondary p-4 shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-white fw-bold">
                SOLICITAR INFORMACIÓN
              </Card.Title>
              
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                
                {/* NOMBRE Y APELLIDO: Longitud y Limpieza */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Nombre y Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    className="bg-dark text-light border-secondary"
                    isInvalid={!!errors.user_name}
                    {...register("user_name", { 
                      required: "El nombre es obligatorio",
                      minLength: { value: 3, message: "Mínimo 3 caracteres" },
                      maxLength: { value: 10, message: "Máximo 10 caracteres" },
                      validate: (value) => value.trim() !== "" || "No puede contener solo espacios"
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* EMAIL: Lógica de validación robusta (Regex) */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nombre@email.com"
                    className="bg-dark text-light border-secondary"
                    isInvalid={!!errors.user_email}
                    {...register("user_email", { 
                      required: "El email es obligatorio",
                      pattern: {
                        // Regex estricto para evitar texto plano o formatos rotos
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Ingresá un formato de correo válido (ej@dominio.com)"
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* TELÉFONO: Control de longitud */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Teléfono de Contacto</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="381..."
                    className="bg-dark text-light border-secondary"
                    isInvalid={!!errors.user_phone}
                    {...register("user_phone", { 
                      required: "El teléfono es necesario para contactarte",
                      minLength: { value: 7, message: "Debe tener al menos 7 números" },
                      maxLength: { value: 15, message: "Número demasiado largo" },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Solo se permiten números"
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold py-3 mt-3 shadow"
                >
                  ENVIAR CONSULTA
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanDetail;