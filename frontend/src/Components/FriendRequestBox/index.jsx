import Styles from './FriendRequestBox.module.css'

const FriendRequestBox = ({user}) => {
    return (
        <div className={Styles['friend-request-box__container']}>
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
            </div>

            {showInfo && (
                <InfoSolicitud />
            )}
        </div>
    );
};

export default FriendRequestBox;
