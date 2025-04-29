import Styles from './admin-navbar.module.css'
import { Link } from 'react-router-dom'

const ADMIN_NAVBAR_TITLE = 'Roovel Administration Tool'
//replace with the actual logo path
const ADMIN_NAVBAR_ICON = 'https://i.pinimg.com/736x/fd/ea/62/fdea628d602d09e6b7c5c3e0309d2f78.jpg'
const ADMIN_NAVBAR_ICON_ALT = 'Admin Icon'

export default function AdminNavbar() {
  return (
    <header className={ Styles['admin-navbar'] }>
      <Link to="/admin">
        <h2 className={ Styles['admin-navbar__title'] } >{ ADMIN_NAVBAR_TITLE }</h2>
      </Link>

      <figure className={ Styles['admin-navbar__figure'] }>
        <img className={ Styles['admin-navbar__icon'] } src={ ADMIN_NAVBAR_ICON } alt={ ADMIN_NAVBAR_ICON_ALT } />
      </figure>
    </header>
  )
}
