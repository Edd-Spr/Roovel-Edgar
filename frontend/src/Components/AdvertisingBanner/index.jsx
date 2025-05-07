import { motion } from 'framer-motion';
import Styles from './AdvertisingBanner.module.css';
import { Link} from 'react-router-dom';

export default function AdvertisingBanner({ title, description, image, color, closeBanner }) {   

    const handleContainerClick = () => {
        closeBanner(); // Cierra el modal si se hace clic fuera de AdvertisingBox
    };

    const handleBoxClick = (event) => {
        event.stopPropagation(); // Detiene la propagación del evento para que no cierre el modal
    };

    return (
        <motion.article 
            className={Styles.advertisingBannerContainer} 
            onClick={handleContainerClick}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: .5 }}
        >
            <section className={Styles.AdvertisingBox} onClick={handleBoxClick}>
                <img 
                    src="/Graphics/AdvertisingBannerImage1.png" 
                    alt="" 
                    className={Styles.advertisingBannerImage}
                    draggable="false" 
                />
                <div className={Styles.signInBannerBlur}></div>
                <section className={Styles.signInBannerInfo}>
                    <h1 className={Styles.signInTitle}>¿Tienes una habitación disponible?</h1>
                    <p className={Styles.signInDescription}>Publica tu habitación fácilmente y encuentra al roomie ideal. Regístrate gratis y empieza a recibir solicitudes hoy mismo.</p>
                    <button 
                        className={Styles.signUpButton}
                        onClick={closeBanner}
                        >Cancelar</button>
                    
                    <Link to={'/auth?signup=true'}>
                        <button className={Styles.signInButton}>Registrate</button>
                    </Link>
                    
                </section>
            </section>
        </motion.article>
    );
}