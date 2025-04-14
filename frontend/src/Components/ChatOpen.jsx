import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import '../Styles/ChatOpen.css';
import {MessageBox,MessageBoxGroup} from './MessageBox';
import {MessageEditor,MessageEditorGroup} from './MessageEditor';

const socket = io('http://localhost:3000');

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, idRemitente, user, setActualChat, actualChatType, idGroup}) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const [messageList, setMessageList] = useState([]); 
    const mensajesGrops= [
        {
          "id_message": 18,
          "msg_from": 3,
          "msg_for": 1,
          "msg_for_group": 0,
          "msg_seen": 1,
          "msg_received": 1,
          "msg_content": "¿Ya terminaste lo de la base de datos?",
          "msg_datetime": "2025-03-30T10:15:12.000Z"
        },
        {
          "id_message": 19,
          "msg_from": 4,
          "msg_for": 2,
          "msg_for_group": 0,
          "msg_seen": 0,
          "msg_received": 0,
          "msg_content": "Mañana nos vemos a las 9, ¿va?",
          "msg_datetime": "2025-03-30T10:17:44.000Z"
        },
        {
          "id_message": 20,
          "msg_from": 1,
          "msg_for": 3,
          "msg_for_group": 0,
          "msg_seen": 1,
          "msg_received": 1,
          "msg_content": "Ya subí los cambios al repo :)",
          "msg_datetime": "2025-03-30T10:21:09.000Z"
        },
        {
          "id_message": 21,
          "msg_from": 5,
          "msg_for": 1,
          "msg_for_group": 0,
          "msg_seen": 0,
          "msg_received": 0,
          "msg_content": "Ey, revisa lo del servidor cuando puedas",
          "msg_datetime": "2025-03-30T10:25:34.000Z"
        },
        {
          "id_message": 22,
          "msg_from": 1,
          "msg_for": 5,
          "msg_for_group": 0,
          "msg_seen": 0,
          "msg_received": 1,
          "msg_content": "Sí, ya quedó configurado el puerto",
          "msg_datetime": "2025-03-30T10:27:41.000Z"
        },
        {
          "id_message": 23,
          "msg_from": 2,
          "msg_for": 0,
          "msg_for_group": 1,
          "msg_seen": 1,
          "msg_received": 1,
          "msg_content": "Gente, ¿quién se apunta para la expo?",
          "msg_datetime": "2025-03-30T10:30:55.000Z"
        },
        {
          "id_message": 24,
          "msg_from": 4,
          "msg_for": 0,
          "msg_for_group": 1,
          "msg_seen": 0,
          "msg_received": 1,
          "msg_content": "Yo puedo hacer la presentación",
          "msg_datetime": "2025-03-30T10:32:02.000Z"
        },
        {
          "id_message": 25,
          "msg_from": 5,
          "msg_for": 0,
          "msg_for_group": 1,
          "msg_seen": 1,
          "msg_received": 1,
          "msg_content": "Acuérdense de usar el nuevo template",
          "msg_datetime": "2025-03-30T10:33:18.000Z"
        },
        {
          "id_message": 26,
          "msg_from": 3,
          "msg_for": 0,
          "msg_for_group": 1,
          "msg_seen": 0,
          "msg_received": 0,
          "msg_content": "¿Alguien tiene la rúbrica?",
          "msg_datetime": "2025-03-30T10:34:20.000Z"
        },
        {
          "id_message": 27,
          "msg_from": 2,
          "msg_for": 4,
          "msg_for_group": 0,
          "msg_seen": 1,
          "msg_received": 1,
          "msg_content": "Subí las capturas al drive",
          "msg_datetime": "2025-03-30T10:36:11.000Z"
        }
      ]
    console.log('Mensajes de grupo:', mensajesGrops);
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
        <section className={`chatOpenContainer ${chatIsOpen && 'chatIsOpen'}`}>
            {actualChatType === 'grupo' ?
                <ChatGroupOpen
                    infoProfile={infoProfile}
                    chatIsOpen={chatIsOpen}
                    setChatIsOpen={setChatIsOpen}
                    user={user}
                    setActualChat={setActualChat}
                    messageContainerHeight={messageContainerHeight}
                    setMessageContainerHeight={setMessageContainerHeight}
                    messageList={mensajesGrops}
                />:
                <ChatContactOpen
                    infoProfile={infoProfile}
                    chatIsOpen={chatIsOpen}
                    setChatIsOpen={setChatIsOpen}
                    idRemitente={idRemitente}
                    user={user}
                    setActualChat={setActualChat}
                    messageContainerHeight={messageContainerHeight}
                    setMessageContainerHeight={setMessageContainerHeight}
                    messageList={messageList}
                />}
        </section>
    );
};


const ChatContactOpen = ({setChatIsOpen, infoProfile, idRemitente, user, setActualChat, messageContainerHeight, setMessageContainerHeight, messageList }) => {
    return (
        <section className="ChatOpen">
            <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
            <MessageContainer
                infoProfile={infoProfile}
                user={user}
                messageContainerHeight={messageContainerHeight}
                messageList={messageList} 
            />
            <MessageEditor 
                setMessageContainerHeight={setMessageContainerHeight} 
                idReciveMessague={idRemitente} 
                idSentMessage={user} />
        </section>
    )
}
const ChatGroupOpen = ({ setChatIsOpen, infoProfile, user, setActualChat, messageContainerHeight, setMessageContainerHeight, idGruop, messageList}) => {

    return (
        <section className="ChatOpen" style={{ backgroundColor: '#f0f0f0' }}>
            <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
            <MessageContainerGroups
                infoProfile={infoProfile}
                user={user}
                messageContainerHeight={messageContainerHeight}
                mensajesGrops={messageList} 
            />
            <MessageEditorGroup 
                setMessageContainerHeight={setMessageContainerHeight}
                idGruop={idGruop}
                idSentMessage={user}
            />
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

function MessageContainerGroups({ infoProfile, user, messageContainerHeight, mensajesGrops }) {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (mensajesGrops.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mensajesGrops]);

    return (
        <div className="messageContainer" style={{ height: messageContainerHeight, overflowY: 'auto' }}>
            {mensajesGrops.map((info, index) => (
                <MessageBoxGroup
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