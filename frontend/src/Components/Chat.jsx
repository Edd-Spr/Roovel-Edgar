import { useState, useEffect } from 'react'; // Agregar useEffect aquí
import ChatOpen from './ChatOpen.jsx';
import ChatBox from './ChatBox.jsx';
import '../Styles/chatsContainer.css';
import ContactsContainer from './ContactsContainer.jsx';
import { getPorfiles } from '../templade/callback_chat_messges.js';

const Chat = () =>{
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [actualChat, setActualChat] = useState('');
  const [actualChatType, setActualChatType] = useState(''); // Estado para almacenar el tipo de chat
  const [barChatOpen, setBarChatOpen] = useState(true);
  const [leftBarButtonPressed, setLeftBarButtonPressed] = useState(false);
  const [activeSection, setActiveSection] = useState('chats');
  const [user, setUser] = useState(1);
  const [perfiles, setPerfiles2] = useState([]); // Estado para almacenar los perfiles obtenidos

  // useEffect para obtener los perfiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const perfiles = await getPorfiles(user); // Llamada a la función asincrónica
        setPerfiles2(perfiles); // Guardar los perfiles en el estado
      } catch (error) {
        console.error('Error al obtener los perfiles:', error);
      }
    };

    fetchProfiles(); // Llamar a la función al montar el componente
  }, [user]);

const grupos = [
   {
       id: '1',
       chatType: 'grupo',
       nombre: "Grupo de Tecnología",
       imagen: "grupo1.jpeg",
       descripcion: "Discusiones sobre tecnología, programación y IA.",
       mensajes: [
           { idRemitente: 1, remitente: "Carlos", contenido: "¿Alguien ha probado el nuevo framework de JavaScript?", timestamp: "2024-07-01 09:00 AM" },
           { idRemitente: 5, remitente: "Javier", contenido: "Sí, es bastante prometedor.", timestamp: "2024-07-01 09:05 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Yo lo estoy probando y tiene algunas cosas interesantes.", timestamp: "2024-07-01 09:10 AM" },
           { idRemitente: 9, remitente: "David", contenido: "¿Qué ventajas tiene sobre los anteriores?", timestamp: "2024-07-01 09:15 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Principalmente mejor rendimiento y sintaxis más limpia.", timestamp: "2024-07-01 09:20 AM" },
           { idRemitente: 5, remitente: "Javier", contenido: "Eso suena genial, tendré que probarlo.", timestamp: "2024-07-01 09:25 AM" },
           { idRemitente: 1, remitente: "Carlos", contenido: "Yo también lo voy a probar este fin de semana.", timestamp: "2024-07-01 09:30 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Les cuento cómo me va después de probarlo más a fondo.", timestamp: "2024-07-01 09:35 AM" }
       ]
   },
   {
       id: '2',
       chatType: 'grupo',
       nombre: "Grupo de Cine y Series",
       imagen: "grupo2.jpeg",
       descripcion: "Compartimos opiniones sobre películas y series.",
       mensajes: [
           { idRemitente: 2, remitente: "María", contenido: "¿Vieron la última película de Marvel?", timestamp: "2024-07-02 03:30 PM" },
           { idRemitente: 3, remitente: "Luis", contenido: "Sí, estuvo increíble.", timestamp: "2024-07-02 03:35 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "A mí me pareció un poco larga, pero buena.", timestamp: "2024-07-02 03:40 PM" },
           { idRemitente: 4, remitente: "Sofía", contenido: "Yo la voy a ver este fin de semana.", timestamp: "2024-07-02 03:45 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Dime qué te pareció después.", timestamp: "2024-07-02 03:50 PM" },
           { idRemitente: 2, remitente: "María", contenido: "Sí, también quiero saber tu opinión.", timestamp: "2024-07-02 03:55 PM" },
           { idRemitente: 3, remitente: "Luis", contenido: "El final fue lo mejor, no te lo esperas.", timestamp: "2024-07-02 04:00 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Sí, el final fue inesperado.", timestamp: "2024-07-02 04:05 PM" }
       ]
   },
   {
       id: '3',
       chatType: 'grupo',
       nombre: "Grupo de Música",
       imagen: "grupo3.jpeg",
       descripcion: "Compartimos música y recomendaciones.",
       mensajes: [
           { idRemitente: 11, remitente: "Fernando", contenido: "Estoy produciendo una nueva canción. ¿Ideas?", timestamp: "2024-07-11 02:00 PM" },
           { idRemitente: 12, remitente: "Valeria", contenido: "¿Qué tal algo con influencias de jazz?", timestamp: "2024-07-11 02:05 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Me gusta la idea, el jazz siempre da un toque especial.", timestamp: "2024-07-11 02:10 PM" },
           { idRemitente: 11, remitente: "Fernando", contenido: "Sí, estoy pensando en mezclar jazz con electrónica.", timestamp: "2024-07-11 02:15 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Eso suena interesante, ¿tienes algún avance?", timestamp: "2024-07-11 02:20 PM" },
           { idRemitente: 12, remitente: "Valeria", contenido: "Me encantaría escucharlo cuando esté listoZ.", timestamp: "2024-07-11 02:25 PM" },
           { idRemitente: 11, remitente: "Fernando", contenido: "Claro, les comparto un avance en unos días.", timestamp: "2024-07-11 02:30 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Genial, estoy ansioso por escucharlo.", timestamp: "2024-07-11 02:35 PM" }
       ]
   },
   {
       id: '4',
       chatType: 'grupo',
       nombre: "Grupo de Viajes",
       imagen: "grupo4.jpeg",
       descripcion: "Compartimos experiencias y recomendaciones de viajes.",
       mensajes: [
           { idRemitente: 4, remitente: "Sofía", contenido: "¿Alguien ha estado en Japón?", timestamp: "2024-07-04 08:00 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Sí, estuve el año pasado. Es increíble.", timestamp: "2024-07-04 08:05 AM" },
           { idRemitente: 7, remitente: "Ricardo", contenido: "Yo quiero ir el próximo año.", timestamp: "2024-07-04 08:10 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Te recomiendo visitar Kyoto, es hermoso.", timestamp: "2024-07-04 08:15 AM" },
           { idRemitente: 4, remitente: "Sofía", contenido: "Sí, Kyoto es mi próximo destino.", timestamp: "2024-07-04 08:20 AM" },
           { idRemitente: 7, remitente: "Ricardo", contenido: "¿Qué tal el transporte allá?", timestamp: "2024-07-04 08:25 AM" },
           { idRemitente: 222, remitente: "Tú", contenido: "El transporte es muy eficiente, sobre todo el tren.", timestamp: "2024-07-04 08:30 AM" },
           { idRemitente: 4, remitente: "Sofía", contenido: "Gracias por las recomendaciones.", timestamp: "2024-07-04 08:35 AM" }
       ]
   },
   {
       id: '5',
       chatType: 'grupo',
       nombre: "Grupo de Videojuegos",
       imagen: "grupo5.jpeg",
       descripcion: "Discusiones sobre videojuegos y recomendaciones.",
       mensajes: [
           { idRemitente: 9, remitente: "David", contenido: "¿Alguien juega Valorant?", timestamp: "2024-07-09 08:45 PM" },
           { idRemitente: 10, remitente: "Andrea", contenido: "¡Sí! Soy main Jett.", timestamp: "2024-07-09 08:50 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Yo juego, pero soy main Phoenix.", timestamp: "2024-07-09 08:55 PM" },
           { idRemitente: 9, remitente: "David", contenido: "¿Jugamos una partida juntos?", timestamp: "2024-07-09 09:00 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Claro, ¿a qué hora?", timestamp: "2024-07-09 09:05 PM" },
           { idRemitente: 10, remitente: "Andrea", contenido: "Yo me apunto también.", timestamp: "2024-07-09 09:10 PM" },
           { idRemitente: 9, remitente: "David", contenido: "¿Qué tal a las 9:30 PM?", timestamp: "2024-07-09 09:15 PM" },
           { idRemitente: 222, remitente: "Tú", contenido: "Perfecto, nos vemos en el juego.", timestamp: "2024-07-09 09:20 PM" }
       ]
   }
];

  const remitente = [...perfiles, ...grupos].find((perfil) => perfil.id === actualChat)?.idRemitente;
  const idGroup = [...grupos].find((perfil) => perfil.id === actualChat)?.id;
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