import React from 'react';
import { getMovies } from "@/api/TMDB";
import InfoContainer from "@/components/InfoContainer";
import { MOVIE_ATOZ, MOVIE_POPULAR_SPAIN } from "@/config";
import styles from "@/styles/pages/movies.module.scss";
import { useLocation, useNavigate } from 'react-router';
import { Movie } from "@/types/TMDB/Movies";
import { useEffect, useState } from "react";
import { UserProfile } from 'firebase/auth';

const MoviesContainer = ({ movies }: { movies: Movie[] | null }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const perfil = location.state.perfil || []

  const handleClick = (movie: Movie, userProfile: UserProfile) => {
    navigate('/detalles',{state:{movie, userProfile}})
  }

  return (
    <div className={styles.seriesContainer}>
      {movies?.map(
        (movie) =>
          movie.poster_path && (
            <div key={movie.id} onClick={() => handleClick(movie,perfil)}>
              <InfoContainer serie={movie} />
            </div>
          ))}
    </div>
  );
};

const Movies: React.FC = () => {
  
  const [series, setSeries] = useState<Movie[] | null>(null);
  const [seriesPopularInSpain, setSeriesPopularInSpain] = useState<
    Movie[] | null
  >(null);
  const [seriesAToZ, setSeriesAToZ] = useState<Movie[] | null>(null);
  const ObtainMovies = async () => {
    setSeries(await getMovies());
    setSeriesPopularInSpain(await getMovies(MOVIE_POPULAR_SPAIN));
    setSeriesAToZ(await getMovies(MOVIE_ATOZ));
  };
  
  useEffect(() => {
    ObtainMovies();
  }, []);

  

  return (
    <div>
      {/* Aquí puedes agregar el contenido relacionado con las películas */}
    <div className={styles.container}>
      <h1>Popular films in Daw<span>Flix</span></h1>
      <MoviesContainer movies={series} />
      <h1 className={styles.right}>Trending now</h1>
      <MoviesContainer movies={seriesAToZ} />
      <h1><span>Top 10</span> in Spain</h1>
      <MoviesContainer movies={seriesPopularInSpain} />
    </div>
    </div>
  );
};

export default Movies;