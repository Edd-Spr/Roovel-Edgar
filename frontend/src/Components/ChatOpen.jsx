import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';

const ChatOpen = ({infoProfile, setIsOpen}) =>{
    return (
        <section className="ChatOpen">
            <ContactBar infoProfile={infoProfile} setIsOpen={setIsOpen}/>
            <InfoChatSection infoProfile={infoProfile}/>
            <MessageContainer infoProfile={infoProfile}/>
            <MessageEditor/>
        </section>
    )
}

function ContactBar({infoProfile, setIsOpen}){

    return (
        <div className="contactBar">
            <div className="contactBarPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile.imagen}`} alt="" className='contactBarPhoto'/>
            </div>
            <p className="profileName">{infoProfile.nombre}</p>
            <button className="closeChat" onClick={() => setIsOpen(false)}>x</button>
        </div>
    );
}

function InfoChatSection({infoProfile}){
    return (
        <div className="infoChatSection">
            <div className="InfoPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile.imagen}`} alt="" className='contactBarPhoto'/>
            </div>

            <p className="infoName">{infoProfile.nombre}</p>

            <p className="infoDescription">{infoProfile.descripcion}</p>

        </div>
    );
}

function MessageContainer({infoProfile}){
    
    return (
        <div style={{width: '100%', minHeight: '35vh'}}>
            {infoProfile.mensajes.map((info) => 
            <MessageBox 
                messages={info}
                chatUserId={infoProfile.id}
            />)}
        </div>
    );
}
export default ChatOpen;