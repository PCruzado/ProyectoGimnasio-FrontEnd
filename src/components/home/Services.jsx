import { Row, Col, Card } from "react-bootstrap";
import "../style/services.css";

const Services = () => {
  const servicios = [
    {
      id: 1,
      titulo: "Zona de Pesas",
      desc: "Maquinaria de última generación y zona de peso libre completa.",
      icon: "bi-card-checklist",
    },
    {
      id: 2,
      titulo: "Clases Grupales",
      desc: "Yoga, Zumba, Pilates y más con los mejores instructores.",
      icon: "bi-people",
    },
    {
      id: 3,
      titulo: "Área de Cardio",
      desc: "Cintas, elípticas y bicicletas con monitoreo de rendimiento.",
      icon: "bi-lightning-charge",
    },
    {
      id: 4,
      titulo: "Vestuarios & Duchas",
      desc: "Instalaciones amplias, seguras y siempre higienizadas.",
      icon: "bi-shield-check",
    },
  ];

  return (
    <Row className="gy-4 py-5 text-center">
      {servicios.map((s) => (
        <Col key={s.id} xs={6} lg={3}>
          <div className="service-item p-4 h-100">
            <div className="icon-box mb-3 mx-auto">
              <i className={`bi ${s.icon}`}></i>
            </div>
            <h4 className="fw-bold">{s.titulo}</h4>
            <p className="small">{s.desc}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Services;
