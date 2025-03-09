import '../Styles/ChatBox.css'

const ChatBox = ({image, name, actualChat, setActualChat, setIsOpen, infoProfile, barChatOpen, setBarChatOpen, barChatType, chatKey}) =>{

    const barChatOpenComparation = (barChatOpen == barChatType);
    function click(){

        setActualChat(infoProfile.id);
        setIsOpen(true);
        setBarChatOpen(barChatOpen=barChatType);

    }

    return (
        <button 
            className="chatBox" 
            onClick={() => click()} 
            style={{
                ...(actualChat == chatKey && { backgroundColor: '#FFFFFF' }),
                width: barChatOpenComparation ? '20vw' : '9vh'
              }}
        >

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
        <div className="photoSectionContainer">
            <div className="photoContainer"   style={barChatOpen ? {marginLeft: '2vh', marginRight: '3vh'} : {margin: '0'}}>
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