import '../Styles/RoomSlider.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const CustomLeftArrow = ({ onClick }) => (
    <button className="custom-arrow custom-left-arrow" onClick={onClick}>
        <span>
            <img 
                src="/Graphics/Icons/left-row-icon.png" 
                alt="" 
                draggable="false"
                style={{height: '70%'}}
            />
        </span>
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button className="custom-arrow custom-right-arrow" onClick={onClick}>
        <span>
            <img 
                src="/Graphics/Icons/rigth-row-icon.png" 
                alt="" 
                draggable="false"
                style={{height: '70%'}}
            />
        </span>
    </button>
);

const RoomSlider = () => {
    const responsive = {
        static: {
            breakpoint: { max: 4000, min: 0 },
            items: 4,
        },
    };

    return (
        <article className="roomSliderSectionContainer">
            <h1 className="roomSliderTitle">Vistos Reciemtemente</h1>
            <div className="roomSliderContainer">
                <Carousel
                    responsive={responsive}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                >
                    {rooms.map((room) => <RoomBox key={room.id} room={room} />)}
                </Carousel>
            </div>
        </article>
    );
};

const RoomBox = ({room}) =>{
    return (
        <div className='roomBox'>
            <div className="imageContainer">
                <img 
                    src={room.image} 
                    alt="" 
                    style={{height: '100%'}}
                    draggable="false"
                />
            </div>
            <div className='roomBoxInfo'>
                <p className="roomName">{room.name}</p>
                <p className="roomAdress">{room.address}</p>
            </div>
        </div>
    );
}
export default RoomSlider;

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
