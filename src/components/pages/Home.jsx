
import Hero from '../home/Hero'; // Subimos un nivel para entrar a home
import Weather from '../home/Weather'; 
import Plans from '../home/Plans';
import Services from '../home/Services';
import Staff from '../home/Staff';
import Testimonials from '../home/Testimonials';
import Products from '../home/Products';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* 1. El Hero es el que más espacio visual ocupa */}
      <Hero /> 

      <Container id="clima" className="py-5">
        {/* 2. El widget del clima (revisá que no esté vacío) */}
        <Weather /> 

        {/* 3. El resto de las secciones */}
        <section id="servicios" className="my-5">
            <h2 className="text-center mb-4">Nuestros Servicios</h2>
            <Services />
        </section>

        <section id="planes" className="my-5">
            <h2 className="text-center mb-4">Planes de Entrenamiento</h2>
            <Plans />
        </section>

        <section id="staff" className="my-5">
            <h2 className="text-center mb-4">Nuestro Staff</h2>
            <Staff />
        </section>

        <section id="testimonios" className="my-5">
            <h2 className="text-center mb-4">Lo que dicen nuestros clientes</h2>
            <Testimonials />
        </section>
        <section>
          <h2 className="text-center mb-4">Productos Destacados</h2>
          <Products />
        </section>
      </Container>
    </>
  );
};

export default Home;