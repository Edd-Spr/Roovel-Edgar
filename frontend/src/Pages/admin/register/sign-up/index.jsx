import styles from './SignUp.module.css'
import InputForm from '../../../../Components/InputForm/InputForm';
import AuthLoader from '../../../Authentication/Components/AuthLoader';

export default function SignUp({ onSubmit, loading }) {
  
  return (
    <section className={styles.signUpContainer}>
      <form className={styles.signInSignUp} onSubmit={ onSubmit }>
        <p className={styles.signInSignUpTitle}>Añadir Administrador</p>
        <InputForm title="Correo electronico" type="email" />
        <InputForm title="Crea una contraseña" type="password" />
        <InputForm title="Confirmar contraseña" type="password" />
        <InputForm title="PIN de seguridad" type="password" />
        <InputForm title="Confirmar PIN" type="password" />
        <button className={styles.firstLogButton}>Añadir administrador</button>
      </form>
      {loading && (
        <>
          <AuthLoader />
        </>
      )}
    </section>
  )
}