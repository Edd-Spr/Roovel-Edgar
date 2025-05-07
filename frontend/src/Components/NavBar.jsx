import { Link, useLocation } from 'react-router-dom';
import '../Styles/NavBar.css';

import { useAuth } from '../hooks/auth/index.jsx';
import { useEffect, useState, useRef } from 'react';
import AdvertisingBanner from './AdvertisingBanner';
// import { useAuth } from '../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const [profileImage, setProfileImage] = useState(null);
    const { usrToken, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const containerRef = useRef(null);

    const [AdvertisingBannerIsOpen, setAdvertisingBannerIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Estado para rastrear el scroll

  const [IDUSER, setIDUSER] = useState(0); // Estado para almacenar el ID del usuario
  const [currentUser, setCurrentUser] = useState(IDUSER); // Estado para sincronizar con IDUSER
    useEffect(() => {
      if (usrToken) {
          try {
              const decodedToken = jwtDecode(usrToken);
              console.log('Token decodificado:', decodedToken);
              console.log('ID del Usuario:', decodedToken.userId);
              console.log('Type user:', decodedToken.type_user);
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
  

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await fetch(`http://localhost:3000/images?id_user=${currentUser}`);
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProfileImage(data[0].image_src);
                    console.log("Imágenes recibidas para foto de perfil:", data[0].image_src);
                }
            } catch (error) {
                console.error("Error al obtener imagen de perfil:", error);
            }
        };

        fetchProfileImage();
    }, [currentUser]);

    useEffect(() => {
        const handleScroll = () => {
            // Cambia el estado si el usuario ha hecho scroll más allá de 50px
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Limpia el listener al desmontar
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsMenuOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
    const navActions = [
        { id: 1, name: 'Roomies', direction: '/matching' },
        { id: 3, name: 'Publicar', direction: '/profile' },
        { id: 4, name: 'Favoritos', direction: '/favorite' },
    ];

    const Home = location.pathname === '/';

    return (
        <header className={`barraNav ${Home ? 'barraNavFixed' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <Link to='/'>
                <div className="logoContainer">
                    <p className="logoName">Roovel</p>
                    <img
                        src="ROOVEL-LOGO.png"
                        alt="Logo"
                        className="logoImage"
                        draggable="false"
                        style={{ height: '5VH' }}
                    />
                </div>
            </Link>
            <div className="barNavRigthContainer">
                {navActions.map((action) =>
                    action.direction ? (
                        action.direction === '/profile' ? (
                            <button
                                className="actionButtons"
                                key={action.id}
                                onClick={() => setAdvertisingBannerIsOpen(true)}
                            >
                                {action.name}
                            </button>
                        ) : (
                            <Link to={action.direction} key={action.id} style={{ display: 'inline-block' }}>
                                <button className="actionButtons">{action.name}</button>
                            </Link>
                        )
                    ) : (
                        <button className="actionButtons" key={action.id}>{action.name}</button>
                    )
                )}
                <button className="notificationButton">
                    <img
                        src="/Graphics/Icons/campana-de-notificacion.png"
                        alt="Notificaciones"
                        style={{ width: '100%', height: '75%' }}
                        draggable="false"
                    />
                </button>
                

                {isAuthenticated &&
                <ProfileImage 
                    containerRef={containerRef}
                    profileImage={profileImage}
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />}
            </div>
            {AdvertisingBannerIsOpen && <AdvertisingBanner closeBanner={() => setAdvertisingBannerIsOpen(false)} />}
        </header>
    );

};

function ProfileImage({containerRef, profileImage, isMenuOpen, setIsMenuOpen}){
    return (
        <div
        className="userPhotoProfileContainer"
        ref={containerRef}
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        >
        {profileImage ? (
            <img
            src={`http://localhost:3000/${profileImage}`}
            alt="Foto de perfil"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
        ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#ccc' }} />
        )}

        {isMenuOpen && (
            <div className="dropdownMenu">
                <Link to="/profile" className="dropdownMenuButton">Ver perfil</Link>
                <button
                    onClick={() => console.log('cerrar sesión')}
                    className="dropdownMenuButton"
                >
                    Cerrar sesión
                </button>
            </div>
        )}
    </div>
    );
}

export default NavBar;
