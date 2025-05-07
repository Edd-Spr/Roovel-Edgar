import Styles from './FriendRequestBox.module.css';
import { useState, useRef, useEffect } from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import InfoSolicitud from '../../Components/InfoSolicitud/InfoSolucitud.jsx';

const FriendRequestBox = ({ user }) => {
    const [hoverLike, setHoverLike] = useState(false);
    const [hoverDislike, setHoverDislike] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const modalRef = useRef(); // Referencia para el modal
    console.log('user -------', user.id);

    // Manejador de clic para abrir/cerrar el modal
    const handleContainerClick = () => {
        setShowInfo(!showInfo);
    };

    // Detectar clic fuera del modal para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowInfo(false); // Cierra el modal cuando se hace clic fuera
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Calcular edad a partir de la fecha de nacimiento
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
                onClick={handleContainerClick} // Muestra el modal al hacer clic en el contenedor
            >
                <div className={Styles['friend-request__photo-container']}>
                    <img
                        src={`http://localhost:3000/${user.image}`}
                        alt="User"
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
                    <div className={Styles.modalContent} ref={modalRef}>
                        {user && user.id ? (
                            <InfoSolicitud idCurrentUserSenn={user.id} />
                        ) : (
                            <p>Loading user information...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FriendRequestBox;
