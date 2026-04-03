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
  ListGroup
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const DISCIPLINAS = ["Yoga", "Crossfit", "Zumba", "Spinning", "Musculación", "Boxeo", "Powerlifting", "HIIT", "Ritmo", "Pilates"];
const STAFF = ["Franco Díaz", "Lucía Torres", "Marcos Ruiz", "Sofía Luna", "Pedro Picapiedra"];
const CATEGORIAS = ["Suplementos", "Indumentaria", "Accesorios", "Equipamiento"];

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [usuarios, setUsuarios] = useState([]);
  const [clases, setClases] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("clases");
  const [selectedId, setSelectedId] = useState(null);
  const [showInscriptosModal, setShowInscriptosModal] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

const handleOpenInscriptos = (clase) => {
    if (!clase.usuariosInscriptos || clase.usuariosInscriptos.length === 0) {
      Swal.fire({
        title: "Clase vacía",
        text: "No hay alumnos inscriptos en esta clase todavía.",
        icon: "info",
        confirmButtonColor: "#ff4d00", 
      });
      return; 
    }

    setClaseSeleccionada(clase);
    setShowInscriptosModal(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));
  const token = loggedUser?.token;

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const [resUsers, resClases, resProds] = await Promise.all([
        axios.get(`${API_URL}/api/usuarios`, config),
        axios.get(`${API_URL}/api/clases`),
        axios.get(`${API_URL}/api/productos`),
      ]);
      setUsuarios(resUsers.data);
      setClases(resClases.data);
      setProductos(resProds.data);
    } catch (e) {
      console.error("Error al cargar datos", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditMode(true);
      setSelectedId(item._id);
      reset(item);
    } else {
      setEditMode(false);
      setSelectedId(null);
      reset(activeTab === "clases" 
        ? { nombreClase: "", profesor: "", fecha: "", horario: "" }
        : { nombre: "", precio: "", categoria: "", imagen: "", descripcion: "" }
      );
    }
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (editMode) {
        await axios.put(`${API_URL}/api/${activeTab}/${selectedId}`, data, config);
      } else {
        await axios.post(`${API_URL}/api/${activeTab}`, data, config);
      }
      setShowModal(false);
      fetchData();
      Swal.fire("¡Éxito!", "Los cambios fueron procesados en Rolling Gym.", "success");
    } catch (error) {
      const errorMsg = error.response?.data?.mensaje || "No se pudo guardar la información. Por favor, revisá los campos.";
      Swal.fire("Error de Servidor", errorMsg, "error");
    }
  };

  const handleDelete = async (id, endpoint) => {
    const result = await Swal.fire({
      title: "¿Borrar este registro?",
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

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />;

  return (
    <Container className="py-5 mt-5 text-light">
      <div className="mb-5 p-4 bg-black rounded-4 border border-secondary shadow">
        <h1 className="display-6 fw-bold">Hola, <span className="text-primary">{loggedUser?.nombre}</span>!</h1>
        <p className="text-secondary mb-0">Gestión de Rolling Gym v1.2.1 | San Miguel de Tucumán</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-uppercase m-0">Panel <span className="text-primary">Admin</span></h2>
        {activeTab !== "usuarios" && (
          <Button variant="primary" className="fw-bold px-4 shadow" onClick={() => handleOpenModal()}>
            + NUEVA {activeTab.toUpperCase().slice(0, -1)}
          </Button>
        )}
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4" justify>
        <Tab eventKey="clases" title="CLASES">
            {}
            <Table responsive variant="dark" hover className="mt-3">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Profesor</th>
                <th>Horario</th>
                <th>Inscriptos</th> 
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((c) => (
                <tr key={c._id}>
                  <td><Badge bg="primary">{c.nombreClase || c.nombre}</Badge></td>
                  <td>{c.profesor?.nombre || c.profesor}</td>
                  <td>{c.fecha} - {c.horario}hs</td>
                  <td className="align-middle">
                    <span className="me-2">{c.usuariosInscriptos?.length || 0} alumnos</span>
                    <Button 
                      variant="outline-info" 
                      size="sm" 
                      onClick={() => handleOpenInscriptos(c)}
                      disabled={!c.usuariosInscriptos || c.usuariosInscriptos.length === 0}
                    >
                      <i className="bi bi-eye"></i> Ver
                    </Button>
                  </td>
                  
                  <td>
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleOpenModal(c)}><i className="bi bi-pencil"></i></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c._id, "clases")}><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="usuarios" title="USUARIOS">
            {}
            <Table responsive variant="dark" hover className="mt-3">
            <thead><tr><th>Nombre</th><th>Email</th><th>Plan</th><th>Acciones</th></tr></thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}><td>{u.nombre} {u.apellido}</td><td>{u.email}</td><td><Badge bg="secondary">{u.planContratado}</Badge></td>
                <td><Button variant="outline-danger" size="sm" onClick={() => handleDelete(u._id, "usuarios")}><i className="bi bi-trash"></i></Button></td></tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="productos" title="PRODUCTOS">
            <Table responsive variant="dark" hover className="mt-3">
            <thead><tr><th>Producto</th><th>Precio</th><th>Categoría</th><th>Acciones</th></tr></thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p._id}><td>{p.nombre}</td><td className="text-primary fw-bold">${p.precio}</td><td>{p.categoria}</td>
                <td><Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleOpenModal(p)}><i className="bi bi-pencil"></i></Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id, "productos")}><i className="bi bi-trash"></i></Button></td></tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark text-light border-secondary">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="fw-bold">{editMode ? "EDITAR" : "CREAR"} {activeTab.toUpperCase().slice(0, -1)}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Modal.Body>
            {activeTab === "clases" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Disciplina (Clase)</Form.Label>
                  <Form.Select 
                    isInvalid={!!errors.nombreClase} 
                    {...register("nombreClase", { required: "Por favor, seleccione una disciplina válida" })} 
                    className="bg-black text-light border-secondary"
                  >
                    <option value="">Seleccioná...</option>
                    {DISCIPLINAS.map(d => <option key={d} value={d}>{d}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.nombreClase?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Profesor</Form.Label>
                  <Form.Select 
                    isInvalid={!!errors.profesor} 
                    {...register("profesor", { required: "Por favor, seleccione un profesor válido" })} 
                    className="bg-black text-light border-secondary"
                  >
                    <option value="">Seleccioná...</option>
                    {STAFF.map(s => <option key={s} value={s}>{s}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.profesor?.message}</Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" isInvalid={!!errors.fecha} {...register("fecha", { required: "La fecha es obligatoria" })} className="bg-black text-light border-secondary" />
                        <Form.Control.Feedback type="invalid">{errors.fecha?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Hora</Form.Label>
                        <Form.Control type="time" isInvalid={!!errors.horario} {...register("horario", { required: "El horario es obligatorio" })} className="bg-black text-light border-secondary" />
                        <Form.Control.Feedback type="invalid">{errors.horario?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control 
                    isInvalid={!!errors.nombre} 
                    {...register("nombre", { 
                        required: "El nombre es obligatorio", 
                        minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
                        validate: (val) => val.trim() !== "" || "No se permiten campos vacíos"
                    })} 
                    className="bg-black text-light border-secondary" 
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control 
                    type="number" 
                    step="0.01" 
                    isInvalid={!!errors.precio} 
                    {...register("precio", { 
                        required: "El precio es obligatorio", 
                        min: { value: 0.01, message: "El precio debe ser un valor positivo y mayor a cero" } 
                    })} 
                    className="bg-black text-light border-secondary" 
                  />
                  <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select isInvalid={!!errors.categoria} {...register("categoria", { required: "Seleccioná una categoría" })} className="bg-black text-light border-secondary">
                    <option value="">Seleccionar...</option>
                    {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.categoria?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Imagen URL</Form.Label>
                  <Form.Control isInvalid={!!errors.imagen} {...register("imagen", { required: "La URL es obligatoria" })} className="bg-black text-light border-secondary" />
                  <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3} isInvalid={!!errors.descripcion} {...register("descripcion", { required: "Escribí una descripción detallada" })} className="bg-black text-light border-secondary" />
                  <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="outline-light" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting} className="fw-bold px-4 shadow">
              {isSubmitting ? "Guardando..." : "GUARDAR CAMBIOS"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showInscriptosModal} onHide={() => setShowInscriptosModal(false)} centered contentClassName="bg-dark text-light border-secondary">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="fw-bold">
            Alumnos inscriptos: <span className="text-primary">{claseSeleccionada?.nombreClase || claseSeleccionada?.nombre}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {claseSeleccionada?.usuariosInscriptos?.length > 0 ? (
            <ListGroup variant="flush">
              {claseSeleccionada.usuariosInscriptos.map(alumno => (
                <ListGroup.Item key={alumno._id} className="bg-dark text-light border-secondary d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-primary">{alumno.nombre} {alumno.apellido}</strong><br/>
                    <small className="text-muted">{alumno.email}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted text-center my-4">Aún no hay alumnos inscriptos en esta clase.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-light" onClick={() => setShowInscriptosModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;