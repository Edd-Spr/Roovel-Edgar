import { motion } from 'framer-motion';
import Styles from '../PropertyOverview.module.css';
import StylesSk from './PropertyOverviewSkeleton.module.css';

const fadeInOut = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const PropertyOverviewSkeleton = () => {
  return (
    <article className={Styles['property-overview__overlay']}>
      <motion.section
        className={Styles['property-overview__box-container']}
        variants={fadeInOut}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        {/* Imágenes */}
        <section className={Styles['property-overview__images-container']}>
          <motion.div
            variants={fadeInOut}
            className={`${Styles['images-container__main-image__container']} ${StylesSk['skeleton']} ${StylesSk['skeleton-main']}`}
          />
          <div className={Styles['images-container-4']}>
            {[1, 2, 3, 4].map((_, i) => (
              <motion.div
                key={i}
                variants={fadeInOut}
                className={`${Styles['images-container__image__container']} ${StylesSk['skeleton']} ${StylesSk['skeleton-thumb']}`}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              />
            ))}
          </div>
        </section>

        {/* Info */}
        <section className={Styles['property-overview__info-container']}>
          <motion.div
            variants={fadeInOut}
            className={StylesSk['text__container']}
            transition={{ duration: 0.4 }}
          >
            <div className={`${StylesSk['skeleton-text']} ${StylesSk['skeleton']}`} />
            <div className={`${StylesSk['skeleton-text']} ${StylesSk['skeleton']}`} />
          </motion.div>

          <div className={Styles['info-container__rigth__container']}>
            <div className={Styles['info-container__rigth__buttons-container']}>
              {[1, 2, 3, 4].map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeInOut}
                  className={`${Styles['info-container__rigth__button']} ${StylesSk['skeleton']} ${StylesSk['skeleton-button']}`}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                />
              ))}
            </div>
            <motion.div
              variants={fadeInOut}
              className={`${Styles['info-container__rigth__map-container']} ${StylesSk['skeleton']} ${StylesSk['skeleton-map']}`}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>
        </section>
      </motion.section>
    </article>
  );
};

export default PropertyOverviewSkeleton;