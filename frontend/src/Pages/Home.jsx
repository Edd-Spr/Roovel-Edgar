import { useState } from 'react';
import '../Styles/PagesStyles/Home.css'

const Home = () => {
    return (
        <>
            <FeaturesCarousel/>
            <StayFinder/>
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
            <img src={actualCarouselBox.image} alt="" className="carouselImage"/>
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
const CarouselButtons = ({actualCarousel, setActualCarousel}) =>{
    return(
        <section className='carouselButtonsContainer'>
            {CAROUSEL_CONTENT.map((item) => 
                <CarouselButton 
                    name={item.buttonName}
                    id={item.id}
                    actualCarousel={actualCarousel}
                    setActualCarousel={setActualCarousel}
                />)}
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
    return (
        <article className="stayFinderContainer">
            <section className="stayFinderBox">
                
            </section>
        </article>
    );
}