import { Container, Row, Col } from "react-bootstrap";
import { 
  SiNike, 
  SiAdidas, 
  SiReebok, 
  SiUnderarmour, 
  SiPuma 
} from "react-icons/si";

const Brands = () => {
  const brands = [
    { name: "Nike", icon: <SiNike /> },
    { name: "Adidas", icon: <SiAdidas /> },
    { name: "Reebok", icon: <SiReebok /> },
    { name: "Under Armour", icon: <SiUnderarmour /> },
    { name: "Puma", icon: <SiPuma /> } // Cambiado aquí también
  ];

  return (
    <div className="bg-white py-5 mb-5 border-top border-bottom border-light">
      <Container>
        <h6 className="text-center text-muted text-uppercase mb-5 fw-bold" style={{ letterSpacing: '3px' }}>
          Nuestros Partners Oficiales
        </h6>
        <Row className="align-items-center justify-content-center g-5">
          {brands.map((brand, index) => (
            <Col key={index} xs={4} md={2} className="text-center">
              <div className="brand-icon-wrapper transition-all">
                {/* Renderizamos el componente del icono directamente */}
                <span className="display-4 text-secondary brand-icon">
                  {brand.icon}
                </span>
                <p className="small text-muted mt-2 d-none d-md-block">{brand.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Brands;