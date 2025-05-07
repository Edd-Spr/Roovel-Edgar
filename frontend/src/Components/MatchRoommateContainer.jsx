import '../Styles/MatchRoommateContainer.css'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { PostFriendRquest } from '../templade/callback_chat_messges.js';
import { useAuth } from '../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// const PROFILES = [
//     {
//         "id": 27,
//         "name": "NOMBRE",
//         "birthday": "2005-11-24T06:00:00.000Z",
//         "genre": "Masculino",
//         "description": "STH",
//         "location": "LUGAR",
//         "images": [
//             "uploads\\user_pics\\id_user_27_pic_2025-04-21T04-49-44-730Z.png",
//             "uploads\\user_pics\\id_user_27_pic_2025-04-21T04-49-44-733Z.jpeg",
//             "uploads\\user_pics\\id_user_27_pic_2025-04-21T04-49-44-733Z.jpeg",
//             "uploads\\user_pics\\id_user_27_pic_2025-04-21T04-49-44-733Z.jpeg",
//             "uploads\\user_pics\\id_user_27_pic_2025-04-21T04-49-44-733Z.jpeg"
//         ],
//         "tags": [
//             "Desarrollador",
//             "Lectura",
//             "Tecnología"
//         ],
//         "pets": true
//     },
//     {
//         "id": 43,
//         "name": "PABLO R",
//         "birthday": "2005-06-15T05:00:00.000Z",
//         "genre": "Masculino",
//         "description": "gdl",
//         "location": "gdl",
//         "images": [
//             "uploads/user_pics/id_user_43_pic_2025-04-24T17-33-37-696Z.jpeg",
//             "uploads/user_pics/id_user_43_pic_2025-04-24T17-33-37-696Z.jpeg",
//             "uploads/user_pics/id_user_43_pic_2025-04-24T17-33-37-696Z.jpeg",
//             "uploads/user_pics/id_user_43_pic_2025-04-24T17-33-37-696Z.jpeg",
//             "uploads/user_pics/id_user_43_pic_2025-04-24T17-33-37-696Z.jpeg"
//         ],
//         "tags": [
//             "DiseñadorGráfico",
//             "Deportes",
//             "Lectura",
//             "Perseverante",
//             "Consultor",
//             "Fotografía",
//             "Ingeniero",
//             "Responsabilidad",
//             "AprenderNuevo",
//             "Emprendedor"
//         ],
//         "pets": true
//     },
//     {
//         "id": 46,
//         "name": "Pablo Picasso",
//         "birthday": "0181-08-25T06:36:36.000Z",
//         "genre": "Masculino",
//         "description": "Frances",
//         "location": "Frances",
//         "images": [
//             "uploads/user_pics/id_user_46_pic_2025-04-25T01-50-43-500Z.jpeg",
//             "uploads/user_pics/id_user_46_pic_2025-04-25T01-50-43-501Z.jpeg",
//             "uploads/user_pics/id_user_46_pic_2025-04-25T01-50-43-501Z.jpeg",
//             "uploads/user_pics/id_user_46_pic_2025-04-25T01-50-43-501Z.jpeg",
//             "uploads/user_pics/id_user_46_pic_2025-04-25T01-50-43-501Z.jpeg"
//         ],
//         "tags": [
//             "Lectura",
//             "Inspiración",
//             "Creativo",
//             "Curioso",
//             "Música",
//             "Naturaleza",
//             "Cine",
//             "Arte",
//             "Innovación",
//             "Motivación",
//             "ArteCultural"
//         ],
//         "pets": true
//     },
//     {
//         "id": 47,
//         "name": "Pedro picaso",
//         "birthday": "2025-04-17T06:00:00.000Z",
//         "genre": "Masculino",
//         "description": "picasso",
//         "location": "pedro ",
//         "images": [
//             "uploads/user_pics/id_user_47_pic_2025-04-25T02-48-36-155Z.jpeg",
//             "uploads/user_pics/id_user_47_pic_2025-04-25T02-48-36-155Z.jpeg",
//             "uploads/user_pics/id_user_47_pic_2025-04-25T02-48-36-155Z.jpeg",
//             "uploads/user_pics/id_user_47_pic_2025-04-25T02-48-36-155Z.jpeg",
//             "uploads/user_pics/id_user_47_pic_2025-04-25T02-48-36-155Z.jpeg"
//         ],
//         "tags": [
//             "DiseñadorGráfico",
//             "Deportes",
//             "Tecnología",
//             "Escritor",
//             "Lectura",
//             "Optimista",
//             "Música",
//             "Arte"
//         ],
//         "pets": true
//     },
//     {
//         "id": 48,
//         "name": "Billie Elish",
//         "birthday": "2003-12-17T06:00:00.000Z",
//         "genre": "Femenino",
//         "description": "Artista y compsitora Profecional",
//         "location": "Los Angeles",
//         "images": [
//             "uploads/user_pics/id_user_48_pic_2025-04-25T03-12-22-109Z.jpeg",
//             "uploads/user_pics/id_user_48_pic_2025-04-25T03-12-22-110Z.jpeg",
//             "uploads/user_pics/id_user_48_pic_2025-04-25T03-12-22-110Z.jpeg",
//             "uploads/user_pics/id_user_48_pic_2025-04-25T03-12-22-110Z.jpeg",
//             "uploads/user_pics/id_user_48_pic_2025-04-25T03-12-22-110Z.jpeg"
//         ],
//         "tags": [
//             "Arte",
//             "Deportes",
//             "TrabajoEnEquipo",
//             "Música",
//             "Lectura",
//             "Amor",
//             "Responsabilidad",
//             "Perseverante",
//             "Optimista",
//             "Familia"
//         ],
//         "pets": true
//     },
//     {
//         "id": 49,
//         "name": "Billie Eilish Pirate Baird O'Connell",
//         "birthday": "2001-12-18T06:00:00.000Z",
//         "genre": "Femenino",
//         "description": "Billie Eilish Pirate Baird O'Connell, conocida simplemente como Billie Eilish, es una cantante, compositora y productora musical estadounidense.",
//         "location": "Los Angeles",
//         "images": [
//             "uploads/user_pics/id_user_49_pic_2025-04-25T05-59-00-336Z.jpeg",
//             "uploads/user_pics/id_user_49_pic_2025-04-25T05-59-00-336Z.jpeg",
//             "uploads/user_pics/id_user_49_pic_2025-04-25T05-59-00-336Z.jpeg",
//             "uploads/user_pics/id_user_49_pic_2025-04-25T05-59-00-336Z.jpeg",
//             "uploads/user_pics/id_user_49_pic_2025-04-25T05-59-00-336Z.jpeg"
//         ],
//         "tags": [
//             "Desarrollador",
//             "Emprendedor",
//             "Cine",
//             "Educador",
//             "Cocinero",
//             "Escritor",
//             "Naturaleza",
//             "Curioso",
//             "Líder"
//         ],
//         "pets": true
//     },
//     {
//         "id": 50,
//         "name": "Exel Nunez",
//         "birthday": "2005-09-13T05:00:00.000Z",
//         "genre": "Masculino",
//         "description": "Hola soy estudiante tsu en informatica, actuzaamente estudio en cucei ",
//         "location": "GDL ",
//         "images": [
//             "uploads/user_pics/id_user_50_pic_2025-04-25T17-11-32-311Z_yzckgt.jpeg",
//             "uploads/user_pics/id_user_50_pic_2025-04-25T17-11-32-311Z_d7qsk3.jpeg",
//             "uploads/user_pics/id_user_50_pic_2025-04-25T17-11-32-311Z_kghne0.jpeg",
//             "uploads/user_pics/id_user_50_pic_2025-04-25T17-11-32-311Z_1u5xe5.jpeg",
//             "uploads/user_pics/id_user_50_pic_2025-04-25T17-11-32-311Z_s0089r.jpeg"
//         ],
//         "tags": [
//             "Inspiración",
//             "AprenderNuevo",
//             "ArteCultural",
//             "Cultura",
//             "Cocinero",
//             "Ingeniero",
//             "Idiomas",
//             "Creativo",
//             "Líder",
//             "Yoga",
//             "Vlogs",
//             "Influencer"
//         ],
//         "pets": true
//     },
//     {
//         "id": 51,
//         "name": "Billie Eilish ",
//         "birthday": "2001-12-18T06:00:00.000Z",
//         "genre": "Femenino",
//         "description": "Billie Eilish Pirate Baird O'Connell, conocida simplemente como Billie Eilish, es una cantante, compositora y productora musical estadounidense.",
//         "location": "Los angeles",
//         "images": [
//             "uploads/user_pics/id_user_51_pic_2025-04-26T02-41-56-707Z_7en6k5.jpeg",
//             "uploads/user_pics/id_user_51_pic_2025-04-26T02-41-56-707Z_rc0rt7.jpeg",
//             "uploads/user_pics/id_user_51_pic_2025-04-26T02-41-56-707Z_d8zd5f.jpeg",
//             "uploads/user_pics/id_user_51_pic_2025-04-26T02-41-56-707Z_1mkqxw.jpeg",
//             "uploads/user_pics/id_user_51_pic_2025-04-26T02-41-56-707Z_9grrj6.jpeg"
//         ],
//         "tags": [
//             "Cine",
//             "Viajes",
//             "Optimista",
//             "Curioso",
//             "Música",
//             "Fotografía",
//             "Introvertido",
//             "Líder",
//             "Soñador",
//             "Amor",
//             "Igualdad",
//             "Inspiración",
//             "Equidad",
//             "Bilingüe",
//             "Familia",
//             "Cultura"
//         ],
//         "pets": true
//     }
// ]
// const testPostFriendRequest = async () => {
//     const idUser = 41;
//     const idUserRequest = 51;

//     try {
//         const response = await PostFriendRquest(idUser, idUserRequest);
//         console.log('Respuesta del servidor:', response);
//     } catch (error) {
//         console.error('Error al enviar la solicitud:', error);
//     }
// };

// testPostFriendRequest();
// const PROFILES = [
//     {
//         id: 1,
//         name: 'Kit Connor',
//         age: 21,
//         genre: 'Hombre',
//         description: 'Hey! Soy Kit, actor y amante del cine. Busco un roomie buena onda con quien compartir un espacio acogedor. Me encanta el fitness, las charlas profundas y ver pelis los fines de semana. Si tienes mascotas, mejor aún. 🚀',
//         images:  ['/PhotoProfiles/kit-1.jpeg', '/PhotoProfiles/kit-2.jpeg', '/PhotoProfiles/kit-3.jpeg', '/PhotoProfiles/kit-4.jpeg'],
//         tags: ['Actor', 'Cinéfilo', 'Fitness', 'Extrovertido', 'Amante de los animales', 'Pet Friendly'],
//         location: 'Londres, Reino Unido',
//         pets: true,
//     },
//     {
//         id: 2,
//         name: 'Kit',
//         description: 'Hey! Soy Kit, actor y amante del cine. Busco un roomie buena onda con quien compartir un espacio acogedor. Me encanta el fitness, las charlas profundas y ver pelis los fines de semana. Si tienes mascotas, mejor aún. 🚀',
//         images: ['kit-1.jpeg', 'kit-2.jpeg', 'kit-3.jpeg', 'kit-4.jpeg'],
//         tags: ['Actor', 'Cinéfilo', 'Fitness', 'Extrovertido', 'Amante de los animales'],
//         location: 'Londres, Reino Unido',
//         pets: true,
//     }
// ];

const MatchRoommateContainer = () => {
    const { usrToken, isAuthenticated } = useAuth();
    const [IDUSER, setIDUSER] = useState(0); // Estado para almacenar el ID del usuario
    const [user, setUser] = useState(0); // Estado para sincronizar con IDUSER
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth'); // Redirige al usuario a la página de autenticación
        }
    }, [isAuthenticated, navigate]);

        // Decodificar el token y obtener el ID del usuario
    useEffect(() => {
        if (usrToken) {
            try {
                const decodedToken = jwtDecode(usrToken);
                console.log('Token decodificado:', decodedToken);
                console.log('ID del Usuario:', decodedToken.userId);
                console.log('Estado de autenticación:', isAuthenticated);
                setIDUSER(decodedToken.userId); // Actualiza el estado con el ID del usuario
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        } else {
            console.log('No hay token disponible.');
        }
    }, [usrToken]);
    
        // Sincronizar el estado `user` con `IDUSER`
    useEffect(() => {
        setUser(IDUSER); // Actualiza `user` cada vez que `IDUSER` cambie
    }, [IDUSER]);
    
    useEffect(() => {
        console.log('IDUSER actualizado:', IDUSER); // Verifica que el IDUSER se actualice correctamente
    }, [IDUSER]);
    
    useEffect(() => {
        console.log('user actualizado:', user); // Verifica que el user se actualice correctamente
    }, [user]);

    const [PROFILES, setProfiles] = useState([]);

    useEffect(() => {
        if (!IDUSER) return; // No realizar la solicitud si IDUSER no es válido
        
        const fetchProfiles = async () => { 
            try {
                const response = await fetch(`http://localhost:3000/api/recomendation/${IDUSER}`);
                const data = await response.json();
                console.log('Datos obtenidos de la API:', data);
                if (response && data) {
                    setProfiles(data.reverse()); // Actualizar el estado con los perfiles
                }
            } catch (error) {
                console.error('Error al obtener los perfiles:', error);
            }
        };
        fetchProfiles();
    }, [IDUSER]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [actualImage, setActualImage] = useState(0);
    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const userCard = PROFILES[currentIndex] || {};

    function back() {
        if (actualImage > 0) {
            setActualImage(actualImage - 1);
        }
    }

    function next() {
        if (userCard.images && actualImage < userCard.images.length - 1) {
            setActualImage(actualImage + 1);
        }
    }
    function onNextProfile() {
        if (currentIndex < PROFILES.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setActualImage(0); // Reinicia la imagen al cambiar de perfil
        } else {
            console.log('No hay más perfiles');
        }
    }

    const swipeDirectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [customDirection, setCustomDirection] = useState(null);

    const [swipeDirection, setSwipeDirection] = useState(null); 

    console.log('Dirección del swipe:', swipeDirection); 


   
    const handleLike = () => {
        

        if (infoIsOpen){
            setInfoIsOpen(false);
            setTimeout(() => {
                setSwipeDirection('right');
                PostFriendRquest(IDUSER, userCard.id);
                setIsVisible(false);
                setTimeout(() => {
                    onNextProfile();
                    setSwipeDirection(null);
                    setIsVisible(true);
                }, 1000);
            }
            , 600);
        } else {
            setSwipeDirection('right');
            PostFriendRquest(IDUSER, userCard.id);
            setIsVisible(false);
            setTimeout(() => {
                onNextProfile();
                setSwipeDirection(null);
                setIsVisible(true);
            }, 1000);
    }
    };
    
    const handleDislike = () => {
        if (infoIsOpen){
            setInfoIsOpen(false);
            setTimeout(() => {
                setSwipeDirection('left');
                setIsVisible(false);
                setTimeout(() => {
                    onNextProfile();
                    setSwipeDirection(null);
                    setIsVisible(true);
                }, 1000);
            }
            , 600);

        } else {
            setSwipeDirection('left');
            setIsVisible(false);
            setTimeout(() => {
                onNextProfile();
                setSwipeDirection(null);
                setIsVisible(true);
            }, 1000);
    }
    };

    const nextUserCard = PROFILES[currentIndex + 1];

    return (
<article className="matchRoommateContainer">
    <section className="matchCardContainer">
        <div className="cardContainerWrapper">
            {/* Static next card underneath */}
            {nextUserCard && (
                <div className="cardContainer">
                    <MatchCard
                        userCard={nextUserCard}
                        actualImage={actualImage}
                        back={back}
                        next={next}
                        setInfoIsOpen={setInfoIsOpen}
                        onLike={handleLike}
                        onDislike={handleDislike}
                    />
                    <ProfileCardInfo
                        userCard={nextUserCard}
                        infoIsOpen={infoIsOpen}
                        setInfoIsOpen={setInfoIsOpen}
                    />
                </div>
            )}

            {/* Animated current card on top */}
            <AnimatePresence>
                {isVisible && userCard && (
                    <motion.div
                        key={`${userCard.id}-${swipeDirection}`} 
                        className="cardContainer animatedCard"
                        initial={false}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                            x: swipeDirection === 'right' ? 300 : -300,
                            rotate: swipeDirection === 'right' ? 20 : -20,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <MatchCard
                            userCard={userCard}
                            actualImage={actualImage}
                            back={back}
                            next={next}
                            setInfoIsOpen={setInfoIsOpen}
                            onLike={handleLike}
                            onDislike={handleDislike}
                        />
                        <ProfileCardInfo
                            userCard={userCard}
                            infoIsOpen={infoIsOpen}
                            setInfoIsOpen={setInfoIsOpen}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </section>
</article>
    );
};

const MatchCard = ({back, next, userCard, actualImage, setInfoIsOpen, onLike, onDislike}) => {
    const [isHover, setIsHover] = useState(false);

    if (!userCard || !userCard.images || userCard.images.length === 0) {
        return <p>No hay imágenes disponibles.</p>;
    }

    return (
        <section 
            className="matchCard"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img 
                src={`http://localhost:3000/${userCard.images[actualImage]}`}
                alt="" 
                className='matchCardProfileImage'
                draggable="false"
            />
            <ActiveThumbnail images={userCard.images} actualImage={actualImage}/>
            {actualImage > 0 && 
                <button className="imageButton" style={{ left: '2vh', opacity: isHover ? 1 : 0 }} onClick={back}>
                    <img src="/Graphics/Icons/arrow_back.png" alt="" style={{width: '100%'}} />
                </button>}
            {actualImage < userCard.images.length - 1 && 
                <button className="imageButton" style={{ right: '2vh', opacity: isHover ? 1 : 0 }} onClick={next}>
                    <img src="/Graphics/Icons/arrow_forward.png" alt="" style={{width: '100%'}} />
                </button>}
            <MatchActions
                setInfoIsOpen={setInfoIsOpen}
                userCard={userCard}
                onLike={onLike}
                onDislike={onDislike}
            />
        </section>
    );
};
const ActiveThumbnail = ({images, actualImage}) => {
    return (
        <>
            {images.length > 1 && 
                <div className="activeThumbnailContainer">
                    {images.map((item, index) => (
                        <div 
                            key={index} 
                            className={`thumbnail ${actualImage === index && 'activeThumbnail'}`}
                        ></div>
                    ))}
                </div>
            }
        </>
    )
}

const MatchActions = ({setInfoIsOpen, userCard, onLike, onDislike}) => {
    function click() {
        setInfoIsOpen(true);
    }

    function handleClick() {
        setInfoIsOpen(false);
    }

    const age = useMemo(() => {
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
        return ageInYears(userCard.birthday);
    }, [userCard.birthday]);

    return (
        <section className='matchActions'>
            <div className="firstInfoContainer">
                <div className="ageAndNameInfoCardContainer">
                    <p className='profileNameMatchCard'>{userCard.name}</p>
                    <p className="profileAgeMatchCard">{age}</p>
                </div>
                <p className='profileLocationMatchCard'>{userCard.location}</p>
            </div>
            <div className="actionButtonsContainer">
                <button className="smallInteractWithMatchCard" onClick={handleClick}>-</button>
                <button className="interactWithMatchCard" onClick={onDislike}>
                    <img src="/Graphics/Icons/dislike.png" alt="" draggable="false" style={{width: '50%'}} />
                </button>
                <button className="interactWithMatchCard" onClick={onLike}>
                    <img src="/Graphics/Icons/like.png" alt="" draggable="false" style={{width: '50%'}} />
                </button>
                <button className="smallInteractWithMatchCard" onClick={click}>+</button>
            </div>
        </section>
    );
};
const ProfileCardInfo = ({userCard, infoIsOpen, setInfoIsOpen}) => {

    function close(){
        setInfoIsOpen(false);
    }

    console.log('userCard', userCard);
    const age = useMemo(() => {
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
        return ageInYears(userCard.birthday);
    }, [userCard.birthday]); // Solo se recalcula si cambia `userCard.birthday`

    return (
        <section style={{ width: infoIsOpen && '55vh'}} className='profileCardInfoContainer'>
            <section className='profileCardInfo'>

                <button className="closeInfoCard" onClick={close}>
                    <img 
                        src="/Graphics/Icons/close_dark.png" 
                        alt=""
                        draggable="false"
                        style={{width: '100%'}}
                    />
                </button>

                <div className="firstInfoInInfoCardContainer">
                    <div className="ageAndNameContainer">
                        <p className='profileNameMatchCard'  style={{color: '#4A617F'}}>{userCard.name}</p>
                        <p className="profileAgeMatchCard" style={{color: '#878787'}}>{age}</p>
                    </div>
                    <p className='profileLocationMatchCard' style={{color: '#878787'}}>{userCard.location}</p>
                </div>

                <div className="tagsContainer">
                {userCard.tags && Array.isArray(userCard.tags) && userCard.tags.map((tag, index) => <p key={index} className="tagProfileCard">{tag}</p>)}                
                </div>

                <div className="lookingForContainer">

                </div>
            </section>
        </section>
    )
}

export default MatchRoommateContainer;