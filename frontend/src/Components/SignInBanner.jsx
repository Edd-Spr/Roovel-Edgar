import '../Styles/SignInBanner.css';

const SignInBanner = () => {
    return (
        <article className="signInBannerContainer">
            <div className="signInBanner">
                <img 
                    src="/Graphics/SignInImage.png" 
                    alt="" 
                    style={{width: '100%', marginBottom: '10vh'}}
                    draggable="false" 
                />
                <div className="signInBannerBlur"></div>
                <section className='signInBannerInfo'>
                    <h1 className='signInTitle'>Tu proximo roomie a un click de distancia</h1>
                    <p className="signInDescription">Las mejores habitaciones y roomies te están esperando. Inicia sesión para encontrarlos.</p>
                    <button className="signInButton">Iniciar Sesión</button>
                    <button className="signUpButton">Registrarse</button>
                </section>

            </div>
        </article>
    );
}

export default SignInBanner;