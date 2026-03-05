import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axios from "axios";

const LoginModal = ({ show, handleClose, onSwitchToRegister, onSuccess }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Ingresa un correo válido (ej: nombre@correo.com)";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await axios.post(`${API_URL}/api/usuarios/login`, {
          email: form.email,
          contrasena: form.password,
        });

        const loggedUser = response.data;

        localStorage.setItem("user-rolling-gym", JSON.stringify(loggedUser));

        onSuccess(loggedUser);

        handleClose();

        setTimeout(() => {
          Swal.fire({
            title: `¡Bienvenido, ${loggedUser.nombre}!`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          if (loggedUser.rol === "administrador") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 100);
      } catch (error) {
        const mensajeError =
          error.response?.data?.mensaje || "Error al iniciar sesión";
        console.error("Error en login:", error);
        Swal.fire({
          title: "Error",
          text: mensajeError,
          icon: "error",
          confirmButtonColor: "#ff4d00",
        });
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      restoreFocus={false}
      contentClassName="bg-black text-light border border-secondary shadow-lg"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-secondary pb-0"
      >
        <Modal.Title className="fw-bold fs-4 text-uppercase">
          Iniciar <span className="text-primary">Sesión</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4 mt-2">
        <p className="text-secondary mb-4">
          ¡Qué bueno verte de nuevo! Ingresa tus datos para continuar.
        </p>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold text-light">
              Correo Electrónico
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              className="p-2 bg-dark text-light border-secondary shadow-none"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="fw-semibold text-light mb-0">
                Contraseña
              </Form.Label>
              <a
                href="#forgot"
                className="text-decoration-none text-primary small"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              className="p-2 bg-dark text-light border-secondary shadow-none"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3 py-2 fw-bold text-uppercase"
            style={{ borderRadius: "8px" }}
          >
            Ingresar
          </Button>

          <div className="text-center mt-3">
            <span className="text-secondary small">
              ¿No tienes una cuenta?{" "}
            </span>
            <span
              className="text-primary fw-semibold small"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={onSwitchToRegister}
            >
              Regístrate aquí
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
