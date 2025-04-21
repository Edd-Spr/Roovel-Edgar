import styles from './SignUp.module.css'
import InputForm from '../../../../Components/InputForm/InputForm';
import AuthLoader from '../AuthLoader';

export default function SignUp({signInSignUp, onSubmit, goSignIn, authenticationIsLoading}) {
  
  return (
  <section className={styles.signUpContainer} style={{ width: signInSignUp === false ? '35vw' : '' }}>
    <form className={styles.signInSignUp} onSubmit={ onSubmit }>
      <p className={styles.signInSignUpTitle}>Registrarse</p>
      <InputForm title="Correo electronico" type="email" />
      <InputForm title="Crea una contraseña" type="password" />
      <InputForm title="Confirmar contraseña" type="password" />
      <button className={styles.firstLogButton}>Registrarse</button>
      <p style={{ margin: '0', fontSize: '2vh', color: 'gray' }}>¿Ya tienes cuenta?</p>
      <button className={styles.secondLogButton} onClick={ goSignIn }>Iniciar Sesión</button>
    </form>
    {authenticationIsLoading && (
      <>
        <AuthLoader />
      </>
    )}
  </section>
  )
}