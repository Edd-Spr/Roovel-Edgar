import { useState } from 'react';
import Styles from './FriendRequestBox.module.css';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
// import { IoClose } from "react-icons/io5";
import InfoSolicitud from '../../Components/InfoSolicitud/InfoSolucitud.jsx';

const FriendRequestBox = ({ user }) => {
    const [hoverLike, setHoverLike] = useState(false);
    const [hoverDislike, setHoverDislike] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleContainerClick = () => {
        setShowInfo(true);
    };

    // const closeInfo = (e) => {
    //     e.stopPropagation();
    //     setShowInfo(false);
    // };

    return (
        <div className={Styles['friend-request-wrapper']}>
            <div
                className={Styles['friend-request-box__container']}
                onClick={handleContainerClick}
            >
                <div className={Styles['friend-request__photo-container']}>
                    <img 
                        src={user.image} 
                        alt="" 
                        draggable="false"
                        className={Styles['friend-request__photo']}
                    />
                </div>
                <div className={Styles['friend-request__info']}>
                    <p className={Styles['friend-request__username']}>{user.username}</p>
                    <p className={Styles['friend-request__age']}>{user.gender + ' | ' + user.age}</p>

                    <button
                        className={Styles.like}
                        onMouseEnter={() => setHoverLike(true)}
                        onMouseLeave={() => setHoverLike(false)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {hoverLike ? <BiSolidLike /> : <BiLike />}
                    </button>

                    <button
                        className={Styles.dislike}
                        onMouseEnter={() => setHoverDislike(true)}
                        onMouseLeave={() => setHoverDislike(false)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {hoverDislike ? <BiSolidDislike /> : <BiDislike />}
                    </button>
                </div>
            </div>

            {showInfo && (
                <InfoSolicitud />
            )}
        </div>
    );
};

export default FriendRequestBox;
