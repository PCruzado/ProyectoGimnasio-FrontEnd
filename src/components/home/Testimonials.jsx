import { Carousel} from 'react-bootstrap';
import '../style/testimonials.css';

const Testimonials = () => {
  const reviews = [
    { id: 1, user: "Juan Pérez", text: "El mejor gimnasio de Tucumán. Los profes son unos genios.", plan: "Plan Full" },
    { id: 2, user: "Marta Gómez", text: "Excelente limpieza y ambiente muy motivador.", plan: "Plan Musculación" },
    { id: 3, user: "Esteban Quito", text: "Las clases de Crossfit son de otro nivel. ¡Recomendado!", plan: "Plan Clases" }
  ];

  return (
    <div className="testimonials-section py-5 my-5">
      <Carousel indicators={true} interval={3000}>
        {reviews.map((r) => (
          <Carousel.Item key={r.id}>
            <div className="d-flex flex-column align-items-center text-center p-5">
              <blockquote className="blockquote mb-4">
                <p className="display-6 italic">"{r.text}"</p>
              </blockquote>
              <figcaption className="blockquote-footer text-primary fs-5">
                {r.user} <cite title="Source Title">({r.plan})</cite>
              </figcaption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;