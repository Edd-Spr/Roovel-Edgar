import { useEffect, useState } from 'react'; 
import Menu from '../../Components/NavProfile/NavProfile';
import TagsProfile from '../../Components/TagsProfile/TagsProfile';
import NavBar from '../../Components/NavBar';
import { GoPencil } from "react-icons/go";
import prof from './Profile.module.css';
import AmigosList from '../../Components/Friends/Friends';
import Carousel from '../../Components/Carousel/Carousel';
import axios from 'axios'; // Asegúrate de tener axios para la petición

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

  const [profileImage, setProfileImage] = useState(null);
  const currentUser = '8'; // 💥 Esta línea la subimos arriba

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images?id_user=${currentUser}`);
        const data = await response.json();
        console.log("Imágenes recibidas para foto de perfil:", data);

        if (Array.isArray(data) && data.length > 0) {
          setProfileImage(data[0].image_content); // Usamos la primera imagen
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
                <div className={prof.circle}>
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
                <button className={prof.edit}>Editar Perfil  <GoPencil /></button>
              </article>

              <article className={prof.descInfo}>
                <span className={prof.descMain}>{profile.statement}</span>
                <span className={prof.descAge}> {profile.age} años</span>
                <span className={prof.descAll}>{profile.description}</span>
              </article>

              <article className={prof.descLabel}>
                <TagsProfile currentUser={8}/>
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
