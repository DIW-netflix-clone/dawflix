import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "@/styles/pages/Detalles.module.scss";
const Detalles: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const url = "https://image.tmdb.org/t/p/w500";

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detalles_container}>
      <img src={`${url}${movie.poster_path}`} alt={movie.title} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Detalles;
