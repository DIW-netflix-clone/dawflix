import React from 'react';
import { useLocation } from 'react-router-dom';

const Detalles: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie; // Accedemos a los detalles de la película pasados
  const url = "https://image.tmdb.org/t/p/w500"

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`${url}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      {/* Aquí puedes mostrar otros detalles de la película, como la sinopsis, fecha, etc. */}
    </div>
  );
};

export default Detalles;
