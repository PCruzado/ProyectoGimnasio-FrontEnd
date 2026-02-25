import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose }) => {
  // Estados para guardar los valores del formulario y los errores
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Función para actualizar los valores y limpiar errores al escribir
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Si hay un error en este campo, lo borramos al empezar a escribir
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  // Función que contiene la lógica de validación
  const validateForm = () => {
    const newErrors = {};

    // Validación del Correo
    if (!form.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Ingresa un correo válido (ej: nombre@correo.com)";
    }

    // Validación de la Contraseña
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // Si hay errores, actualizamos el estado para mostrarlos
      setErrors(formErrors);
    } else {
      // Si no hay errores, procedemos con el inicio de sesión
      console.log("Datos listos para enviar al backend:", form);
      // Aquí iría tu llamada a la API (ej: axios.post('/api/login', form))
      
      // Opcional: cerrar el modal después de un login exitoso
      // handleClose(); 
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-4">Iniciar Sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        <p className="text-muted mb-4">
          ¡Qué bueno verte de nuevo! Ingresa tus datos para continuar.
        </p>

        {/* Agregamos onSubmit al Form */}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              className="p-2"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email} // Pone el borde rojo si hay error
            />
            {/* Componente de Bootstrap que muestra el texto del error */}
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="fw-semibold mb-0">Contraseña</Form.Label>
              <a
                href="#forgot"
                className="text-decoration-none text-primary"
                style={{ fontSize: "0.85rem" }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              className="p-2"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!errors.password} // Pone el borde rojo si hay error
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3 py-2 fw-bold"
            style={{ borderRadius: "8px" }}
          >
            Ingresar
          </Button>

          <div className="text-center mt-3">
            <span className="text-muted" style={{ fontSize: "0.9rem" }}>
              ¿No tienes una cuenta?{" "}
            </span>
            <a href="#register" className="text-decoration-none fw-semibold">
              Regístrate aquí
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;