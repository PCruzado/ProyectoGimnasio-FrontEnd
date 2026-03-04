import { useParams, useNavigate } from "react-router";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { staff1, staff2, staff3, staff4 } from "../assets/staff";

const StaffDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profesores = [
    {
      id: 1,
      nombre: "Franco Díaz",
      especialidad: "Musculación & Powerlifting",
      imagen: staff1,
      bio: "Especialista con más de 10 años entrenando atletas de alto rendimiento en Tucumán. Su enfoque se basa en la biomecánica aplicada a la fuerza y la optimización del rendimiento físico.",
      certificaciones: [
        "Grado en Ed. Física",
        "Certificación NASM",
        "Atleta Pro Powerlifting",
      ],
      horario: "Lunes a Viernes: 08:00 - 12:00",
    },
    {
      id: 2,
      nombre: "Lucía Torres",
      especialidad: "Yoga & Pilates",
      imagen: staff2,
      bio: "Apasionada por el movimiento consciente. Lucía combina técnicas milenarias de Yoga con el control postural del Pilates para mejorar la flexibilidad y reducir el estrés diario de nuestros socios.",
      certificaciones: [
        "Instructorado Yoga Alliance",
        "Especialista en Pilates Reformer",
        "Terapeuta Corporal",
      ],
      horario: "Martes y Jueves: 09:00 - 11:00 | 18:00 - 20:00",
    },
    {
      id: 3,
      nombre: "Marcos Ruiz",
      especialidad: "Crossfit & HIIT",
      imagen: staff3,
      bio: "Ex-competidor de artes marciales reconvertido al entrenamiento funcional. Marcos es conocido por su alta energía y por empujar a cada alumno a superar sus propios límites en cada WOD.",
      certificaciones: [
        "CrossFit Level 2 Trainer",
        "Especialista HIIT (High Intensity)",
        "Nutrición Deportiva",
      ],
      horario: "Lunes, Miércoles y Viernes: 14:00 - 18:00",
    },
    {
      id: 4,
      nombre: "Sofía Luna",
      especialidad: "Zumba & Ritmos",
      imagen: staff4,
      bio: "Bailarina profesional con el objetivo de hacer del ejercicio una fiesta. Sofía transforma la quema de calorías en una experiencia divertida y motivadora para todas las edades.",
      certificaciones: [
        "Zumba Education Specialist (ZES)",
        "Profesorado de Danzas Modernas",
        "Animación Rítmica",
      ],
      horario: "Lunes a Jueves: 19:00 - 21:00",
    },
  ];

  const profe = profesores.find((p) => p.id === parseInt(id));

  if (!profe)
    return (
      <div className="text-center text-light py-5">Profesor no encontrado</div>
    );

  return (
    <Container className="py-5 mt-5 text-light">
      <Button
        variant="outline-primary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Volver al Staff
      </Button>
      <Row className="align-items-center bg-black p-4 rounded-4 border border-secondary shadow-lg">
        <Col md={5} className="text-center mb-4 mb-md-0">
          <img
            src={profe.imagen}
            alt={profe.nombre}
            className="img-fluid rounded-3 border border-primary shadow"
            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col md={7} className="ps-md-5">
          <h1 className="display-4 fw-bold text-primary text-uppercase">
            {profe.nombre}
          </h1>
          <h3 className="text-secondary mb-4">{profe.especialidad}</h3>

          <p className="lead mb-4">{profe.bio}</p>

          <div className="mb-4">
            <h5 className="text-primary mb-3">Certificaciones:</h5>
            {profe.certificaciones.map((cert, i) => (
              <Badge
                key={i}
                bg="dark"
                className="border border-primary me-2 p-2 px-3 mb-2"
              >
                {cert}
              </Badge>
            ))}
          </div>

          <div className="bg-dark p-3 rounded-3 border-start border-primary border-4">
            <h6 className="mb-1 text-uppercase text-secondary">
              Horarios de Clase:
            </h6>
            <p className="mb-0 fw-bold">{profe.horario}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffDetail;
