import './RoomSlider.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const CustomLeftArrow = ({ onClick }) => (
    <button className="custom-arrow custom-left-arrow" onClick={onClick}>
        <span>
            <img 
                src="/Graphics/Icons/arrow_back.png" 
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
                src="/Graphics/Icons/arrow_forward.png" 
                alt="" 
                draggable="false"
                style={{height: '70%'}}
            />
        </span>
    </button>
);

const RoomSlider = ({roomSliderTitle, rooms}) => {
    const responsive = {
        static: {
            breakpoint: { max: 4000, min: 0 },
            items: 4,
        },
    };

    return (
        <article className="roomSliderSectionContainer">
            <h1 className="roomSliderTitle">{roomSliderTitle}</h1>
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

