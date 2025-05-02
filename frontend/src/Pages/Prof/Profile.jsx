import { useEffect, useState } from 'react'; 
import Menu from '../../Components/NavProfile/NavProfile';
import TagsProfile from '../../Components/TagsProfile/TagsProfile';
import NavBar from '../../Components/NavBar';
import { GoPencil } from "react-icons/go";
import prof from './Profile.module.css';
import AmigosList from '../../Components/Friends/Friends';
import Carousel from '../../Components/Carousel/Carousel';
import { useAuth } from '../../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import ProfileCustomization from '../../Components/ProfileCustomization/ProfileCustomization';
import axios from 'axios';

const Profile = () => {
  const { usrToken, isAuthenticated } = useAuth();
  const [IDUSER, setIDUSER] = useState(0); // Estado para almacenar el ID del usuario
  const [currentUser, setCurrentUser] = useState(IDUSER); // Estado para sincronizar con IDUSER
  const [profile, setProfile] = useState({
    user_name: '',
    user_last_name: '',
    user_parent_name: '',
    email: '',
    number: '',
    description: '',
    user_birthdate: '', 
  });
  useEffect(() => {
    if (usrToken) {
        try {
            const decodedToken = jwtDecode(usrToken);
            console.log('Token decodificado:', decodedToken);
            console.log('ID del Usuario:', decodedToken.userId);
            console.log('Estado de autenticación:', isAuthenticated);
            setIDUSER(decodedToken.userId);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    } else {
        console.log('No hay token disponible.');
    }
}, [usrToken]);

useEffect(() => {
    setCurrentUser(IDUSER);
}, [IDUSER]);

const [profileImage, setProfileImage] = useState(null);
const [mostrarCustomization, setMostrarCustomization] = useState(false);

  function ageInYears(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

useEffect(() => {
    const fetchProfileImage = async () => {
        try {
            if (currentUser === 0) return;

            const response = await fetch(`http://localhost:3000/images?id_user=${currentUser}`);
            const data = await response.json();
            console.log("Imágenes recibidas para foto de perfil:", data);

            if (Array.isArray(data) && data.length > 0) {
                setProfileImage(data[0].image_src); 
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
            if (currentUser === 0) {
                console.log('currentUser es 0, no se realizará la solicitud.');
                return;
            }

            const response = await fetch(`http://localhost:3000/profile?currentUser=${currentUser}`);
            const data = await response.json();
            setProfile({
                user_name: data.user_name || 'No se encontró nombre',
                user_last_name: data.user_last_name,
                user_parent_name: data.user_parent_name,
                email: data.user_email || 'No se encontró correo',
                number: data.user_tel || 'No se encontró número',
                age: data.user_age || 'No se encontró edad',
                statement: data.user_personal_statement || 'No se encontró statement',
                description: data.user_description || 'No hay descripción disponible',
                user_birthdate: data.user_birthdate || 'No se encontró fecha de nacimiento',
            });
        } catch (error) {
            console.error('Error al obtener los datos del perfil:', error);
        }
    };

    fetchProfileData();
}, [currentUser]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setMostrarCustomization(false);
    }
  };

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
                      src={`http://localhost:3000/${profileImage}`}
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
                  <Carousel currentUser={currentUser}/>
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
                <span className={prof.descAge}>{profile.user_birthdate ? `${ageInYears(profile.user_birthdate)} años` : 'Edad no disponible'}</span>                
                <span className={prof.descAll}>{profile.description}</span>
              </article>

              <article className={prof.descLabel}>
              <TagsProfile currentUser={IDUSER}/>
              </article>

              {mostrarCustomization && (
                <div className={prof.modalOverlay} onClick={handleModalClick}>
                  <div className={prof.modalContent}>
                    <ProfileCustomization onClose={() => setMostrarCustomization(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        <article className={prof.right}>
          <AmigosList currentUser={8}/>
        </article>
      </div>
    </div>
  );
};

export default Profile;
