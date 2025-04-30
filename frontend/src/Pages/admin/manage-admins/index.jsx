import AdminLayout from "../admin-layout"
import AdminCard from "../admin-card"
import Styles from './manage-admins.module.css'
import useManage from './useManage'

const PAGE_TITLE = 'Administrar Administradores'
const BUTTON_DELTE_TEXT = ( quantity ) => `Eliminar Administrador${ ( quantity > 1 ) ? `(${ quantity })` : '' }`
const BUTTON_ADD_TEXT = 'Agregar Administrador'

export default function AdminManagement() {
  const { admins, selectedAdmins, handleAddAdmin, handleSelectAdmin, handleDeleteAdmins } = useManage()

  return (
    <AdminLayout>
      <h2>{ PAGE_TITLE }</h2>

      <form className={ Styles['manage-admins__form'] } name="manage-admins__form" id="manage-admins__form">
        { 
          admins.map((admin) => {
            const tag = `admin-id--${ admin.id }`
            return (
              <article key={ admin.id } className={ Styles['manage-admins__admin-card'] }>
                <input 
                  type="checkbox" 
                  name={ tag } 
                  id={ tag } 
                  checked={ selectedAdmins.includes(admin.id) }
                  onClick={ handleSelectAdmin( admin.id ) } 
                />
                <AdminCard
                  value={ admin.id }
                  admin={ admin.name }
                  onClick={ handleSelectAdmin( admin.id ) } // TODO: Implement the click event to edit the admin
                />
              </article>
            )
          })
        }
      </form>

      <section className={ Styles['manage-admins__actions'] }>
        <button form="manage-admins__form" onClick={ handleDeleteAdmins } className={ Styles['manage-admins__button'] }>{ BUTTON_DELTE_TEXT( ( selectedAdmins.length ) ? selectedAdmins.length : null ) }</button>
        <button onClick={ handleAddAdmin } className={ Styles['manage-admins__button'] }>{ BUTTON_ADD_TEXT }</button>
      </section>
    </AdminLayout>
  )
}
