import { Container, Table, Button, Tabs, Tab, Badge } from "react-bootstrap";
import Swal from "sweetalert2";

const Admin = () => {
  // Función de ejemplo para borrar (tus compañeros de Backend pondrán el fetch aquí)
  const handleDelete = (id, tipo) => {
    Swal.fire({
      title: `¿Borrar ${tipo}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d00",
      cancelButtonColor: "#343a40",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Borrando ${tipo} con ID: ${id}`);
        Swal.fire("Eliminado", `${tipo} ha sido borrado.`, "success");
      }
    });
  };

  return (
    <Container className="py-5 my-5 shadow-lg bg-black text-light rounded-4 border border-secondary">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <h2 className="fw-bold text-uppercase m-0">
          Panel de <span className="text-primary">Administración</span>
        </h2>
        <Button variant="primary" className="fw-bold">
          + NUEVO ITEM
        </Button>
      </div>

      <Tabs defaultActiveKey="usuarios" id="admin-tabs" className="mb-4 custom-tabs" justify>
        {/* --- TAB DE USUARIOS --- */}
        <Tab eventKey="usuarios" title="USUARIOS">
          <Table responsive variant="dark" hover className="align-middle border-secondary">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Facundo Vera</td>
                <td>facundo@rolling.com</td>
                <td><Badge bg="primary">Admin</Badge></td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-2">Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(1, 'Usuario')}>Borrar</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* --- TAB DE PRODUCTOS / CLASES --- */}
        <Tab eventKey="productos" title="PRODUCTOS">
          <Table responsive variant="dark" hover className="align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Proteína Whey</td>
                <td>$45.000</td>
                <td>Suplementos</td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-2">Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(2, 'Producto')}>Borrar</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* --- TAB DE PLANES --- */}
        <Tab eventKey="planes" title="PLANES">
          <Table responsive variant="dark" hover className="align-middle">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Mensualidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plan Full Musculación</td>
                <td>$12.500</td>
                <td><Badge bg="success">Activo</Badge></td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-2">Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(3, 'Plan')}>Borrar</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;