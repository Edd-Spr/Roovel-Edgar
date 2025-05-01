import Styles from './admin-layout.module.css'
import AdminNavbar from "../admin-navbar"

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <main className={ Styles['admin-layout'] }>
        { children }
      </main>
    </>
  )
}
