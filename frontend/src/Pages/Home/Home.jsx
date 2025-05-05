import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import Styles from './Home.module.css';
import SignInBanner from '../../Components/SignInBanner/SignInBanner.jsx';
import RoomSlider from '../../Components/RoomSlider/RoomSlider.jsx';
import MultiRange from '../../Components/MultiRangeSlider/MultiRangeSlider.jsx';
import FilterButton from '../../Components/FilterButton/FilterButton.jsx';
import AdvertisingSection from '../../Components/AdvertisingSection/AdvertisingSection.jsx';
import NavBar from '../../Components/NavBar.jsx';
import { getReadableDirection} from './hooks/useGeolocation';
import{getRoomReview, getRoomAll} from '../../templade/callback_home.js'
import { useAuth } from '../../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



import { Link } from 'react-router-dom';

const isLogged = false;

const Home = () => {
    const { usrToken, isAuthenticated } = useAuth();
    useEffect(() => {
        if (usrToken) {
            try {
                const decodedToken = jwtDecode(usrToken); 
                console.log('Token decodificado:', decodedToken);
                console.log('ID del Usuario:', decodedToken.userId); 
                console.log('Estado de autenticación:', isAuthenticated);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        } else {
            console.log('No hay token disponible.');
        }
    }, [usrToken]);

    //!Manejo de cookies
    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(name + '='));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    };

    const setCookie = (name, value, days = 365) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    };

    const addRoomToCookie = (roomId) => {
        let roomSeen = getCookie('RoomSeen');

        let rooms = [];
        if (roomSeen) {
            try {
                rooms = JSON.parse(roomSeen);
            } catch (e) {
                console.warn("Cookie estaba corrupta, reiniciando...");
            }
        }

        if (!rooms.includes(roomId)) {
            rooms.push(roomId);
            setCookie('RoomSeen', JSON.stringify(rooms));
            console.log(`Habitación ${roomId} añadida a RoomSeen.`);
        } else {
            console.log(`Habitación ${roomId} ya estaba en RoomSeen.`);
        }
    };

    useEffect(() => {
        addRoomToCookie(1);
        addRoomToCookie(5);
        addRoomToCookie(8);
        addRoomToCookie(9);
        addRoomToCookie(11);
        addRoomToCookie(15);

    }, []);

    class Room {
        constructor(data, readableDirection) {
            this.id = data.id_room;
            this.name = `Habitación en ${data.home_name}`;
            this.address = readableDirection;
            this.image = "/Graphics/roomTr.jpeg";
            this.price = data.room_price;
            this.description = data.room_description;
            this.isOccupied = data.room_ocupied === 1;
        }
    }
    const [parsedViewRoom, setParsedViewRoom] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [recommendedRooms, setRecommendedRooms] = useState([]);

    useEffect(() => {
        const ViewRoom = getCookie('RoomSeen');
        if (ViewRoom) {
            try {
                setParsedViewRoom(JSON.parse(ViewRoom));
            } catch (e) {
                console.error('Error al parsear la cookie RoomSeen:', e);
            }
        }
    }, []); 
    useEffect(() => {
        async function fetchAndTransformRooms() {
            if (parsedViewRoom.length > 0) {
                try {
                    const roomReviews = await Promise.all(
                        parsedViewRoom.map(async (roomId) => {
                            const review = await getRoomReview(roomId);
                            return review;
                        })
                    );

                    const transformedRooms = await Promise.all(
                        roomReviews.map(async (roomData) => {
                            const position = [roomData.home_ubication.y, roomData.home_ubication.x]; // Accede directamente a las coordenadas
                            console.log(position);
                            const readableDirection = await getReadableDirection(position);
                            return new Room(roomData, readableDirection);
                        })
                    );

                    setRooms(transformedRooms);
                    console.log('Transformed Rooms:', transformedRooms);
                } catch (error) {
                    console.error('Error al obtener y transformar las habitaciones:', error);
                }
            }
        }

        fetchAndTransformRooms();
    }, [parsedViewRoom]); 

    useEffect(() => {
        async function fetchRecommendations() {
            const ViewRoom = getCookie('RoomSeen');
            const parsedViewRoom = ViewRoom ? JSON.parse(ViewRoom) : [];

            if (parsedViewRoom.length > 0) {
                try {
                    const allRooms = await getRoomAll(); // Obtener todas las habitaciones
                    const recommendations = generateRecommendations(parsedViewRoom, allRooms);

                    // Transformar las habitaciones recomendadas utilizando la clase Room
                    const transformedRecommendations = await Promise.all(
                        recommendations.map(async (roomData) => {
                            const position = [roomData.home_ubication.y, roomData.home_ubication.x]; // Accede directamente a las coordenadas
                            const readableDirection = await getReadableDirection(position);
                            return new Room(roomData, readableDirection);
                        })
                    );

                    // Guardar las habitaciones transformadas en el estado
                    setRecommendedRooms(transformedRecommendations);
                    console.log('Recommended Rooms:', transformedRecommendations);
                } catch (error) {
                    console.error('Error al obtener y transformar las recomendaciones:', error);
                }
            }
        }

        fetchRecommendations();
    }, []);
    function calculateDistance(location1, location2) {
        if (!Array.isArray(location1) || !Array.isArray(location2)) {
            console.warn('Ubicación inválida:', location1, location2);
            return Infinity;
        }
    
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
    
        const [lat1, lon1] = location1;
        const [lat2, lon2] = location2;
    
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
    
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
    
        return distance;
    }
    function calculateSimilarity(room, viewedRoom) {
        let score = 0;

        if (Math.abs(room.price - viewedRoom.price) <= 1000) {
            score += 3; 
        }

        return score;
    }

    function generateRecommendations(viewedRooms, allRooms) {
        const recommendations = [];

        allRooms.forEach((room) => {
            let totalScore = 0;

            viewedRooms.forEach((viewedRoom) => {
                if (room.location && viewedRoom.location) {
                    totalScore += calculateSimilarity(room, viewedRoom);
                }
            });

            recommendations.push({ room, score: totalScore });
        });

        recommendations.sort((a, b) => b.score - a.score);

        return recommendations.map((rec) => rec.room);
    }

    return (
        <>
        <NavBar />
            <FeaturesCarousel />
            <StayFinder />
            {isLogged || <SignInBanner />}
            <RoomSlider
                roomSliderTitle='Vistos Recientemente'
                rooms={rooms}
            />
            <AdvertisingSection
                title='¿Tienes Habitaciónes Vacías?'
                description='Convierte tu espacio en una oportunidad. Publica tu habitación o casa y encuentra al roomie o inquilino ideal.'
                direction=''
                image="/Graphics/carousel-rooms.jpeg"
                position={1}
            />

            <RoomSlider
                roomSliderTitle='Recomendados'
                rooms={recommendedRooms}
            />
            <AdvertisingSection
               title='¿Problemas con los gastos compartidos?' 
               description='Evita malentendidos y disputas por los pagos. Usa nuestra app para dividir de forma precisa y justa lo que le toca a cada uno.'
               direction=''
               image="/Graphics/advertising-image-div.jpeg" 
               position={2}
               color='#CEB6A9'
            />
        </>
    );
};

export default Home;

const CAROUSEL_CONTENT = [
    {
        id: 1,
        title: 'Tu habitación fuera de casa',
        description: 'Filtra, explora y elige habitaciones en distintos estados y elige la que mejor se adapte a tu estilo de vida y presupuesto.',
        image: '/Graphics/carousel-rooms.jpeg',
        buttonName: 'Habitaciónes',
        buttonContent: 'Explorar',
        direction: "/map"
    },
    {
        id: 2,
        title: 'Encuentra a tu roomie ideal',
        description: 'Explora perfiles de roomies que se ajusten a tus necesidades y preferencias. ¡Conoce a tu futuro compañero de habitación!',
        image: '/Graphics/carousel-roommates.jpeg',
        buttonName: 'Roomies',
        buttonContent: 'Explorar',
        direction: '/matching'
    },
    // {
    //     id: 3,
    //     title: 'Organiza y divide tus gastos',
    //     description: 'Lleva un control preciso de los gastos compartidos entre roomies con nuestra herramienta de división de gastos y responsabilidades de manerá fácil y justa.',
    //     image: '/Graphics/carousel-money.jpeg',
    //     buttonName: 'Finanzas',
    //     buttonContent: 'Explorar',
    //     direction: ''
    // },
    {
        id: 4,
        title: 'Publica tu espacio para roomies',
        description: 'Publica habitaciones en renta y encuentra personas que encajen con tu estilo de convivencia.',
        image: '/Graphics/carousel-publi.jpeg',
        buttonName: 'Publicar',
        buttonContent: 'Explorar',
        direction: '/propertyManager'
    },
];

const FeaturesCarousel = () =>{

    const [actualCarousel, setActualCarousel] = useState(1);

    const actualCarouselBox = CAROUSEL_CONTENT.find((item) => item.id == actualCarousel);
    
    return (
        <article className={Styles.featuresCarouselContainer}>
            <motion.img
                key={actualCarousel} 
                src={actualCarouselBox.image}
                alt=""
                className={Styles.carouselImage}
                draggable="false"
                initial={{ opacity: 0.5, x: 0 }}
                animate={{ opacity: 1, x: 50 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 8 }}
            />
            <CarouselInfo
                actualCarouselBox={actualCarouselBox}
            />
            <CarouselButtons 
                actualCarousel={actualCarousel}
                setActualCarousel={setActualCarousel}
            />
        </article>
    );
}
const CarouselInfo = ({actualCarouselBox}) => {
    return(
        <>
            <section className={Styles.carouselInfoBlur}>
            </section>
            <section className={Styles.carouselInfo}>
                <h1 className={Styles.titleCarousel}>{actualCarouselBox.title}</h1>
                <p className={Styles.carouselDescription}>{actualCarouselBox.description}</p>
                <Link to={actualCarouselBox.direction}>
                    <button className={Styles.infoCarouselButton}>{actualCarouselBox.buttonContent}</button>
                </Link>
            </section>
        </>
    );
}
const CarouselButtons = ({ actualCarousel, setActualCarousel }) => {
    return (
        <section className={Styles.carouselButtonsContainer}>
            {CAROUSEL_CONTENT.map((item) => 
                <CarouselButton 
                    key={item.id}
                    name={item.buttonName}
                    id={item.id}
                    actualCarousel={actualCarousel}
                    setActualCarousel={setActualCarousel}
                />
            )}
        </section>
    );
}
const CarouselButton = ({name, id, actualCarousel, setActualCarousel}) => {

    function handleClick(){
        setActualCarousel(id)
    }
    return (
        <button className={`${Styles.carouselButton} ${id == actualCarousel && Styles.carouselButtonActive}`} onClick={handleClick}>
            <p>{name}</p>
        </button>
    );
}



const StayFinder = () => {
    const navigate = useNavigate(); // Hook para redirigir
    const [gender, setGender] = useState(0); // 0: Todos, 1: Hombres, 2: Mujeres
    const [pets, setPets] = useState(false); // Booleano para mascotas
    const [rangeValues, setRangeValues] = useState([17, 60]); // Rango de valores
    const [address, setAddress] = useState(''); // Dirección ingresada por el usuario
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null }); // Coordenadas

    const getLatLng = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search`;
        const params = `q=${encodeURIComponent(address)}&format=json`;
        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return [data[0].lat, data[0].lon]; // Devuelve latitud y longitud
            }
            return null; // Si no se encuentran resultados
        } catch (error) {
            console.error('Error al obtener las coordenadas:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        let latLng = null;
    
        // Si se ingresó una dirección, conviértela en coordenadas
        if (address) {
            latLng = await getLatLng(address);
            if (!latLng) {
                alert('No se pudieron obtener las coordenadas para la dirección ingresada.');
                return;
            }
        }
    
        // Construir los parámetros de la URL
        const params = new URLSearchParams({
            gender,
            pets: pets ? 1 : 0, // Convertir booleano a 1 o 0
            minAge: rangeValues[0],
            maxAge: rangeValues[1],
            lat: latLng ? latLng[0] : null, // Usar las coordenadas obtenidas
            lon: latLng ? latLng[1] : null, // Usar las coordenadas obtenidas
        });
    
        // Redirigir a la pantalla de /map con los parámetros
        navigate(`/map?${params.toString()}`);
    };

    return (
        <article className={Styles.stayFinderContainer}>
            <section className={Styles.stayFinderBox}>
                <div className={Styles.containerFinderBy}>
                    <label htmlFor="" className={Styles.labelStayFinder}>
                        ¿Roomie o Habitación? Encuentra lo que necesitas
                    </label>
                    <div className={Styles.buttonsFindByContainer}>
                        <button className={`${Styles.buttonFindBy} ${Styles.buttonFindByActive}`}>
                            Habitación
                        </button>
                    </div>
                </div>
                <div className={Styles.inputsContainer}>
                <input
                        type="text"
                        className={Styles.inputStayFinder}
                        placeholder="Escribe una dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} // Actualiza la dirección
                    />
                    <FilterButton
                        buttonType="multirange"
                        rangeValues={rangeValues}
                        setRangeValues={setRangeValues}
                        modalPlace={0}
                    />
                    <FilterButton
                        valueInput={gender}
                        setValueInput={setGender}
                        options={['Todos los Generos', 'Solo Hombres', 'Solo Mujeres']}
                    />
                    <FilterButton
                        valueInput={pets}
                        setValueInput={setPets}
                        options={['No mascotas', 'Cualquier mascota', 'Solo Perros', 'Solo Gatos']}
                    />
                    <button className={Styles.searchButton} onClick={handleSearch}>
                        <img src="/Graphics/Icons/search_icon.png" alt="" style={{ width: '100%' }} />
                    </button>
                </div>
            </section>
        </article>
    );
};