import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Tabs,
  Tab,
  Badge,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  // Estados de datos
  const [usuarios, setUsuarios] = useState([]);
  const [clases, setClases] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados del Modal
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("clases");
  const [formData, setFormData] = useState({});

  // Auth
  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));
  const token = loggedUser?.token;

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // En lugar de Promise.all, usamos try/catch individuales
    try {
      const resUsers = await axios.get(`${API_URL}/api/usuarios`, config);
      setUsuarios(resUsers.data);
    } catch (e) {
      console.error("Error en Usuarios", e);
    }

    try {
      const resClases = await axios.get(`${API_URL}/api/clases`);
      setClases(resClases.data);
    } catch (e) {
      console.error("Error en Clases", e);
      Swal.fire(
        "Aviso",
        "El servidor de clases está caído temporalmente.",
        "warning",
      );
    }

    try {
      const resProds = await axios.get(`${API_URL}/api/productos`);
      setProductos(resProds.data);
    } catch (e) {
      console.error("Error en Productos", e);
    }

    setLoading(false);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditMode(true);
      setFormData(item);
    } else {
      setEditMode(false);
      // Inicializar según el tab activo
      if (activeTab === "clases")
        setFormData({ nombre: "", profesor: "", fecha: "", hora: "" });
      if (activeTab === "productos")
        setFormData({ nombre: "", precio: "", categoria: "", imagen: "" });
    }
    setShowModal(true);
  };

  const handleDelete = async (id, endpoint) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d00",
      confirmButtonText: "Sí, borrar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/${endpoint}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        Swal.fire("Eliminado", "", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (editMode) {
        await axios.put(
          `${API_URL}/api/${activeTab}/${formData._id}`,
          formData,
          config,
        );
      } else {
        await axios.post(`${API_URL}/api/${activeTab}`, formData, config);
      }
      setShowModal(false);
      fetchData();
      Swal.fire("¡Éxito!", "Cambios guardados", "success");
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema", "error");
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
    <Container className="py-5 mt-5 text-light">
      {/* SECCIÓN BIENVENIDA (Requerimiento) */}
      <div className="mb-5 p-4 bg-black rounded-4 border border-secondary shadow">
        <h1 className="display-6 fw-bold">
          Hola, <span className="text-primary">{loggedUser?.nombre}</span>!
        </h1>
        <p className="text-secondary mb-0">
          Gestión de Rolling Gym v1.0.8 | San Miguel de Tucumán
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-uppercase m-0">
          Panel de <span className="text-primary">Administración</span>
        </h2>
        {activeTab !== "usuarios" && (
          <Button
            variant="primary"
            className="fw-bold"
            onClick={() => handleOpenModal()}
          >
            + NUEVA {activeTab.toUpperCase().slice(0, -1)}
          </Button>
        )}
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="custom-tabs mb-4"
        justify
      >
        {/* CRUD CLASES */}
        <Tab eventKey="clases" title="CLASES">
          <Table responsive variant="dark" hover className="align-middle mt-3">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Profesor</th>
                <th>Fecha/Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((c) => (
                <tr key={c._id}>
                  <td>{c.nombre}</td>
                  <td>{c.profesor}</td>
                  <td>
                    {c.fecha} - {c.hora}hs
                  </td>
                  <td>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal(c)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(c._id, "clases")}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* CRUD USUARIOS */}
        <Tab eventKey="usuarios" title="USUARIOS">
          <Table responsive variant="dark" hover className="align-middle mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Plan</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td>
                    {u.nombre} {u.apellido}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.telefono}</td>
                  <td>
                    <Badge bg="primary">{u.planContratado}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(u._id, "usuarios")}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* CRUD PRODUCTOS (Optativo) */}
        <Tab eventKey="productos" title="PRODUCTOS">
          <Table responsive variant="dark" hover className="align-middle mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td className="text-primary fw-bold">${p.precio}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal(p)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(p._id, "productos")}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* MODAL DINÁMICO PARA CLASES Y PRODUCTOS */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="bg-dark text-light border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary"
        >
          <Modal.Title>
            {editMode ? "Editar" : "Crear"} {activeTab.slice(0, -1)}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                required
                className="bg-black text-light border-secondary"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            </Form.Group>

            {activeTab === "clases" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Profesor</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="bg-black text-light border-secondary"
                    value={formData.profesor || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, profesor: e.target.value })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        required
                        className="bg-black text-light border-secondary"
                        value={formData.fecha || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, fecha: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Hora</Form.Label>
                      <Form.Control
                        type="time"
                        required
                        className="bg-black text-light border-secondary"
                        value={formData.hora || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, hora: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    className="bg-black text-light border-secondary"
                    value={formData.precio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, precio: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen URL</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="bg-black text-light border-secondary"
                    value={formData.imagen || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, imagen: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ej: Proteína de suero de leche de alta pureza..."
                    required
                    className="bg-black text-light border-secondary"
                    value={formData.descripcion || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="outline-light" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Admin;
