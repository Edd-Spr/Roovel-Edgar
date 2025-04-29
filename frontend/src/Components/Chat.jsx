import { useState, useEffect } from 'react'; // Agregar useEffect aquí
import '../Styles/chatsContainer.css';

import ChatOpen from './ChatOpen.jsx';
import ChatBox from './ChatBox.jsx';
import ContactsContainer from './ContactsContainer.jsx';
import { getPorfiles, getGroups } from '../templade/callback_chat_messges.js';
import FriendRequestBox from './FriendRequestBox/index.jsx';

const Chat = () =>{
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [actualChat, setActualChat] = useState('');
  const [actualChatType, setActualChatType] = useState(''); // Estado para almacenar el tipo de chat
  const [barChatOpen, setBarChatOpen] = useState(true);
  const [leftBarButtonPressed, setLeftBarButtonPressed] = useState(false);
  const [activeSection, setActiveSection] = useState('chats');
  const [user, setUser] = useState(1);
  const [perfiles, setPerfiles2] = useState([]); 
  const [grupos, setGrupos] = useState([]); // Estado para almacenar los grupos

  const friendRequestUsers = [
    {
      id: 1,
      username: 'Benito Camelo',
      age: 22,
      gender: 'Hombre',
      image: '/PhotoProfiles/imagen1.jpeg',
    },
    {
      id: 2,
      username: 'Irma Mando',
      age: 24,
      gender: 'Mujer',
      image: '/PhotoProfiles/imagen2.jpeg',
    },
    {
      id: 3,
      username: 'Debora Melo',
      age: 19,
      gender: 'No Binario',
      image: '/PhotoProfiles/imagen3.jpeg',
    }
  ]
  /*


   */

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const perfiles = await getPorfiles(user); 
        setPerfiles2(perfiles); 
      } catch (error) {
        console.error('Error al obtener los perfiles:', error);
      }
    };

    fetchProfiles(); 
  }, [user]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const grupos = await getGroups(user);
        setGrupos(grupos);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };
    fetchGroups();
  }, [user]);



  const remitente = [...perfiles, ...grupos].find((perfil) => perfil.id === actualChat)?.idRemitente;
  const idGroup = [...grupos].find((perfil) => perfil.id === actualChat)?.GroupReference;
  console.log('###',idGroup)
  return (
    <article className={`chatContainer ${chatIsOpen ? 'chatContainerOpen' : ''}`}>
      <section style={{ zIndex: '1000', display: 'flex' }}>
        <LeftBarChat
          grupos={grupos}
          barChatOpen={barChatOpen}
          setBarChatOpen={setBarChatOpen}
          actualChat={actualChat}
          setActualChat={setActualChat}
          setChatIsOpen={setChatIsOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          leftBarButtonPressed={leftBarButtonPressed}
          setLeftBarButtonPressed={setLeftBarButtonPressed}
          setActualChatType={setActualChatType}
          friendRequestUsers={friendRequestUsers}
        />

        {activeSection === 'chats' ? (
          <ContactsContainer
            actualChat={actualChat}
            setActualChat={setActualChat}
            setChatIsOpen={setChatIsOpen}
            perfiles={perfiles}
            barChatOpen={barChatOpen}
            setBarChatOpen={setBarChatOpen}
            setActualChatType={setActualChatType}
          />
        ) : (
          <FriendsRequest friendRequestUsers={friendRequestUsers} />
        )}
      </section>

      <ChatOpen
        chatIsOpen={chatIsOpen}
        setChatIsOpen={setChatIsOpen}
        infoProfile={[...perfiles, ...grupos].find((perfil) => perfil.id === actualChat)}
        idRemitente={remitente}
        user={user}
        setActualChat={setActualChat}
        actualChatType={actualChatType}
        setActualChatType={setActualChatType}
        idGroup={idGroup}
      />
    </article>
  );
}

const LeftBarChat = ({
    grupos,
    barChatOpen,
    setBarChatOpen,
    actualChat,
    setActualChat,
    setChatIsOpen,
    activeSection,
    setActiveSection,
    leftBarButtonPressed,
    setLeftBarButtonPressed,
    setActualChatType,
    friendRequestUsers,
}) => {
  function chatClick() {
    setLeftBarButtonPressed(false);
    setActiveSection('chats');
  }

  function friendsClick() {
    setLeftBarButtonPressed(true);
    setActiveSection('friends');
    setBarChatOpen(true);
  }

  return (
    <div
      className="leftBarChat"
      style={{
        width: barChatOpen === false ? '25vw' : '4rem',
        minWidth: barChatOpen === false ? '18rem' : '4rem',
      }}
    >
      <button
        className="leftBarButtonAction"
        style={{
          background: leftBarButtonPressed === false ? 'gray' : 'transparent',
        }}
        onClick={chatClick}
      >
        <div className="iconLeftBarContainer">
          <img
            src="/Graphics/Icons/chat_bubble.png"
            alt=""
            draggable="false"
            className="iconLeftBarButtonAction"
          />
        </div>
      </button>

      <button
        className={`leftBarButtonAction ${!barChatOpen ? 'barChatOpen' : ''}`}
        style={{
          background: leftBarButtonPressed === true ? 'gray' : 'transparent',
        }}
        onClick={friendsClick}
      >
        <div className="iconLeftBarContainer">
          <img
            src="/Graphics/Icons/friend_request.png"
            alt=""
            draggable="false"
            className="iconLeftBarButtonAction"
          />
          {friendRequestUsers.length > 0 && 
            <div style={{
              position: 'absolute',
              width: '1rem',
              height: '1rem',
              backgroundColor: '#5BE2FF',
              borderRadius: '100%',
              bottom: '.9rem',
              right: '.9rem'   
            }}></div>}
        </div>
      </button>

      {activeSection === 'chats' && (
        <>
          {grupos.map((perfil) => (
            <ChatBox
              key={perfil.id}
              chatType={perfil.chatType}
              chatKey={perfil.id}
              image={perfil.imagen}
              name={perfil.nombre}
              actualChat={actualChat}
              setActualChat={setActualChat}
              setChatIsOpen={setChatIsOpen}
              infoProfile={perfil}
              barChatOpen={barChatOpen}
              setBarChatOpen={setBarChatOpen}
              barChatType={false}
              setActualChatType={setActualChatType}
            />
          ))}
          <ToggleChatButton barChatOpen={barChatOpen} setBarChatOpen={setBarChatOpen} />
        </>
      )}
    </div>
  );
};

const FriendsRequest = ({ friendRequestUsers }) => {
  return (
    <div className="friendsRequestContainer">
      {friendRequestUsers?.length > 0 ? (
        <>
          <h1 className="friendsRequestContainer__title">Solicitudes</h1>
          {friendRequestUsers.map(user => (
            <FriendRequestBox key={user.id} user={user} />
          ))}
        </>
      ) : (
        <div className="empty-screen">
          <img 
            src="/Graphics/Icons/empty-screen_icon-dog.png" 
            alt="" 
            draggable="false"
            style={{
              width: '10rem',
              margin: '0 auto',
              opacity: '0.3',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
          <p className="property-manager__message">No hay solicitudes.</p>
        </div>
      )}
    </div>
  );
};

const ToggleChatButton = ({ setBarChatOpen, barChatOpen }) => {
  return (
    <button className="leftBarButtonAction" onClick={() => setBarChatOpen(!barChatOpen)}>
      <div className="iconLeftBarContainer">
        <img
          src="/Graphics/Icons/flechas.png"
          alt=""
          draggable="false"
          className="iconLeftBarButtonAction"
        />
      </div>
    </button>
  );
};

export default Chat;