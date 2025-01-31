import styles from "@/styles/pages/series.module.scss";

import { getSeries } from "@/api/TMDB";
import InfoContainer from "@/components/InfoContainer";
import { Serie } from "@/types/TMDB/Series";
import { useEffect, useState } from "react";

const Series = () => {
  const [series, setSeries] = useState<Serie[] | null>(null);
  const ObtainSeries = async () => {
    setSeries(await getSeries());
  };

  useEffect(() => {
    ObtainSeries();
  }, []);

  console.log(series);

  return (
    <div className={styles.container}>
      <h1>Series</h1>
      <div className={styles.seriesContainer}>
        {series?.map((serie) => (
          <InfoContainer key={serie.id} serie={serie} />
        ))}
      </div>
    </div>
  );
};

export default Series;
