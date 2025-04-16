import prof from './Profile.module.css';
import Menu from '../../Components/NavProfile/NavProfile'
import Etiqueta from '../../Components/TagsProfile/TagsProfile'
import { GoPencil } from "react-icons/go";

const Profile = () => {
  return (
    <div className={prof.all}>
      <article className={prof.left}>
        <h2>left</h2>
        <Menu />        
      </article>

      <article className={prof.center}>
        {/* <h2>center</h2> */}
        <div className={prof.info}>
          <div className={prof.photos}> 
            <article className={prof.contCircle}>
              <div className={prof.circle}>

              </div>
            </article>

            <article className={prof.rectangle}>
              <div className={prof.rectPhoto}></div>
            </article>
          </div>

          <div className={prof.descrip}>

            <article className={prof.descName}>
              <span className={prof.name}>Nombre de Usuario</span>
              <span className={prof.email}>correo@correo.com</span> 
              <span className={prof.number}>numero</span>
              <button>Editar Perfil  <GoPencil /></button>
            </article>

            <article className={prof.descInfo}>
              <span className={prof.descMain}>Busco compañero</span>
              <span className={prof.descAge}>26 años</span>
              <span className={prof.descAll}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit recusandae tempora labore, optio deserunt qui ullam quod minima assumenda cupiditate magnam facere ea, reprehenderit expedita? Dolor quos culpa dolores ab?Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus autem facere expedita, eius similique facilis adipisci tempore quae quam, repudiandae mollitia exercitationem blanditiis quo aperiam quidem laboriosam. Beatae, facere explicabo?</span>
            </article>

            <article className={prof.descLabel}>
              <Etiqueta /> 
              <Etiqueta /> 
              <Etiqueta /> 
            </article>

          </div>
          
        </div>
      </article>

      <article className={prof.right}>
        <h2>right</h2>
      </article>
    </div>
  );
};

export default Profile;
