<<<<<<< Updated upstream
import { useEffect, useState } from 'react'; 
import Menu from '../../Components/NavProfile/NavProfile';
import TagsProfile from '../../Components/TagsProfile/TagsProfile';
import NavBar from '../../Components/NavBar';
import { GoPencil } from "react-icons/go";
import prof from './Profile.module.css';
import AmigosList from '../../Components/Friends/Friends';
import Carousel from '../../Components/Carousel/Carousel';
import ProfileCustomization from '../../Components/ProfileCustomization/ProfileCustomization';
import axios from 'axios';
=======
import Menu from '../../Components/NavProfile/NavProfile'
import Etiqueta from '../../Components/TagsProfile/TagsProfile'
import NavBar from '../../Components/NavBar';
import { GoPencil } from "react-icons/go";
import prof from './Profile.module.css';
import AmigosList from '../../Components/Friends/Friends'

>>>>>>> Stashed changes

const Profile = () => {
  const [profile, setProfile] = useState({
    user_name: '',
    user_last_name: '',
    user_parent_name: '',
    email: '',
    number: '',
    age: '',
    description: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [mostrarCustomization, setMostrarCustomization] = useState(false); 
  const currentUser = '8'; 

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images?id_user=${currentUser}`);
        const data = await response.json();
        console.log("Imágenes recibidas para foto de perfil:", data);

        if (Array.isArray(data) && data.length > 0) {
          setProfileImage(data[0].image_content); 
        }
      } catch (error) {
        console.error("Error al obtener imagen de perfil:", error);
      }
    };

    fetchProfileImage();
  }, [currentUser]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile?currentUser=${currentUser}`);
        const data = await response.json();
        console.log("Imagen de perfil recibida:", data);
        setProfile({
          user_name: data.user_name || 'No se encontró nombre',
          user_last_name: data.user_last_name,
          user_parent_name: data.user_parent_name,
          email: data.user_email || 'No se encontró correo', 
          number: data.user_tel || 'No se encontró número',
          age: data.user_age || 'No se encontró edad', 
          statement: data.user_personal_statement || 'No se encontró statement',
          description: data.user_description || 'No hay descripción disponible',
        });
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  // Cierra el modal cuando se hace clic fuera del modalContent
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setMostrarCustomization(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className={prof.all}>
<<<<<<< Updated upstream
        <article className={prof.left}>
=======
        
        <article className={prof.left}>
          {/* <h2>left</h2> */}
>>>>>>> Stashed changes
          <Menu />        
        </article>

        <article className={prof.center}>
<<<<<<< Updated upstream
=======
          {/* <h2>center</h2> */}
>>>>>>> Stashed changes
          <div className={prof.info}>
            <div className={prof.photos}> 
              <article className={prof.contCircle}>
                <div className={prof.circle}>
<<<<<<< Updated upstream
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Foto de perfil"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#ccc' }} />
                  )}
                </div>
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
                <button className={prof.edit} onClick={() => setMostrarCustomization(true)}>
                  Editar Perfil  <GoPencil />
                </button>
              </article>

              <article className={prof.descInfo}>
                <span className={prof.descMain}>{profile.statement}</span>
                <span className={prof.descAge}> {profile.age} años</span>
                <span className={prof.descAll}>{profile.description}</span>
              </article>

              <article className={prof.descLabel}>
                <TagsProfile currentUser={8}/>
              </article>

              {mostrarCustomization && (
                <div className={prof.modalOverlay} onClick={handleModalClick}>
                  <div className={prof.modalContent}>
                    <ProfileCustomization onClose={() => setMostrarCustomization(false)} />
                  </div>
                </div>
              )}
            </div>
=======

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
                <button className={prof.edit}>Editar Perfil  <GoPencil /></button>
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
            
>>>>>>> Stashed changes
          </div>
        </article>

        <article className={prof.right}>
<<<<<<< Updated upstream
          <AmigosList currentUser={8}/>
        </article>
      </div>
    </div>
=======
          {/* <h2>right</h2> */}
          <AmigosList />
        </article>
      </div>
      </div>
>>>>>>> Stashed changes
  );
};

export default Profile;
