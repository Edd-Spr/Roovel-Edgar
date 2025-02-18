import '../Styles/ChatBox.css'

const ChatBox = ({image, name, setActualChat, setIsOpen, infoProfile, barChatOpen, setBarChatOpen, barChatType}) =>{

    const barChatOpenComparation = (barChatOpen == barChatType);
    function click(){

        setActualChat(infoProfile.id);
        setIsOpen(true);
        setBarChatOpen(barChatOpen=barChatType);

    }

    return (
        <button className="chatBox" onClick={() => click()} style={{ width: barChatOpenComparation ? '20vw' : '9vh' }}>

            <ProfilePhoto
                image={image}
            />
            
            {barChatOpen == barChatType &&
                <ContentChatBox
                    name={name}
                    barChatOpen={barChatOpen}
                />
            }
        </button>
    );
}

const ProfilePhoto = ({image, barChatOpen}) => {

    return (
        <div className="photoContainer"   style={barChatOpen ? {marginLeft: '2vh', marginRight: '3vh'} : {margin: '0'}}>
            <img src = {`/PhotoProfiles/${image}`} alt="" className='photoProfile'/>
        </div>
    );
}

const ContentChatBox = ({name}) => {

    return (
        <>
            <div className="textContainer">
                <p className="nameProfile">{name}</p>
            </div>
            <div className="timeContainer">

            </div>
        </>
    );
}

export default ChatBox;