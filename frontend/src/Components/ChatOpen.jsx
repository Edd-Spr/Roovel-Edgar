import { useState, useEffect, useRef } from 'react';
import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';

const ChatOpen = ({ infoProfile, setIsOpen, user }) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);

    return (
        <section className="ChatOpen">
            <ContactBar infoProfile={infoProfile} setIsOpen={setIsOpen} />
            <MessageContainer infoProfile={infoProfile} user={user} messageContainerHeight={messageContainerHeight} />
            <MessageEditor setMessageContainerHeight={setMessageContainerHeight} />
        </section>
    );
};

function ContactBar({ infoProfile, setIsOpen }) {
    return (
        <div className="contactBar">
            <div className="contactBarPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile.imagen}`} alt="" className='contactBarPhoto' />
            </div>
            <p className="profileName">{infoProfile.nombre}</p>
            <button className="closeChat" onClick={() => setIsOpen(false)}>
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
                <img src={`/PhotoProfiles/${infoProfile.imagen}`} alt="" className='contactBarPhoto' />
            </div>
            <p className="infoName">{infoProfile.nombre}</p>
            <p className="infoDescription">{infoProfile.descripcion}</p>
        </div>
    );
}

function MessageContainer({ infoProfile, user, messageContainerHeight }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!infoProfile.mensajes) return;

        messagesEndRef.current?.scrollIntoView();
    }, [infoProfile.mensajes]);

    return (
        <div className='messageContainer' style={{ height: messageContainerHeight, overflowY: 'auto' }}>
            <InfoChatSection infoProfile={infoProfile} />
            {infoProfile.mensajes?.map((info) => (
                <MessageBox
                    key={info.id}
                    messages={info}
                    chatUserId={infoProfile.id}
                    user={user}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatOpen;