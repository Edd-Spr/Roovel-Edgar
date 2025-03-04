import { useState } from 'react';
import { motion } from "framer-motion";
import '../Styles/PagesStyles/Home.css';
import SignInBanner from '../Components/SignInBanner.jsx';
import RoomSlider from '../Components/RoomSlider.jsx';
import MultiRange from '../Components/MultiRangeSlider.jsx';
import InputButton from '../Components/InputButton.jsx';
import AdvertisingSection from '../Components/AdvertisingSection.jsx';


const isLogged = false;

const Home = () => {
    return (
        <>
            <FeaturesCarousel/>
            <StayFinder/>
            {isLogged || <SignInBanner/>}
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
                rooms={rooms}
            />
            <AdvertisingSection
               title='¿Problemas con los gastos compartidos?' 
               description='Evita malentendidos y disputas por los pagos. Usa nuestra app para dividir de forma precisa y justa lo que le toca a cada uno.'
               direction=''
               image="/Graphics/advertising-image-div.jpeg" 
               position={2}
               color='#CEB6A9'
               top='-100px'
            />
        </>
    );
}
export default Home;

const CAROUSEL_CONTENT = [
    {
        id: 1,
        title: 'Tu habitación fuera de casa',
        description: 'Filtra, explora y elige habitaciones en distintos estados y elige la que mejor se adapte a tu estilo de vida y presupuesto.',
        image: '/Graphics/carousel-rooms.jpeg',
        buttonName: 'Habitaciónes',
        buttonContent: 'Explorar',
        direction: ''
    },
    {
        id: 2,
        title: 'Encuentra a tu roomie ideal',
        description: 'Explora perfiles de roomies que se ajusten a tus necesidades y preferencias. ¡Conoce a tu futuro compañero de habitación!',
        image: '/Graphics/carousel-roommates.jpeg',
        buttonName: 'Roomies',
        buttonContent: 'Explorar',
        direction: ''
    },
    {
        id: 3,
        title: 'Organiza y divide tus gastos',
        description: 'Lleva un control preciso de los gastos compartidos entre roomies con nuestra herramienta de división de gastos y responsabilidades de manerá fácil y justa.',
        image: '/Graphics/carousel-money.jpeg',
        buttonName: 'Finanzas',
        buttonContent: 'Explorar',
        direction: ''
    },
    {
        id: 4,
        title: 'Publica tu espacio para roomies',
        description: 'Publica habitaciones en renta y encuentra personas que encajen con tu estilo de convivencia.',
        image: '/Graphics/carousel-publi.jpeg',
        buttonName: 'Publicar',
        buttonContent: 'Explorar',
        direction: ''
    },
];

const FeaturesCarousel = () =>{

    const [actualCarousel, setActualCarousel] = useState(1);

    const actualCarouselBox = CAROUSEL_CONTENT.find((item) => item.id == actualCarousel);
    
    return (
        <article className="featuresCarouselContainer">
            <motion.img
                key={actualCarousel} 
                src={actualCarouselBox.image}
                alt=""
                className="carouselImage"
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
            <section className="carouselInfoBlur">
            </section>
            <section className='carouselInfo'>
                <h1 className='titleCarousel'>{actualCarouselBox.title}</h1>
                <p className="carouselDescription">{actualCarouselBox.description}</p>
                <button className="infoCarouselButton">{actualCarouselBox.buttonContent}</button>
            </section>
        </>
    );
}
const CarouselButtons = ({ actualCarousel, setActualCarousel }) => {
    return (
        <section className='carouselButtonsContainer'>
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
        <button className={`carouselButton ${id == actualCarousel && 'carouselButtonActive'}`} onClick={handleClick}>
            <p>{name}</p>
        </button>
    );
}

const StayFinder = () => {

        
    const [finderBy, setFinderBy] = useState(1);
    const handleFinderBy = (value) => {
        setFinderBy(value);
    };

    const min = 17;
    const max = 65;
    const [minValue, set_minValue] = useState(min);
    const [maxValue, set_maxValue] = useState(max);
    const [actualValue, setActualValue] = useState(false);
    const [gender, setGender] = useState(0);
    const [pets, setPets] = useState(0);

    
    return (
        <article className="stayFinderContainer">
            <section className="stayFinderBox">
                <div className="containerFinderBy">
                    <label htmlFor="" className='labelStayFinder'> ¿Roomie o Habitación? Encuentra lo que necesitas</label>
                    <div className="buttonsFindByContainer">
                        <button 
                            className={`buttonFindBy ${finderBy === 1 ? 'activeFindBy' : ''}`}
                            onClick={() => handleFinderBy(1)}
                        >
                            Habitación
                        </button>
                        <button 
                            className={`buttonFindBy ${finderBy === 2 ? 'activeFindBy' : ''}`}
                            onClick={() => handleFinderBy(2)}
                        >
                            Roomie
                        </button>
                    </div>
                </div>
                <div className="inputsContainer">
                    <input type="text" className='inputStayFinder' placeholder='Escribe una dirección'/>
                    <MultiRange
                        minValue={minValue}
                        maxValue={maxValue}
                        set_minValue={set_minValue}
                        set_maxValue={set_maxValue}
                        min={min}
                        max={max}
                        actualValue={actualValue}
                        setActualValue={setActualValue}
                    />
                    <InputButton
                        valueInput={gender}
                        setValueInput={setGender}
                        options={['Todos los Generos', 'Solo Hombres', 'Solo Mujeres']}
                    />
                    <InputButton
                        valueInput={pets}
                        setValueInput={setPets}
                        options={['No mascotas', 'Cualquier mascota', 'Solo Perros', 'Solo Gatos']}
                    />
                    <button className="searchButton">
                        <img src="/Graphics/Icons/search_icon.png" 
                        alt="" 
                        style={{width: '100%'}}/>
                    </button>
                    
                </div>
            </section>
        </article>
    );
}

const rooms = [
    { 
      id: 1, 
      name: "Habitación Centro", 
      address: "Av. Juárez 102, Centro, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 2, 
      name: "Habitación Chapultepec", 
      address: "Calle Vidrio 320, Americana, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 3, 
      name: "Habitación Providencia y muchas más mamadas nomás para checar esta madre de la app", 
      address: "Av. Pablo Neruda 1500, Providencia, Guadalajara, JAL y muchas más mamadas nomás para checar esta madre de la app", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 4, 
      name: "Habitación Zapopan", 
      address: "Calle Santa Rita 234, Zapopan, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 5, 
      name: "Habitación Tlaquepaque", 
      address: "Calle Juárez 45, Centro, Tlaquepaque, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 6, 
      name: "Habitación Tonalá", 
      address: "Av. Tonaltecas 555, Tonalá, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 7, 
      name: "Habitación Minerva", 
      address: "Av. Vallarta 2800, Minerva, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    },
    { 
      id: 8, 
      name: "Habitación Andares", 
      address: "Blvd. Puerta de Hierro 5000, Andares, Guadalajara, JAL", 
      image: "/Graphics/roomTr.jpeg" 
    }
  ];
  