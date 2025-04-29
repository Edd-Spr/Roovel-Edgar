import AdminLayout from "../admin-layout"
import AdminCard from "../admin-card"
import Styles from './manage-admins.module.css'

const PAGE_TITLE = 'Administrar Administradores'
const BUTTON_DELTE_TEXT = ( quantity ) => `Eliminar Administradors${ ( quantity > 1 ) ? `(${ quantity })` : '' }`
const BUTTON_ADD_TEXT = 'Agregar Administrador'

const ADMINS_DUMMY_DATA = [
  { id: 1, name: 'Admin 1', email: 'admin1@gmail.com'},
  { id: 2, name: 'Admin 2', email: 'admin2@gmail.com'},
  { id: 3, name: 'Admin 3', email: 'admin3@gmail.com'},
  { id: 4, name: 'Admin 4', email: 'admin4@gmail.com'},
  { id: 5, name: 'Admin 5', email: 'admin5@gmail.com'},
  { id: 6, name: 'Admin 6', email: 'admin6@gmail.com'},
  { id: 7, name: 'Admin 7', email: 'admin7@gmail.com'}
]

export default function AdminManagement() {
  
  const handleSelectAdmin = ( adminId, tag ) => (event) => {
    event.preventDefault()

    const input = document.getElementById(tag)
    if (input) {
      input.checked = !input.checked
    }

    if (input.checked) {
      //Add to the list of selected admins
      console.log(`Admin ${adminId} selected`)
    }
  }
  
  return (
    <AdminLayout>
      <h2>{ PAGE_TITLE }</h2>

      <form className={ Styles['manage-admins__form'] }>
        { 
          ADMINS_DUMMY_DATA.map((admin) => {
            const tag = `admin-id--${ admin.id }`
            return (
              <article key={ admin.id } className={ Styles['manage-admins__admin-card'] }>
                <input type="checkbox" name={ tag } id={ tag } />
                <AdminCard
                  key={ admin.id }
                  value={ admin.id }
                  admin={ admin.name }
                  onClick={ handleSelectAdmin( admin.id, tag ) } // TODO: Implement the click event to edit the admin
                />
              </article>
            )
          })
        }
      </form>

      <section className={ Styles['manage-admins__actions'] }>
        <button className={ Styles['manage-admins__button'] }>{ BUTTON_DELTE_TEXT() }</button>
        <button className={ Styles['manage-admins__button'] }>{ BUTTON_ADD_TEXT }</button>
      </section>
    </AdminLayout>
  )
}
