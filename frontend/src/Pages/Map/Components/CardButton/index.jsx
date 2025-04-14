import styles from './CardButton.module.css'

export default function index({ children }) {
  return (
    <button className={ styles[`card-button`] }>{ children }</button>
  )
}
