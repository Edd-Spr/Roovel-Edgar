import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ADMINS_DUMMY_DATA = [
  { id: 1, name: 'Admin 1', email: 'admin1@gmail.com'},
  { id: 2, name: 'Admin 2', email: 'admin2@gmail.com'},
  { id: 3, name: 'Admin 3', email: 'admin3@gmail.com'},
  { id: 4, name: 'Admin 4', email: 'admin4@gmail.com'},
  { id: 5, name: 'Admin 5', email: 'admin5@gmail.com'},
  { id: 6, name: 'Admin 6', email: 'admin6@gmail.com'},
  { id: 7, name: 'Admin 7', email: 'admin7@gmail.com'}
]

export default function useManage() {
  const [ admins, setAdmins ] = useState(ADMINS_DUMMY_DATA)
  const [ selectedAdmins, setSelectedAdmins ] = useState([])
  const navigate = useNavigate()

  function handleAddAdmin() {
    navigate('/admin/register')
  }

  function handlePushAdmin( adminId ) {
    const newSelectedAdmins = [...selectedAdmins, adminId]
    setSelectedAdmins(newSelectedAdmins)
  }
  
  function handleRemoveAdmin( adminId ) {
    const newSelectedAdmins = selectedAdmins.filter((admin) => admin !== adminId)
    setSelectedAdmins(newSelectedAdmins)
  }
  
  const handleSelectAdmin = ( adminId ) => () => {
    if ( selectedAdmins.includes(adminId) ) {
      handleRemoveAdmin(adminId)
    }
    else {
      handlePushAdmin(adminId)
    }
  }

  function handleDeleteAdmins(event) {
    event.preventDefault()

    if (selectedAdmins.length === 0) {
      alert('No hay administradores seleccionados')
      return
    }

    if ( selectedAdmins.length === admins.length ) {
      alert('No se puede eliminar todos los administradores')
      return
    }

    if (window.confirm(`¿Está seguro de que desea eliminar ${ selectedAdmins.length } administradores?`)) {
      setAdmins((prevAdmins) => {
        return prevAdmins.filter((admin) => !selectedAdmins.includes(admin.id))
      })
      setSelectedAdmins([])
      alert(`Se han eliminado ${ selectedAdmins.length } administradores`)
    } else {
      alert('No se han eliminado administradores')
    }
  }

  return {
    admins,
    selectedAdmins,
    handleAddAdmin,
    handleDeleteAdmins,
    handleSelectAdmin,
  }
}
