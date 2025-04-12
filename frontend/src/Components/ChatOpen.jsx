import { useState, useEffect, useRef } from 'react';
import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';
import { getMessages } from '../templade/callback_chat_messges.js';

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, idRemitente, user, setActualChat, actualChatType}) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const [mensajes, setMensajes] = useState([]);
    const parasite = mensajes;

    const fetchMessages = async () => {
        try {
            const response = await getMessages(user, idRemitente);
            setMensajes(response);
            console.log('Mensajes obtenidos:', response);
        } catch (error) {
            console.error('Error al obtener los mensajes iniciales:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);
        return () => clearInterval(interval);
    }, [idRemitente, user]);

    return (
        <section className={`chatOpenContainer ${chatIsOpen && 'chatIsOpen'}`}>
            {actualChatType == 'grupo' ? 
                <ChatGroupOpen
                    infoProfile={infoProfile}
                    setChatIsOpen={setChatIsOpen}
                    setActualChat={setActualChat}
                    user={user}
                    messageContainerHeight={messageContainerHeight}
                    parasite={parasite}
                    idRemitente={idRemitente}
                    setMessageContainerHeight={setMessageContainerHeight}
                /> :
                <ChatContactOpen
                    infoProfile={infoProfile}
                    setChatIsOpen={setChatIsOpen}
                    setActualChat={setActualChat}
                    user={user}
                    messageContainerHeight={messageContainerHeight}
                    parasite={parasite}
                    idRemitente={idRemitente}
                    setMessageContainerHeight={setMessageContainerHeight}
                />
            }
        </section>
    );
};

function ChatContactOpen({ infoProfile, setChatIsOpen, setActualChat, user, messageContainerHeight, parasite, idRemitente, setMessageContainerHeight }) {
    return (
        <section className="ChatOpen">
            <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
            <MessageContainer
                infoProfile={infoProfile}
                user={user}
                messageContainerHeight={messageContainerHeight}
                parasite={parasite}
            />
            <MessageEditor
                setMessageContainerHeight={setMessageContainerHeight}
                idReciveMessague={idRemitente}
                idSentMessage={user}
            />
        </section>
    );
}
function ChatGroupOpen({ infoProfile, setChatIsOpen, setActualChat, user, messageContainerHeight, parasite, idRemitente, setMessageContainerHeight }) {
    return (
        <section className="ChatOpen" style={{backgroundColor: '#F0F0F0'}}>
            <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
            <MessageContainer
                infoProfile={infoProfile}
                user={user}
                messageContainerHeight={messageContainerHeight}
                parasite={parasite}
            />
            <MessageEditor
                setMessageContainerHeight={setMessageContainerHeight}
                idReciveMessague={idRemitente}
                idSentMessage={user}
            />
        </section>
    );
}

function ContactBar({ infoProfile, setChatIsOpen, setActualChat }) {
    const close = () => {
        setChatIsOpen(false);
        setTimeout(() => setActualChat(''), 400);
    };

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

    useEffect(() => {
        if (!parasite) return;
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [parasite]);

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