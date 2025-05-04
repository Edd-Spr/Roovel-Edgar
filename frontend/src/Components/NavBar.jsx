import { Link, useLocation } from 'react-router-dom';
import '../Styles/NavBar.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [profileImage, setProfileImage] = useState(null);
    const { usrToken, isAuthenticated } = useAuth();
  const [IDUSER, setIDUSER] = useState(0); // Estado para almacenar el ID del usuario
  const [currentUser, setCurrentUser] = useState(IDUSER); // Estado para sincronizar con IDUSER
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

    const navActions = [
        { id: 1, name: 'Roomies', direction: '/matching' },
        { id: 3, name: 'Publicar', direction: '/profile' },
        { id: 4, name: 'Favoritos', direction: '/favorite' },
    ];

    const Home = location.pathname === '/';

    return (
        <header className={`barraNav ${Home ? 'barraNavFixed' : ''}`}>
            <Link to='/'>
                <p className="logoName">Roovel</p>
            </Link>
            <div className="barNavRigthContainer">
                {navActions.map((action) =>
                    action.direction ? (
                        <Link to={action.direction} key={action.id} style={{ display: 'inline-block' }}>
                            <button className="actionButtons">{action.name}</button>
                        </Link>
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
                <div className="userPhotoProfileContainer">
                    <Link to="/profile">
                        {profileImage ? (
                            <img
                                src={`http://localhost:3000/` + profileImage}
                                alt="Foto de perfil"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#ccc' }} />
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
