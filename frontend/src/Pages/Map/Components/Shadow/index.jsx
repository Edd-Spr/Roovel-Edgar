import styles from './Shadow.module.css'

export default function index({showLessHandler}) {
  return (
    <div className={ styles[`shadow`] } onClick={() => showLessHandler()}></div>
  )
}
