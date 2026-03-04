import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterModal = ({ show, handleClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    contrasena: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!form.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{10}$/.test(form.telefono)) {
      newErrors.telefono = "Ingresa un teléfono válido (10 dígitos)";
    }

    if (!form.email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (!form.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria";
    } else if (form.contrasena.length < 6) {
      newErrors.contrasena = "Debe tener al menos 6 caracteres";
    }

    if (form.contrasena !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/usuarios/registro",
          {
            nombre: form.nombre,
            apellido: "Garciariaga",
            telefono: form.telefono,
            email: form.email,
            contrasena: form.contrasena,
            planContratado: null,
            rol: "usuario",
          },
        );
      } catch(error) {

        const mensajeDelBack = error.response?.data?.mensaje || "Error inesperado";
        Swal.fire({
          title: "Error",
          text: mensajeDelBack,
          icon: "error",
          confirmButtonColor: "#ff4d00",
          timer: 3000,
        });
        return;
      }
      console.info("Datos de registro para el backend:", form);

      Swal.fire({
        title: "¡Cuenta Creada!",
        text: "Ya eres parte de Rolling Gym. Por favor, inicia sesión.",
        icon: "success",
        confirmButtonColor: "#ff4d00",
        timer: 3000,
      });

      // Limpiamos el formulario, cerramos este modal y abrimos el de Login
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        contrasena: "",
        confirmPassword: "",
      });
      onSwitchToLogin();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      contentClassName="bg-black text-light border border-secondary shadow-lg"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-secondary pb-0"
      >
        <Modal.Title className="fw-bold fs-4 text-uppercase">
          Crear <span className="text-primary">Cuenta</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4 mt-2">
        <p className="text-secondary mb-4">
          Únete a nuestra comunidad para gestionar tus planes y clases.
        </p>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="regNombre">
            <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Facundo Vera"
              className="p-2 bg-dark text-light border-secondary"
              value={form.nombre}
              onChange={(e) => setField("nombre", e.target.value)}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="regTelefono">
            <Form.Label className="fw-semibold">Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ej: 381 123-4567"
              className="p-2 bg-dark text-light border-secondary"
              value={form.telefono}
              onChange={(e) => setField("telefono", e.target.value)}
              isInvalid={!!errors.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="regEmail">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@correo.com"
              className="p-2 bg-dark text-light border-secondary"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="regPassword">
            <Form.Label className="fw-semibold">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mínimo 6 caracteres"
              className="p-2 bg-dark text-light border-secondary"
              value={form.contrasena}
              onChange={(e) => setField("contrasena", e.target.value)}
              isInvalid={!!errors.contrasena}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contrasena}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="regConfirmPassword">
            <Form.Label className="fw-semibold">
              Confirmar Contraseña
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Repite tu contraseña"
              className="p-2 bg-dark text-light border-secondary"
              value={form.confirmPassword}
              onChange={(e) => setField("confirmPassword", e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3 py-2 fw-bold"
            style={{ borderRadius: "8px" }}
          >
            REGISTRARME
          </Button>

          <div className="text-center mt-3">
            <span className="text-secondary small">
              ¿Ya tienes una cuenta?{" "}
            </span>
            {/* ESTE ES EL BOTÓN QUE CAMBIA AL LOGIN */}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={onSwitchToLogin}
            >
              Inicia sesión aquí
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
