import { useState, useEffect, useRef } from 'react';
import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, user, setActualChat }) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const idReciveMessague = infoProfile?.id; // ID del destinatario
    const idSentMessage = user; // ID del remitente (usuario actual)

    return (
        <section className="chatOpenContainer" style={{ width: chatIsOpen && '55vw' }}>
            <section className="ChatOpen">
                <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
                <MessageContainer infoProfile={infoProfile} user={user} messageContainerHeight={messageContainerHeight} />
                <MessageEditor setMessageContainerHeight={setMessageContainerHeight} idReciveMessague={idReciveMessague} idSentMessage={idSentMessage} />
            </section>
        </section>
    );
};

function ContactBar({ infoProfile, setChatIsOpen, setActualChat }) {

    function close(){
        setChatIsOpen(false) 
        setTimeout(() => setActualChat(''), 400)
        
    }
    return (
        <div className="contactBar">
            <div className="contactBarPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile?.imagen}`} alt="" className="contactBarPhoto" />
            </div>

            <p className="profileName">{infoProfile?.nombre}</p>
    
            <button className="closeChat" onClick={close}>
                <img 
                    src="/Graphics/Icons/close.png" 
                    alt="" 
                    style={{width: '100%'}}
                    />
            </button>
        </div>
    );
}

function InfoChatSection({ infoProfile }) {
    return (
        <div className="infoChatSection">
            <div className="InfoPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile?.imagen}`} alt="" className='contactBarPhoto' />
            </div>
            <p className="infoName">{infoProfile?.nombre}</p>
            <p className="infoDescription">{infoProfile?.descripcion}</p>
        </div>
    );
}

function MessageContainer({ infoProfile, user, messageContainerHeight }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!infoProfile?.mensajes) return;

        messagesEndRef.current?.scrollIntoView();
    }, [infoProfile?.mensajes]);

    return (
        <div className='messageContainer' style={{ height: messageContainerHeight, overflowY: 'auto' }}>
            {infoProfile?.mensajes?.map((info, index) => (
                <MessageBox
                    key={index}
                    messages={info}
                    chatUserId={infoProfile?.id}
                    user={user}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatOpen;