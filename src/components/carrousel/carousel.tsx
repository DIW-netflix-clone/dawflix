import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Carousel.module.scss";
import { getMovies } from "@/api/TMDB";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [images, setImages] = useState<any[]>([]); // Agregamos el tipo any[] para evitar errores de tipado
  const url:string  = "https://image.tmdb.org/t/p/original/";
  const ObtainImages = async () => {
    const movies = await getMovies();
    setImages(movies);
  };

  useEffect(() => {
    ObtainImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__button_prev} onClick={prevSlide}>
        &lt;
      </button>
      <div className={styles.carousel__container}>
        <div className={styles.carousel__title}>{images[currentIndex].title}</div>
        <div className={styles.carousel__slide}>
          <img
            src={`${url}${images[currentIndex].backdrop_path}`}
            alt={`Slide ${currentIndex}`}
            className={styles.carousel__image}
          />
        </div>
      </div>
      <button className={styles.carousel__button_next} onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
