import styles from "@/styles/pages/series.module.scss";
import { getSeries } from "@/api/TMDB";
import InfoContainer from "@/components/InfoContainer";
import { Serie } from "@/types/TMDB/Series";
import { useEffect, useState } from "react";
import { TV_ATOZ, TV_POPULAR_SPAIN } from "@/config";

const SeriesContainer = ({ series }: { series: Serie[] | null }) => {
  return (
    <div className={styles.seriesContainer}>
      {series?.map(
        (serie) =>
          serie.poster_path && <InfoContainer key={serie.id} serie={serie} />
      )}
    </div>
  );
};

const Series = () => {
  const [series, setSeries] = useState<Serie[] | null>(null);
  const [seriesPopularInSpain, setSeriesPopularInSpain] = useState<
    Serie[] | null
  >(null);
  const [seriesAToZ, setSeriesAToZ] = useState<Serie[] | null>(null);
  const ObtainSeries = async () => {
    setSeries(await getSeries());
    setSeriesPopularInSpain(await getSeries(TV_POPULAR_SPAIN));
    setSeriesAToZ(await getSeries(TV_ATOZ));
  };

  useEffect(() => {
    ObtainSeries();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Popular series in daw<span>flix</span></h1>
      <SeriesContainer series={series} />
      <h1 className={styles.right}>Trending now</h1>
      <SeriesContainer series={seriesAToZ} />
      <h1><span>Top 10</span> in Spain</h1>
      <SeriesContainer series={seriesPopularInSpain} />
    </div>
  );
};

export default Series;
