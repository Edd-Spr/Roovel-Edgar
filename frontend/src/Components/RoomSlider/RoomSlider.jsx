import { useState, useEffect } from 'react';
import Styles from './RoomSlider.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RoomSliderSkeleton from './RoomSliderSkeleton';

const CustomLeftArrow = ({ onClick }) => (
    <button className={`${Styles["custom-arrow"]} ${Styles["custom-left-arrow"]}`} onClick={onClick}>
        <span>
            <img 
                src="/Graphics/Icons/arrow_back.png" 
                alt="" 
                draggable="false"
                style={{ width: '70%', height: '70%', marginLeft: '8px', marginTop: '4px' }}
            />
        </span>
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button className={`${Styles["custom-arrow"]} ${Styles["custom-right-arrow"]}`} onClick={onClick}>
        <span>
            <img 
                src="/Graphics/Icons/arrow_forward.png" 
                alt="" 
                draggable="false"
                style={{ width: '70%', height: '70%', marginTop: '5px' }}
            />
        </span>
    </button>
);

const RoomSlider = ({ roomSliderTitle, rooms }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const responsive = {
        static: {
            breakpoint: { max: 4000, min: 0 },
            items: 4,
        },
    };

    return (
        <article className={Styles.roomSliderSectionContainer}>
            <h1 className={Styles.roomSliderTitle}>{roomSliderTitle}</h1>
            <div className={Styles.roomSliderContainer}>
                {isLoading ? (
                    <RoomSliderSkeleton />
                ) : (
                    <Carousel
                        responsive={responsive}
                        customLeftArrow={<CustomLeftArrow />}
                        customRightArrow={<CustomRightArrow />}
                    >
                        {rooms.map((room) => <RoomBox key={room.id} room={room} />)}
                    </Carousel>
                )}
            </div>
        </article>
    );
};

const RoomBox = ({ room }) => {
    return (
        <div className={Styles.roomBox}>
            <div className={Styles.imageContainer}>
                <img 
                    src={room.image} 
                    alt="" 
                    style={{ height: '100%' }}
                    draggable="false"
                />
            </div>
            <div className={Styles.roomBoxInfo}>
                <p className={Styles.roomName}>{room.name}</p>
                <p className={Styles.roomAdress}>{room.address}</p>
            </div>
        </div>
    );
};

export default RoomSlider;