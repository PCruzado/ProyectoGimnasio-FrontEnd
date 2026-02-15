
import Hero from '../home/Hero'; // Subimos un nivel para entrar a home
import Weather from '../home/Weather'; 
import Plans from '../home/Plans';
import Services from '../home/Services';
import Staff from '../home/Staff';
import Testimonials from '../home/Testimonials';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* 1. El Hero es el que más espacio visual ocupa */}
      <Hero /> 

      <Container className="py-5">
        {/* 2. El widget del clima (revisá que no esté vacío) */}
        <Weather /> 

        {/* 3. El resto de las secciones */}
        <section className="my-5">
            <h2 className="text-center mb-4">Nuestros Servicios</h2>
            <Services />
        </section>

        <section className="my-5">
            <h2 className="text-center mb-4">Planes de Entrenamiento</h2>
            <Plans />
        </section>

        <section className="my-5">
            <h2 className="text-center mb-4">Nuestro Staff</h2>
            <Staff />
        </section>

        <section className="my-5">
            <h2 className="text-center mb-4">Lo que dicen nuestros clientes</h2>
            <Testimonials />
        </section>
      </Container>
    </>
  );
};

export default Home;