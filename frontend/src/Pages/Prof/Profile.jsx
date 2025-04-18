import { useEffect, useState } from 'react'; 
import Menu from '../../Components/NavProfile/NavProfile'
// import Etiqueta from '../../Components/TagsProfile/TagsProfile'
import NavBar from '../../Components/NavBar';
import { GoPencil } from "react-icons/go";
import prof from './Profile.module.css';
import AmigosList from '../../Components/Friends/Friends'
import Carousel from '../../Components/Carousel/Carousel';



const Profile = () => {
  const [profile, setProfile] = useState({
    user_name: '',
    user_last_name: '',
    user_parent_name: '',
    email: '',
    number: '',
    age: 26,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  });

  const currentUser = '8'; // id del user 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile?currentUser=${currentUser}`);
        const data = await response.json();
        setProfile({
          user_name: data.user_name || 'No se encontro nombre',
          user_last_name: data.user_last_name,
          user_parent_name: data.user_parent_name,
          email: data.user_email || 'No se encontro correo', 
          number: data.user_tel || 'No se encontro número',
          age: data.user_age || 'No se encontro edad', 
          statement: data.user_personal_statement || 'No se encontro statement',
          description: data.user_description || 'No hay descripción disponible',
        });
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className={prof.all}>
        
        <article className={prof.left}>
          <Menu />        
        </article>

        <article className={prof.center}>
          <div className={prof.info}>
            <div className={prof.photos}> 
              <article className={prof.contCircle}>
                <div className={prof.circle}></div>
              </article>

              <article className={prof.rectangle}>
                <div className={prof.rectPhoto}>
                  <Carousel />
                </div>
              </article>
            </div>

            <div className={prof.descrip}>

              <article className={prof.descName}>
                <span className={prof.name}>{profile.user_name} {profile.user_last_name} {profile.user_parent_name}</span>
                <span className={prof.email}>{profile.email}</span> 
                <span className={prof.number}>{profile.number}</span>
                <button className={prof.edit}>Editar Perfil  <GoPencil /></button>
              </article>

              <article className={prof.descInfo}>
                <span className={prof.descMain}>{profile.statement}</span>
                <span className={prof.descAge}> {profile.age} años</span>
                <span className={prof.descAll}>{profile.description}</span>
              </article>

              <article className={prof.descLabel}>
              {/* <TagsProfile /> */}
              </article>

            </div>
            
          </div>
        </article>

        <article className={prof.right}>
          <AmigosList />
        </article>
      </div>
    </div>
  );
};

export default Profile;
