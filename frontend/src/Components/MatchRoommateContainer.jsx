import { useState } from 'react';
import '../Styles/MatchRoommateContainer.css'
//, '/PhotoProfiles/kit-2.jpeg', '/PhotoProfiles/kit-3.jpeg', '/PhotoProfiles/kit-4.jpeg'
const PROFILES = [
    {
        id: 1,
        name: 'Kit Connor',
        age: 21,
        genre: 'Hombre',
        description: 'Hey! Soy Kit, actor y amante del cine. Busco un roomie buena onda con quien compartir un espacio acogedor. Me encanta el fitness, las charlas profundas y ver pelis los fines de semana. Si tienes mascotas, mejor aún. 🚀',
        images:  ['/PhotoProfiles/kit-1.jpeg', '/PhotoProfiles/kit-2.jpeg', '/PhotoProfiles/kit-3.jpeg', '/PhotoProfiles/kit-4.jpeg'],
        tags: ['Actor', 'Cinéfilo', 'Fitness', 'Extrovertido', 'Amante de los animales', 'Pet Friendly'],
        location: 'Londres, Reino Unido',
        pets: true,
    },
    {
        id: 2,
        name: 'Kit',
        description: 'Hey! Soy Kit, actor y amante del cine. Busco un roomie buena onda con quien compartir un espacio acogedor. Me encanta el fitness, las charlas profundas y ver pelis los fines de semana. Si tienes mascotas, mejor aún. 🚀',
        images: ['kit-1.jpeg', 'kit-2.jpeg', 'kit-3.jpeg', 'kit-4.jpeg'],
        tags: ['Actor', 'Cinéfilo', 'Fitness', 'Extrovertido', 'Amante de los animales'],
        location: 'Londres, Reino Unido',
        pets: true,
    }
];

const MatchRoommateContainer = () => {

    const userCard = PROFILES.find((item) => item.id == 1)
    const [actualImage, setActualImage] = useState(0)
    const [infoIsOpen, setInfoIsOpen] = useState(false)

    function back(){
        if (actualImage > 0){
            setActualImage(actualImage-1)
        }
    }
    function next(){
        if (actualImage < userCard.images.length - 1){
            setActualImage(actualImage+1)
        }
    }
    return (
        <article className='matchRoommateContainer'>
            <section className="matchCardContainer">
                <div className="cardContainer">
                    <MatchCard
                        back={back}
                        next={next}
                        userCard={userCard}
                        actualImage={actualImage}
                        setInfoIsOpen={setInfoIsOpen}
                    />
                    <ProfileCardInfo
                        userCard={userCard}
                        infoIsOpen={infoIsOpen}
                        setInfoIsOpen={setInfoIsOpen}
                    />
                </div>
            </section>
        </article>
    );
};

const MatchCard = ({back, next, userCard, actualImage, setInfoIsOpen}) => {

    const [isHover, setIsHover] = useState(false);
    return (
        <section 
            className="matchCard"
            onMouseEnter={() => { setIsHover(true)}}
            onMouseLeave={() => { setIsHover(false)}}>
            <img 
                src={userCard.images[actualImage]} 
                alt="" 
                className='matchCardProfileImage'
                draggable="false"
            />
            <ActiveThumbnail images={userCard.images} actualImage={actualImage}/>
            {actualImage > 0 &&<button className="imageButton" style={{ 
                                    left: '2vh', 
                                    opacity: isHover ? 1 : 0, 
                                    transition: 'opacity 0.3s ease' 
                                }}  onClick={back}>
                <img 
                    src="/Graphics/Icons/arrow_back.png" 
                    alt="" 
                    draggable="false"
                    style={{width: '100%'}}
                />
            </button>}
            {actualImage < userCard.images.length -1 && <button className="imageButton"  style={{ 
                                    right: '2vh', 
                                    opacity: isHover ? 1 : 0, 
                                    transition: 'opacity 0.3s ease' 
                                }} onClick={next}>
                <img 
                    src="/Graphics/Icons/arrow_forward.png" 
                    alt="" 
                    draggable="false"
                    style={{width: '100%'}}
                />
            </button>}
            <MatchActions setInfoIsOpen={setInfoIsOpen} userCard={userCard}/>
        </section>
    )
}
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

const MatchActions = ({setInfoIsOpen, userCard}) => {
    function click(){
        setInfoIsOpen(true);
    }
    return (
        <section className='matchActions'>
            <div className="firstInfoContainer">
                <div className="ageAndNameInfoCardContainer">
                    <p className='profileNameMatchCard'>{userCard.name}</p>
                    <p className="profileAgeMatchCard">{userCard.age}</p>
                </div>
                <p className='profileLocationMatchCard'>{userCard.location}</p>
            </div>
            <div className="actionButtonsContainer">
                <button className="smallInteractWithMatchCard">-</button>
                <button className="interactWithMatchCard">
                    <img 
                        src="/Graphics/Icons/dislike.png" 
                        alt="" 
                        draggable="false"
                        style={{width: '50%'}}
                    />
                </button>
                <button className="interactWithMatchCard">
                    <img 
                        src="/Graphics/Icons/like.png" 
                        alt="" 
                        draggable="false"
                        style={{width: '50%'}}
                    />
                </button>
                <button className="smallInteractWithMatchCard" onClick={click}>+</button>
            </div>
        </section>
    );
}

const ProfileCardInfo = ({userCard, infoIsOpen, setInfoIsOpen}) => {

    function close(){
        setInfoIsOpen(false);
    }

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
                        <p className="profileAgeMatchCard" style={{color: '#878787'}}>{userCard.age}</p>
                    </div>
                    <p className='profileLocationMatchCard' style={{color: '#878787'}}>{userCard.location}</p>
                </div>

                <div className="tagsContainer">
                    {userCard.tags.map((tag, index)=> <p key={index} className="tagProfileCard">{tag}</p>)}
                </div>

                <div className="lookingForContainer">

                </div>
            </section>
        </section>
    )
}

export default MatchRoommateContainer;