import { useState, useEffect, useRef } from 'react';
import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';
import { getMessages } from '../templade/callback_chat_messges.js';

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, idRemitente, user, setActualChat }) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const [mensajes, setMensajes] = useState([]); // Estado para los mensajes
    const parasite = mensajes; // Alias para los mensajes

    // Función para obtener mensajes
    const fetchMessages = async () => {
        try {
            const response = await getMessages(user, idRemitente); // Llamar a la función getMessages
            setMensajes(response); // Actualizar el estado con los mensajes obtenidos
            console.log('Mensajes obtenidos:', response);
        } catch (error) {
            console.error('Error al obtener los mensajes iniciales:', error);
        }
    };

    // useEffect para actualizar los mensajes cada 1 segundo
    useEffect(() => {
        fetchMessages(); // Llamar a la función inmediatamente al montar el componente

        const interval = setInterval(() => {
            fetchMessages(); 
        }, 2000);

        return () => clearInterval(interval); 
    }, [idRemitente, user]); 
    return (
        <section className="chatOpenContainer" style={{ width: chatIsOpen && '55vw' }}>
            <section className="ChatOpen">
                <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
                <MessageContainer
                    infoProfile={infoProfile}
                    user={user}
                    messageContainerHeight={messageContainerHeight}
                    parasite={parasite} // Pasar parasite como prop
                />
                <MessageEditor setMessageContainerHeight={setMessageContainerHeight} idReciveMessague={idRemitente} idSentMessage={user} />
            </section>
        </section>
    );
};

function ContactBar({ infoProfile, setChatIsOpen, setActualChat }) {
    function close() {
        setChatIsOpen(false);
        setTimeout(() => setActualChat(''), 400);
    }

    return (
        <div className="contactBar">
            <div className="contactBarPhotoContainer">
                <img src={`/PhotoProfiles/${infoProfile?.imagen}`} alt="" className="contactBarPhoto" />
            </div>

            <p className="profileName">{infoProfile?.nombre}</p>

            <button className="closeChat" onClick={close}>
                <img src="/Graphics/Icons/close.png" alt="" style={{ width: '100%' }} />
            </button>
        </div>
    );
}

function MessageContainer({ infoProfile, user, messageContainerHeight, parasite }) {
    const messagesEndRef = useRef(null);

    // Efecto para hacer scroll al final de los mensajes
    useEffect(() => {
        if (!parasite) return;

        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [parasite]); // Dependencia: parasite

    return (
        <div className="messageContainer" style={{ height: messageContainerHeight, overflowY: 'auto' }}>
            {parasite.map((info, index) => (
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