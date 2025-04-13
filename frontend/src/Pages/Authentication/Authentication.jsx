import Styles from './Authentication.module.css'
import InputForm from '../../Components/InputForm/InputForm';
import BounceLoader from "react-spinners/BounceLoader";
import ProfileCustomization from '../../Components/ProfileCustomization/ProfileCustomization';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';


const Authentication = () => {
    const [signInSignUp, setSignInSignUp] = useState(false);
    const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
    const [customizationStep, setCustomizationStep] = useState(false);

    return (
        <main className={Styles.authentication}>
            <article className={Styles.mainBoxContainer}>
                <AnimatePresence exitBeforeEnter>
                    {customizationStep === false ? (
                        <>
                            <motion.div
                                key="signIn"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <SignIn 
                                    signInSignUp={signInSignUp} 
                                    setSignInSignUp={setSignInSignUp}
                                    authenticationIsLoading={authenticationIsLoading}
                                    setAuthenticationIsLoading={setAuthenticationIsLoading}
                                />
                            </motion.div>
                            <motion.section
                                key="photoTitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                                className={Styles.photoTitleAuthenticationContainer}
                            >
                                <img 
                                    src="/Graphics/authentication-photo.png" 
                                    alt="" 
                                    draggable="false"
                                    className={Styles.photoTitleAuthentication}
                                />
                                <div className={Styles.blurphotoTitleAuthentication}></div>
                                <p className={Styles.titleImageAuthentication}>
                                    <span className={Styles.logoTitle}>Roovel</span><br />
                                    Tu próximo roomie a un click de distancia
                                </p>
                            </motion.section>

                            <motion.div
                                key="signUp"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <SignUp 
                                    signInSignUp={signInSignUp} 
                                    setSignInSignUp={setSignInSignUp} 
                                    authenticationIsLoading={authenticationIsLoading}
                                    setAuthenticationIsLoading={setAuthenticationIsLoading}
                                    setCustomizationStep={setCustomizationStep}
                                />
                            </motion.div>
                        </>
                    ) : (
                        <ProfileCustomization key="profileCustomization" />
                    )}
                </AnimatePresence>
            </article>
        </main>
    );
};


const SignIn = ({signInSignUp, setSignInSignUp, authenticationIsLoading, setAuthenticationIsLoading}) => {

    function signIn(){
        setAuthenticationIsLoading(!authenticationIsLoading)
    }
    return (
        <section className={Styles.signInContainer} style={{ width: signInSignUp ? '35vw' : '' }}>
        <section className={Styles.signInSignUp} style={{ right: '0' }}>
            <p className={Styles.signInSignUpTitle}>Iniciar Sesión</p>

            <InputForm title="Correo electrónico" type="email" />
            <InputForm title="Contraseña" type="password" />

            <button className={Styles.firstLogButton} onClick={signIn}>Iniciar Sesión</button>
            <p style={{ margin: '0', fontSize: '2vh', color: 'gray' }}>¿No tienes cuenta?</p>
            <button className={Styles.secondLogButton} onClick={() => setSignInSignUp(false)}>Registrarse</button>
        </section>

        {authenticationIsLoading && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <SignInSignUpLoader />
            </motion.div>
        )}
    </section>
    )
}
const SignUp = ({signInSignUp, setSignInSignUp, authenticationIsLoading, setAuthenticationIsLoading, setCustomizationStep}) => {

    function signUp(){
        setAuthenticationIsLoading(!authenticationIsLoading)
        setTimeout(()=>{
            setAuthenticationIsLoading(!authenticationIsLoading)
            setCustomizationStep(true)
        },8000)
    }
    return (
        <section className={Styles.signUpContainer} style={{ width: signInSignUp === false ? '35vw' : '' }}>
        <section className={Styles.signInSignUp}>
            <p className={Styles.signInSignUpTitle}>Registrarse</p>
            <InputForm title="Correo electronico" type="email" />
            <InputForm title="Crea una contraseña" type="password" />
            <InputForm title="Confirmar contraseña" type="password" />
            <button className={Styles.firstLogButton} onClick={signUp}>Registrarse</button>
            <p style={{ margin: '0', fontSize: '2vh', color: 'gray' }}>¿Ya tienes cuenta?</p>
            <button className={Styles.secondLogButton} onClick={() => setSignInSignUp(true)}>Iniciar Sesión</button>
        </section>
        {authenticationIsLoading && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={Styles.signInSignUpLoaderContainer}
            >
                <SignInSignUpLoader />
            </motion.div>
        )}
    </section>
    )
}

const SignInSignUpLoader = () => {
    return(
        <section className={Styles.signInSignUpLoaderContainer}>
            <BounceLoader  size='100' color='#4A617F'/>
        </section>
    )
}
export default Authentication;