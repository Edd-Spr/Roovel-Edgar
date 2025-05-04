import { useState, useEffect, useRef, act } from 'react';
import { io } from 'socket.io-client';
import '../Styles/ChatOpen.css';
import {MessageBox,MessageBoxGroup} from './MessageBox';
import {MessageEditor,MessageEditorGroup} from './MessageEditor';

const socket = io('http://localhost:3000');

const ChatOpen = ({ chatIsOpen, setChatIsOpen, infoProfile, idRemitente, user, actualChat, setActualChat, actualChatType, idGroup}) => {
    const [messageContainerHeight, setMessageContainerHeight] = useState(window.innerHeight * 0.85);
    const [messageList, setMessageList] = useState([]); 
    const [mensajesGrops, setMensajesGrops] = useState([]);


    console.log('ChatOpen', idRemitente, user, actualChatType, actualChat);
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

    useEffect(() => {
        if (!idGroup || !user) return;
    
        socket.emit('fecth messagueGruop', { idGruopchat: idGroup });

        socket.on('fecth messagueGruop response', (messagesGruops) => {
            console.log('Mensajes históricos del grupo:', messagesGruops);
            setMensajesGrops(messagesGruops); 
        });
    
        socket.on('new message group', (newMessage) => {
            console.log('Nuevo mensaje de grupo recibido:', newMessage);
            if (!newMessage || !newMessage.idSentMessage || !newMessage.idGruop || !newMessage.message) {
                console.error('Formato de mensaje inválido:', newMessage);
                return;
            }
            socket.emit('fecth messagueGruop', { idGruopchat: idGroup });
        });
    
        return () => {
            socket.off('fecth messagueGruop response');
            socket.off('new message group');
        };
    }, [idGroup, user]);

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
                    idGroup={idGroup}
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
                    actualChat={actualChat}
                />}
        </section>
    );
};


const ChatContactOpen = ({setChatIsOpen, infoProfile, idRemitente, user, setActualChat, messageContainerHeight, setMessageContainerHeight, messageList, actualChat }) => {
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
                idSentMessage={user} 
                actualChat={actualChat}
            />
                
        </section>
    )
}

const ChatGroupOpen = ({ setChatIsOpen, infoProfile, user, setActualChat, messageContainerHeight, setMessageContainerHeight, idGroup, messageList}) => {
    console.log('Mensajes de grupo:', idGroup);
    return (
        <section className="ChatOpen">
            <ContactBar infoProfile={infoProfile} setChatIsOpen={setChatIsOpen} setActualChat={setActualChat} />
            <MessageContainerGroups
                infoProfile={infoProfile}
                user={user}
                messageContainerHeight={messageContainerHeight}
                mensajesGrops={messageList} 
            />

            <MessageEditorGroup 
                setMessageContainerHeight={setMessageContainerHeight}
                idGroup={idGroup}
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
                <img src={`/PhotoProfiles/${infoProfile?.imagen}`} alt="" className="contactBarPhoto" draggable="false" />
            </div>

            <p className="profileName">{infoProfile?.nombre}</p>

            <button className="closeChat" onClick={close}>
                <img src="/Graphics/Icons/close_dark.png" alt="" style={{ width: '100%' }} />
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