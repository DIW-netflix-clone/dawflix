import styles from "./InfoContainer.module.scss";

import { TMDB_IMAGE_URL } from "@/config";
import { Movie } from "@/types/TMDB/Movies";
import { Serie } from "@/types/TMDB/Series";
import { Link } from "react-router";

interface Props {
  data: Serie | Movie;
}

const InfoContainer = ({ data }: Props) => {
  return (
    <Link to={`/discover/movies/${data.id}`} className={styles.container}>
      <img src={`${TMDB_IMAGE_URL}${data.poster_path}`} alt="" />
    </Link>
  );
};

export default InfoContainer;
