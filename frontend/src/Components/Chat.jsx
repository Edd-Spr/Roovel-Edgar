import { useState, useEffect } from 'react'; // Agregar useEffect aquí
import '../Styles/chatsContainer.css';

import ChatOpen from './ChatOpen.jsx';
import ChatBox from './ChatBox.jsx';
import ContactsContainer from './ContactsContainer.jsx';
import { getPorfiles, getGroups , getFriendsRequest} from '../templade/callback_chat_messges.js';

import FriendRequestBox from './FriendRequestBox/index.jsx';

import { useAuth } from '../hooks/auth/index.jsx';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



const Chat = () =>{
    const { usrToken, isAuthenticated } = useAuth();
    const [IDUSER, setIDUSER] = useState(0); // Estado para almacenar el ID del usuario
    const [user, setUser] = useState(0); // Estado para sincronizar con IDUSER
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated) {
          navigate('/auth'); // Redirige al usuario a la página de autenticación
      }
  }, [isAuthenticated, navigate]);
    // Decodificar el token y obtener el ID del usuario
    useEffect(() => {
        if (usrToken) {
            try {
                const decodedToken = jwtDecode(usrToken);
                console.log('Token decodificado:', decodedToken);
                console.log('ID del Usuario:', decodedToken.userId);
                console.log('Estado de autenticación:', isAuthenticated);
                setIDUSER(decodedToken.userId); // Actualiza el estado con el ID del usuario
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        } else {
            console.log('No hay token disponible.');
        }
    }, [usrToken]);

    // Sincronizar el estado `user` con `IDUSER`
    useEffect(() => {
        setUser(IDUSER); // Actualiza `user` cada vez que `IDUSER` cambie
    }, [IDUSER]);

    useEffect(() => {
        console.log('IDUSER actualizado:', IDUSER); // Verifica que el IDUSER se actualice correctamente
    }, [IDUSER]);

    useEffect(() => {
        console.log('user actualizado:', user); // Verifica que el user se actualice correctamente
    }, [user]);
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [actualChat, setActualChat] = useState('');
  const [actualChatType, setActualChatType] = useState(''); // Estado para almacenar el tipo de chat
  const [barChatOpen, setBarChatOpen] = useState(true);
  const [leftBarButtonPressed, setLeftBarButtonPressed] = useState(false);
  const [activeSection, setActiveSection] = useState('chats');
  const [perfiles, setPerfiles2] = useState([]); 
  const [grupos, setGrupos] = useState([]); // Estado para almacenar los grupos
  const [friendRequestUsers, setFriendRequest] = useState([]); // Estado para almacenar las solicitudes de amistad



  useEffect(() => {
    const fetchFriendRequests = async () => {
        try {
            if (user !== 0) { // Verifica que `user` no sea 0
                const friendRequests = await getFriendsRequest(user);
                setFriendRequest(friendRequests); 
            }
        } catch (error) {
            console.error('Error al obtener las solicitudes de amistad:', error);
        }
    };
    fetchFriendRequests();
}, [user]);

  console.log('friendRequestUsers',friendRequestUsers)


  useEffect(() => {
    const fetchProfiles = async () => {
        try {
            if (user !== 0) { // Verifica que `user` no sea 0
                const perfiles = await getPorfiles(user);
                setPerfiles2(perfiles);
            }
        } catch (error) {
            console.error('Error al obtener los perfiles:', error);
        }
    };

    fetchProfiles();
}, [user]);

useEffect(() => {
    const fetchGroups = async () => {
        try {
            if (user !== 0) { // Verifica que `user` no sea 0
                const grupos = await getGroups(user);
                setGrupos(grupos);
            }
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
          perfiles.length > 0 || grupos.length > 0 ? (
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
              <p className="property-manager__message">No tienes amigos.</p>
            </div>
          )
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
        actualChat={actualChat}
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
      {friendRequestUsers.length > 0 ? (
        <>
          <h1 className="friendsRequestContainer__title">Solicitudes</h1>
          {friendRequestUsers?.map(user => (
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
    <button className="leftBarButtonAction toggleChatButton" onClick={() => setBarChatOpen(!barChatOpen)}>
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