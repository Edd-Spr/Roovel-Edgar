import Styles from './SignIn.module.css'
import InputForm from '../../../../Components/InputForm/InputForm';
import { motion } from "framer-motion";
import AuthLoader from '../AuthLoader';
import useSignIn from './useSignIn';

export default function SignIn({signInSignUp, setSignInSignUp, authenticationIsLoading, setAuthenticationIsLoading}) {
  const { loading, error, success, signIn } = useSignIn()

    function signUp(e){
      e.preventDefault()
      setSignInSignUp(false)
    }

    return (
      <section className={Styles.signInContainer} style={{ width: signInSignUp ? '35vw' : '' }}>
      <form onSubmit={ signIn } className={Styles.signInSignUp} style={{ right: '0' }}>
        <p className={Styles.signInSignUpTitle}>Iniciar Sesión</p>

        
        <InputForm title="Correo electrónico" type="email" />
        <InputForm title="Contraseña" type="password" />

        <button className={Styles.firstLogButton}>Iniciar Sesión</button>
        <p style={{ margin: '0', fontSize: '2vh', color: 'gray' }}>¿No tienes cuenta?</p>
        <button className={Styles.secondLogButton} onClick={ signUp }>Registrarse</button>
        
      </form>

      { loading && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
          >
              <AuthLoader />
          </motion.div>
      )}
    </section>
  )
}