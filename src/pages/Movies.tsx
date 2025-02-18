import { getMovies } from "@/api/TMDB";
import InfoContainer from "@/components/InfoContainer";
import { MOVIE_ATOZ, MOVIE_POPULAR_SPAIN } from "@/config";
import styles from "@/styles/pages/movies.module.scss";

import { Movie } from "@/types/TMDB/Movies";
import { useEffect, useState } from "react";

const MoviesContainer = ({ movies }: { movies: Movie[] | null }) => {
  return (
    <div className={styles.seriesContainer}>
      {movies?.map(
        (movie) =>
          movie.poster_path && <InfoContainer key={movie.id} serie={movie} />
      )}
    </div>
  );
};

const Movies = () => {
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
    <div className={styles.container}>
      <h1>Series</h1>
      <MoviesContainer movies={series} />
      <h1>Popular in Spain</h1>
      <MoviesContainer movies={seriesPopularInSpain} />
      <h1>From A to Z</h1>
      <MoviesContainer movies={seriesAToZ} />
    </div>
  );
};

export default Movies;
