import React, { useState } from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  images: { src: string; title: string }[]; // Acepta una lista de imágenes con título
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__button_prev} onClick={prevSlide}>
        &lt;
      </button>
      <div className={styles.carousel__container}>
        <div className={styles.carousel__slide}>
          <img src={images[currentIndex].src} alt={`Slide ${currentIndex}`} className={styles.carousel__image} />
          <div className={styles.carousel__title}>{images[currentIndex].title}</div>
        </div>
      </div>
      <button className={styles.carousel__button_next} onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
