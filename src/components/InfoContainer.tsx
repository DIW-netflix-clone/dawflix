import styles from "./InfoContainer.module.scss";

import { TMDB_IMAGE_URL } from "@/config";
import { Serie } from "@/types/TMDB/Series";

interface Props {
  serie: Serie;
}

const InfoContainer = ({ serie }: Props) => {
  return (
    <div className={styles.container}>
      <img src={`${TMDB_IMAGE_URL}${serie.poster_path}`} alt="" />
    </div>
  );
};

export default InfoContainer;
