import Styles from './admin-card.module.css'

export default function AdminCard({ value, admin, onClick }) {
  return (
    <article value={ value } onClick={ onClick } className={ Styles['admin-card'] }>
      <p className={ Styles['admin-card__admin'] }>{ admin }</p>
    </article>
  )
}
