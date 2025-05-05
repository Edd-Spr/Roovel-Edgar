import Styles from './FriendRequestBox.module.css'

const FriendRequestBox = ({user}) => {
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
      const age =  ageInYears(user.birthday);
    return (
        <div className={Styles['friend-request-box__container']}>
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
            </div>
        </div>
    )
}

export default FriendRequestBox;