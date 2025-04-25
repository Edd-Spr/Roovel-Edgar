import { useState, useEffect } from 'react'; // Agregar useEffect aquí
import ChatOpen from './ChatOpen.jsx';
import ChatBox from './ChatBox.jsx';
import '../Styles/chatsContainer.css';
import ContactsContainer from './ContactsContainer.jsx';
import { getPorfiles, getGroups } from '../templade/callback_chat_messges.js';
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
            <div className="emptyContainer">
              <p>Descubre nuevas personas y grupos para chatear.</p>
            </div>
          )
        ) : (
          <FriendsRequest />
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

const FriendsRequest = () => {
  return (
    <div className="friendsRequestContainer">

    </div>
  );
}

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