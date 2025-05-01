import Styles from './admin-action-card.module.css'

import useActionCard from './useActionCard'

export default function AdminActionCard({ title, image, path }) {
  const { handleClick } = useActionCard( path )

  return (
    <article onClick={ handleClick } className={ Styles['admin-action-card'] }>
      <img src={ image } alt={ title } className={ Styles['admin-action-card__image'] } />
      <h3 className={ Styles['admin-action-card__title'] }>{ title }</h3>

      <div className={ Styles['admin-action-card__gradient'] }></div>
    </article>
  )
}