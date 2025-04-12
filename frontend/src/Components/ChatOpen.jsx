import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../Styles/ChatOpen.css';
import MessageBox from './MessageBox';
import MessageEditor from './MessageEditor';

const socket = io('http://localhost:3000');

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, idRemitente, user, setActualChat }) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const [messageList, setMessageList] = useState([]); // Renombrado de menssgeContainer a messageList

    useEffect(() => {
        if (!idRemitente || !user) return;

        socket.emit('fetch messages', { idReciveMessague: idRemitente, idSentMessage: user });

        socket.on('fetch messages response', (messages) => {
            console.log('Mensajes históricos:', messages);
            setMessageList(messages); 
        });

        socket.on('new message', (newMessage) => {
            console.log('Nuevo mensaje recibido:', newMessage);
            if (!newMessage || !newMessage.id || !newMessage.idReciveMessague || !newMessage.idSentMessage || !newMessage.message) {
                console.error('Formato de mensaje inválido:', newMessage);
                return;
            }
            socket.emit('fetch messages', { idReciveMessague: idRemitente, idSentMessage: user });
        });

        return () => {
            socket.off('fetch messages response');
            socket.off('new message');
        };
    }, [idRemitente, user]);

    return (
        <section className="chatOpenContainer" style={{ width: chatIsOpen && '55vw' }}>
            <section className="ChatOpen">
                <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
                <MessageContainer
                    infoProfile={infoProfile}
                    user={user}
                    messageContainerHeight={messageContainerHeight}
                    messageList={messageList} 
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

function MessageContainer({ infoProfile, user, messageContainerHeight, messageList }) {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messageList.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    return (
        <div className="messageContainer" style={{ height: messageContainerHeight, overflowY: 'auto' }}>
            {messageList.map((info, index) => (
                <MessageBox
                    key={info.id || index} 
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