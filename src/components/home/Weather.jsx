import { useState, useEffect } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CITY = "San Miguel de Tucuman,AR";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=es&appid=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener el clima");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto my-4"
      />
    );
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Card 
      className="my-4 border border-secondary shadow-lg bg-black text-light mx-auto" 
      style={{ borderRadius: '12px', maxWidth: '900px' }}
    >
      <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-around p-4">
        
        
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h5 className="mb-1 fw-bold text-primary">
            {weather.name}, {weather.sys.country}
          </h5>
          <p className="text-capitalize mb-0 text-secondary">
            {weather.weather[0].description}
          </p>
        </div>
        
       
        <div className="d-flex align-items-center mb-3 mb-md-0">
         
          <div 
            className="me-3 d-flex align-items-center justify-content-center" 
            style={{ 
              backgroundColor: 'rgba(255, 77, 0, 0.1)', 
              borderRadius: '50%', 
              width: '80px',
              height: '80px',
              boxShadow: '0 0 15px rgba(255, 77, 0, 0.2)'
            }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Ícono del clima"
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}
            />
          </div>
          <h2 className="mb-0 fw-bold display-5">{Math.round(weather.main.temp)}°C</h2>
        </div>

        
        <div className="d-none d-md-block text-end text-secondary small">
          <p className="mb-2">
            <i className="bi bi-droplet-half text-primary me-2"></i>
            Humedad: {weather.main.humidity}%
          </p>
          <p className="mb-0">
            <i className="bi bi-wind text-primary me-2"></i>
            Viento: {weather.wind.speed} km/h
          </p>
        </div>

      </Card.Body>
    </Card>
  );
};

export default Weather;