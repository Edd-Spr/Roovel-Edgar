import AdminLayout from '../admin-layout'
import Styles from './dashboard.module.css'

import AdminActionCard from '../admin-action-card'

const ADMIN_ACTION_CARDS = [
  {
    title: 'Administrar Administradores',
    image: '',
    path: '/admin/admins',
  },
  {
    title: 'Administrar Arrendatarios',
    image: '',
    path: '/admin/landlords',
  },
  {
    title: 'Administrar Reportes',
    image: '',
    path: '/admin/reports',
  }
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <section className={ Styles['admin-dashboard'] }>
        <h2>Panel de Administración</h2>
        
        <section className={ Styles['admin-dashboard__action-cards'] }>
          {
            ADMIN_ACTION_CARDS.map((card, index) => (
              <AdminActionCard
                key={ index }
                { ...card }
              />
            ))
          }
        </section>
      </section>
    </AdminLayout>
  )
}
