import landLordImg from '../../../../../public/Graphics/landlord-signin.jpg'
import roomieImg from '../../../../../public/Graphics/roomie-signin.jpg'
import Styles from './UserType.module.css'

// roomie 0, landlord 1
const USER_TYPE_CARDS = [
  {
    title: 'Roomie',
    src: roomieImg,
    alt: 'Inquilino',
    value: 0
  },
  {
    title: 'Arrendador',
    src: landLordImg,
    alt: 'Arrendador',
    value: 1
  }
]


export default function UserType({ onSubmit }) {
  return (
    <section className={ Styles[`user-type`] }>
      <h2 className={ Styles[`user-type__main-title`] }>Elige tu tipo de usuario</h2>
      <section className={ Styles[`user-type__options`] }>
        {
          USER_TYPE_CARDS.map((userType, index) => (
            <figure key={index} className={ Styles[`user-type__figure`] } onClick={() => onSubmit(userType.value)}>
              <img className={ Styles[`user-type__image`] } { ...userType } />
              <h3 className={ Styles[`user-type__title`] } >{userType.title}</h3>
              <div className={ Styles[`user-type__gradient`] }></div>
            </figure>
          ))
        }
      </section>
    </section>
  )
}
