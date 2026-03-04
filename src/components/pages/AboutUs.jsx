import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { member1, member2, member3, member4, member5, member6} from "../assets/team";

const AboutUs = () => {
  const equipo = [
    {
      nombre: "Facundo Vera",
      rol: "Frontend Developer",
      ig: "facundovera647",
      github: "LynxWiLd",
      foto: member1,
    },
    {
      nombre: "Pablo Cruzado",
      rol: "Backend Developer",
      ig: "Pablitocruzado",
      github: "PCruzado",
      foto: member2,
    },
    {
      nombre: "Marcos Molina",
      rol: "Frontend Developer",
      ig: "__molinamarcos__",
      github: "Molina-MarcosLautaro",
      foto: member3,
    },
    {
      nombre: "Nicolas Anton Bulacio",
      rol: "Backend Developer",
      ig: "404",
      github: "nicolasbulacio",
      foto: member4,
    },
    {
      nombre: "Matias Jose Vivanco",
      rol: "Frontend Developer",
      ig: "404",
      github: "",
      foto: member5,
    },
    {
      nombre: "Morena Gonzalez",
      rol: "Frontend Developer",
      ig: "404",
      github: "",
      foto: member6,
    },
    
  ];

  return (
    <Container className="py-5 text-light">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-primary text-uppercase">
            Nuestro Equipo
          </h1>
          <p className="lead text-secondary">
            "Unidos por el código, motivados por el fitness. Desarrollamos
            soluciones que transforman vidas."
          </p>
        </Col>
      </Row>

      <Row className="gy-4">
        {equipo.map((miembro, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="bg-black border-secondary h-100 text-center shadow-lg hover-card transition-all">
              <div className="pt-4 d-flex justify-content-center">
                <div
                  style={{ width: "150px", height: "150px" }}
                  className="position-relative"
                >
                  <Image
                    src={miembro.foto}
                    roundedCircle
                    className="border border-3 border-primary shadow-sm"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={miembro.nombre}
                  />
                </div>
              </div>

              <Card.Body>
                <Card.Title className="text-light s-4">
                  {miembro.nombre}
                </Card.Title>
                <Card.Text className="text-primary small fw-bold text-uppercase tracking-wider">
                  {miembro.rol}
                </Card.Text>

                <div className="mt-4 d-flex justify-content-center gap-3">
                  <a
                    href={`https://github.com/${miembro.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover-primary transition-all"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                  <a
                    href={`https://instagram.com/${miembro.ig}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover-primary transition-all"
                  >
                    <i className="bi bi-instagram fs-4"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;
