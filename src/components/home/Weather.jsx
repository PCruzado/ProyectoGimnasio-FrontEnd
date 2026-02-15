import { useState, useEffect } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOTA: En un proyecto real, esto va en un archivo .env
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
    <Card className="my-4 border-0 shadow-sm bg-light text-dark">
      <Card.Body className="d-flex align-items-center justify-content-around">
        <div>
          <h5 className="mb-0">
            {weather.name}, {weather.sys.country}
          </h5>
          <p className="text-capitalize mb-0 text-muted">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="d-flex align-items-center">
          {/* Icono dinámico de OpenWeather */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h2 className="mb-0 fw-bold">{Math.round(weather.main.temp)}°C</h2>
        </div>
        <div className="d-none d-md-block text-end text-muted">
          <p className="mb-0">Humedad: {weather.main.humidity}%</p>
          <p className="mb-0">Viento: {weather.wind.speed} km/h</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Weather;
