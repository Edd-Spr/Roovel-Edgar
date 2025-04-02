import Styles from './SignInBanner.module.css';

const SignInBanner = () => {
    return (
        <article className={Styles.signInBannerContainer}>
            <div className={Styles.signInBanner}>
                <img 
                    src="/Graphics/SignInImage.png" 
                    alt="" 
                    style={{width: '100%', marginBottom: '10vh'}}
                    draggable="false" 
                />
                <div className={Styles.signInBannerBlur}></div>
                <section className={Styles.signInBannerInfo}>
                    <h1 className={Styles.signInTitle}>Tu proximo roomie a un click de distancia</h1>
                    <p className={Styles.signInDescription}>Las mejores habitaciones y roomies te están esperando. Inicia sesión para encontrarlos.</p>
                    <button className={Styles.signInButton}>Iniciar Sesión</button>
                    <button className={Styles.signUpButton}>Registrarse</button>
                </section>

            </div>
        </article>
    );
}

export default SignInBanner;