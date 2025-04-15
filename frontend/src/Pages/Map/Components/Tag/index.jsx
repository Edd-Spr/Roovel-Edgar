import styles from './Tag.module.css'

export default function index({ tag }) {
  return (
    <p className={ styles[`tag`] } >{ tag }</p>
  )
}
