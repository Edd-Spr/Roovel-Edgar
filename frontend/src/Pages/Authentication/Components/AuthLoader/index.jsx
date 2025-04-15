import styles from './AuthLoader.module.css';
import BounceLoader from "react-spinners/BounceLoader";

export default function AuthLoader() {
  return(
    <section className={styles.AuthLoader}>
      <div className={ styles.shadow }></div>
      <BounceLoader className={styles.spinner} size='100' color='#4A617F'/>
    </section>
  )
}