import styles from './CardImageSlider.module.css';
import rightArrow from '../../../../../public/Graphics/Icons/arrow_forward.png';
import leftArrow from '../../../../../public/Graphics/Icons/arrow_back.png';

export default function CardImageSlider({ Title, img, onPrevious, onNext, currentImgIndex, setIsPropertyOverviewOpen }) {
  return (
    <figure className={styles[`card-figure`]} onClick={() => setIsPropertyOverviewOpen(true)}>
      <button
        className={`${styles[`card-button`]} ${styles[`card-back`]}`}
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
      >
        <img
          className={styles[`card-arrow`]}
          src={leftArrow}
          alt="back"
        />
      </button>
      <img
        className={styles[`card-image`]}
        src={img}
        alt={`${Title} : Imagen ${currentImgIndex + 1}`}
      />
      <button
        className={`${styles[`card-button`]} ${styles[`card-forward`]}`}
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        <img
          className={styles[`card-arrow`]}
          src={rightArrow}
          alt="forward"
        />
      </button>
    </figure>
  );
}
