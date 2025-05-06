import Styles from './FriendRequestBox.module.css';
import { useState } from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import InfoSolicitud from '../../Components/InfoSolicitud/InfoSolucitud.jsx';

const FriendRequestBox = ({ user }) => {
    const [hoverLike, setHoverLike] = useState(false);
    const [hoverDislike, setHoverDislike] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    console.log('user -------', user.id);
    const handleContainerClick = () => {
        setShowInfo(!showInfo); // Alterna el estado de showInfo
    };

    const handleCloseModal = () => {
        setShowInfo(false); // Cierra el modal
    };

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

    const age = ageInYears(user.birthday);

    return (
        <>
            <div
                className={Styles['friend-request-box__container']}
                onClick={handleContainerClick} // Muestra el modal al hacer clic
            >
                <div className={Styles['friend-request__photo-container']}>
                    <img
                        src={`http://localhost:3000/${user.image}`}
                        alt=""
                        draggable="false"
                        className={Styles['friend-request__photo']}
                    />
                </div>
                <div className={Styles['friend-request__info']}>
                    <p className={Styles['friend-request__username']}>{user.username}</p>
                    <p className={Styles['friend-request__age']}>{user.gender + ' | ' + age}</p>
                    <button
                        className={Styles.like}
                        onMouseEnter={() => setHoverLike(true)}
                        onMouseLeave={() => setHoverLike(false)}
                        onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal
                    >
                        {hoverLike ? <BiSolidLike /> : <BiLike />}
                    </button>

                    <button
                        className={Styles.dislike}
                        onMouseEnter={() => setHoverDislike(true)}
                        onMouseLeave={() => setHoverDislike(false)}
                        onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal
                    >
                        {hoverDislike ? <BiSolidDislike /> : <BiDislike />}
                    </button>
                </div>
            </div>

            {/* Modal para mostrar InfoSolicitud */}
            {showInfo && (
                <div className={Styles.modalOverlay}>
                    <div className={Styles.modalContent}>
                        <button className={Styles.closeButton} onClick={handleCloseModal}>
                            Cerrar
                        </button>
                        {console.log('user.id', user.id)}
                        <InfoSolicitud idCurrentUserSenn={user.id} />
                    </div>
                </div>
            )}
        </>
    );
};

export default FriendRequestBox;