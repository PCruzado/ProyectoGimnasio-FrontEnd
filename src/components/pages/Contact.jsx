import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Nombre y Apellido
    const nombreStr = formData.nombre.trim();
    if (!nombreStr) {
      newErrors.nombre = "Por favor, ingresá tu nombre.";
    } else if (nombreStr.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else if (nombreStr.length > 50) {
      newErrors.nombre = "El nombre no puede exceder los 50 caracteres.";
    }

    // Email
    const emailStr = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailStr) {
      newErrors.email = "Por favor, ingresá tu correo electrónico.";
    } else if (!emailRegex.test(emailStr)) {
      newErrors.email = "Ingresá un correo electrónico válido.";
    }

    // Asunto
    if (!formData.asunto) {
      newErrors.asunto = "Seleccioná el motivo de tu contacto.";
    }

    // Mensaje
    const mensajeStr = formData.mensaje.trim();
    if (!mensajeStr) {
      newErrors.mensaje = "El mensaje no puede estar vacío.";
    } else if (mensajeStr.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    } else if (mensajeStr.length > 500) {
      newErrors.mensaje = "El mensaje no puede exceder los 500 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    Swal.fire({
      title: "¡Mensaje Enviado!",
      text: "Nos pondremos en contacto con vos a la brevedad.",
      icon: "success",
      confirmButtonColor: "#ff4d00"
    });
    
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    setErrors({});
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

              <Form noValidate onSubmit={handleSubmit}>
                {/* Nombre Completo - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label className="text-white fw-bold">Nombre y Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ej: Mario Pérez"
                    className="bg-dark text-light border-secondary shadow-sm"
                    value={formData.nombre}
                    onChange={handleChange}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="text-white fw-bold">Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="nombre@email.com"
                    className="bg-dark text-light border-secondary shadow-sm"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Asunto - Etiqueta en Blanco */}
                <Form.Group className="mb-3" controlId="formAsunto">
                  <Form.Label className="text-white fw-bold">Asunto</Form.Label>
                  <Form.Select
                    name="asunto"
                    className="bg-dark text-light border-secondary shadow-sm"
                    value={formData.asunto}
                    onChange={handleChange}
                    isInvalid={!!errors.asunto}
                  >
                    <option value="">Seleccioná una opción...</option>
                    <option value="planes">Consulta sobre Planes</option>
                    <option value="clases">Horarios de Clases</option>
                    <option value="otros">Otras Consultas</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.asunto}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Mensaje - Etiqueta en Blanco */}
                <Form.Group className="mb-4" controlId="formMensaje">
                  <Form.Label className="text-white fw-bold">Tu Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="mensaje"
                    rows={4}
                    placeholder="Escribí tu consulta aquí..."
                    className="bg-dark text-light border-secondary shadow-sm"
                    value={formData.mensaje}
                    onChange={handleChange}
                    isInvalid={!!errors.mensaje}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mensaje}
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