import { getMovies } from "@/api/TMDB";
import InfoContainerMovies from "@/components/InfoContainerMovies";
import { MOVIE_ATOZ, MOVIE_POPULAR_SPAIN } from "@/config";
import styles from "@/styles/pages/movies.module.scss";

import { Movie } from "@/types/TMDB/Movies";
import { useEffect, useState } from "react";

const MoviesContainer = ({ movies }: { movies: Movie[] | null }) => {
  return (
    <div className={styles.seriesContainer}>
      {movies?.map(
        (movie) =>
          movie.poster_path && (
            <InfoContainerMovies key={movie.id} data={movie} />
          )
      )}
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [moviesPopularInSpain, setMoviesPopularInSpain] = useState<
    Movie[] | null
  >(null);
  const [moviesAToZ, setMoviesAToZ] = useState<Movie[] | null>(null);
  const ObtainMovies = async () => {
    setMovies(await getMovies());
    setMoviesPopularInSpain(await getMovies(MOVIE_POPULAR_SPAIN));
    setMoviesAToZ(await getMovies(MOVIE_ATOZ));
  };

  useEffect(() => {
    ObtainMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lastest updates</h1>
      <MoviesContainer movies={movies} />
      <h1>Popular in Spain</h1>
      <MoviesContainer movies={moviesPopularInSpain} />
      <h1>From A to Z</h1>
      <MoviesContainer movies={moviesAToZ} />
    </div>
  );
};

export default Movies;
