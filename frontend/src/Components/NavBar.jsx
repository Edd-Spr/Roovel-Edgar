import { Link, useLocation } from 'react-router-dom';
import '../Styles/NavBar.css';
import { useEffect, useState } from 'react';
import AdvertisingBanner from './AdvertisingBanner';

const NavBar = () => {
    const location = useLocation();
    const [profileImage, setProfileImage] = useState(null);
    const [AdvertisingBannerIsOpen, setAdvertisingBannerIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Estado para rastrear el scroll
    const currentUser = 8;

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await fetch(`http://localhost:3000/images?id_user=${currentUser}`);
                const data = await response.json();
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
        const handleScroll = () => {
            // Cambia el estado si el usuario ha hecho scroll más allá de 50px
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Limpia el listener al desmontar
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
                <div className="userPhotoProfileContainer">
                    <Link to="/profile">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Foto de perfil"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#ccc' }} />
                        )}
                    </Link>
                </div>
            </div>
            {AdvertisingBannerIsOpen && <AdvertisingBanner closeBanner={() => setAdvertisingBannerIsOpen(false)} />}
        </header>
    );
};

export default NavBar;
