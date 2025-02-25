import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "@/styles/pages/Detalles.module.scss";
import play from "@/assets/Play.webp"
const Detalles: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const url = "https://image.tmdb.org/t/p/w500";
  const {perfil} = location.state?.perfil
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detalles_container}>
      <img src={`${url}${movie.poster_path}`} alt={movie.title} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div  className={styles.linkContainer}>
        <Link to="/video" state={{perfil}}>Ver trailer</Link>
        <img src={play} alt="Play"/>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
