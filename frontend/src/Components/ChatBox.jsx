import '../Styles/ChatBox.css'

const ChatBox = ({image, name, actualChat, setActualChat, setChatIsOpen, infoProfile, barChatOpen, setBarChatOpen, barChatType, chatKey}) =>{

    const barChatOpenComparation = (barChatOpen == barChatType);
    function click(){

        setActualChat(infoProfile.id);
        setChatIsOpen(true);
        setBarChatOpen(barChatOpen=barChatType);

    }

    return (
        <button 
            className={`chatBox`}
            onClick={() => click()} 
            style={{
                ...(actualChat == chatKey && { backgroundColor: '#FFFFFF' }),
                width: barChatOpenComparation ? '25vw' : '4rem',
                minWidth: barChatOpenComparation ? '18rem' : '4rem',
              }}
        >

            <ProfilePhoto
                image={image}
            />
        
            <ContentChatBox
                name={name}
                barChatOpen={barChatOpen}
            />
            
        </button>
    );
}

const ProfilePhoto = ({image, barChatOpen}) => {

    return (
        <div className="photoSectionContainer">
            <div className="photoContainer">
                <img 
                    src = {`/PhotoProfiles/${image}`} 
                    alt="" 
                    className='photoProfile'
                    draggable={false}
                />
            </div>
        </div>

    );
}

const ContentChatBox = ({name}) => {

    return (
        <>
            <section className='contentChatBoxContainer'>
                
                <div className="upContent">
                    <div className="textContainer">
                        <p className="nameProfile">{name}</p>
                    </div>
                    <div className="timeContainer">
                        <p className='timeMessage'>00:00</p>
                    </div>
                </div>
                <div className="lastMessageContainer">
                        <p className="lastMessage">Hola, que tal? Como estás chavalo?</p>
                </div>
            </section>
        </>
    );
}

export default ChatBox;