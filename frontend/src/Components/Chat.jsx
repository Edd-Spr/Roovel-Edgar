import ChatOpen from './ChatOpen.jsx';
import ChatBox from './ChatBox.jsx';
import '../Styles/chatsContainer.css';
import { useState } from 'react';
import ContactsContainer from './ContactsContainer.jsx';
import {getMessages} from '../templade/callback_chat_messges.js'
import { httpClientePlugin } from '../Plugins/index.js'
const Chat = () =>{
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [actualChat, setActualChat] = useState('');
  const [barChatOpen, setBarChatOpen] = useState(true);
  const [leftBarButtonPressed, setLeftBarButtonPressed] = useState(false);
  const [activeSection, setActiveSection] = useState('chats');

  const [user, setUser] = useState(2);

    return (

      <article className="chatContainer">
        <section style={{zIndex: '1000', display: 'flex'}}>
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
            />


            {activeSection == 'chats' ? <ContactsContainer
                actualChat={actualChat}
                setActualChat={setActualChat}
                setChatIsOpen={setChatIsOpen}
                perfiles={perfiles}
                barChatOpen={barChatOpen}
                setBarChatOpen={setBarChatOpen}
            /> : 
            <FriendsRequest/>
            }

        </section>
    
        <ChatOpen
            chatIsOpen={chatIsOpen}
            setChatIsOpen={setChatIsOpen}
            infoProfile={[...perfiles, ...grupos].find((perfil) => perfil.id === actualChat)}
            user={user}
            setActualChat={setActualChat}
        />

      </article>

    );
  }

const LeftBarChat = ({grupos, barChatOpen, setBarChatOpen, actualChat, setActualChat, setChatIsOpen, activeSection, setActiveSection, leftBarButtonPressed, setLeftBarButtonPressed}) => {

    function chatClick(){
        setLeftBarButtonPressed(false);
        setActiveSection('chats');
    }
    function friendsClick(){
        setLeftBarButtonPressed(true)
        setActiveSection('friends')
        setBarChatOpen(true)
    }
    return (

        <div className='leftBarChat' style={barChatOpen ? {} : {width: '20vw'}} >

            <button className="leftBarButtonAction" 
                style={{ 
                    width: barChatOpen === false ? '20vw' : '9vh',
                    background: leftBarButtonPressed == false ? 'gray' : 'transparent',
                }}
                onClick={chatClick}
            >
                <img 
                    src="/Graphics/Icons/chat_bubble.png" 
                    alt="" 
                    draggable='false'
                    style={{height: '60%'}}
                    className='iconLeftBarButtonAction'
                    />
            </button>

            <button className="leftBarButtonAction" 
                style={{ 
                    width: barChatOpen == false ? '20vw' : '9vh', 
                    background: leftBarButtonPressed == true ? 'gray' : 'transparent' }}
                onClick={friendsClick}
            >
                <img 
                    src="/Graphics/Icons/friend_request.png" 
                    alt="" 
                    draggable='false'
                    style={{height: '60%'}}
                    className='iconLeftBarButtonAction'
                    />
            </button>
        
            {activeSection == 'chats' &&
            <>
            {grupos.map((perfil) => 
                <ChatBox
                    key={perfil.id}
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
                />
            )}
            <ToggleChatButton
                barChatOpen={barChatOpen}
                setBarChatOpen={setBarChatOpen}
            />
            </>
        }
        </div>

    );
}

const FriendsRequest = () => {
    return (
        <div className="friendsRequestContainer">

        </div>
    );
}

const ToggleChatButton = ({setBarChatOpen, barChatOpen}) =>{

    return(

        <button className='toggleChatButton' onClick={()=>setBarChatOpen(!barChatOpen)}>
            <img 
                src="/Graphics/Icons/flechas.png" 
                alt="" 
                style={{width: '100%'}}
                draggable='false'
                />
        </button>

    );
}
const mensajes = await getMessages(2,1)

   const perfiles3=  [
        {
            id: 'p-1',
            chatType: 'profile',
            nombre: "Carlos Gómez Hernandez Guadalupe",
            imagen: "imagen1.jpeg",
            descripcion: "Aficionado al fútbol y la tecnología. Siempre en busca de nuevos retos.",
            mensajes: mensajes // Ahora mensajes es un array de objetos, NO una Promise
        }
    ]
    console.log(perfiles3)

const perfiles = [
    {
        id: 'p-1',
        chatType: 'profile',
        nombre: "Carlos Gómez Hernandez Guadalupe",
        imagen: "imagen1.jpeg",
        descripcion: "Aficionado al fútbol y la tecnología. Siempre en busca de nuevos retos.",
        mensajes: mensajes
        
    },
    {
        id: 'p-2',
        chatType: 'profile',
        nombre: "María Rodríguez",
        imagen: "imagen2.jpeg",
        descripcion: "Amante del cine y la buena comida. Me encanta salir con amigos.",
        mensajes: [
            { idRemitente: 2, remitente: "María", contenido: "¿Vamos al cine el sábado?", timestamp: "2024-07-02 03:30 PM" },
            { idRemitente: 222, remitente: "Luis", contenido: "Sí, suena bien. ¿Qué película quieres ver?", timestamp: "2024-07-02 03:35 PM" }
        ]
    },
    {
        id: 'p-3',
        chatType: 'profile',
        nombre: "Luis Fernández",
        imagen: "imagen3.jpeg",
        descripcion: "Apasionado por la música y los videojuegos. Siempre dispuesto a ayudar.",
        mensajes: [
            { idRemitente: 3, remitente: "Luis", contenido: "¿Terminaste el trabajo de la uni?", timestamp: "2024-07-03 06:00 PM" },
            { idRemitente: 222, remitente: "Carlos", contenido: "Casi, solo me falta revisar algunos detalles.", timestamp: "2024-07-03 06:05 PM" },
            { idRemitente: 3, remitente: "Luis", contenido: "Pues fijate que a mi me viene valiendo 3 hectareas de pura verga", timestamp: "2024-07-03 06:00 PM" },
        ]
    },
    {
        id: 'p-4',
        chatType: 'profile',
        nombre: "Sofía Méndez",
        imagen: "imagen4.jpeg",
        descripcion: "Me encanta viajar y conocer nuevas culturas. La fotografía es mi pasión.",
        mensajes: [
            { idRemitente: 4, remitente: "Sofía", contenido: "¡Feliz cumpleaños! 🎉", timestamp: "2024-07-04 08:00 AM" },
            { idRemitente: 222, remitente: "María", contenido: "¡Gracias! Qué lindo detalle. 💖", timestamp: "2024-07-04 08:05 AM" }
        ]
    },
    {
        id: 'p-5',
        chatType: 'profile',
        nombre: "Javier Ramírez",
        imagen: "imagen5.jpeg",
        descripcion: "Programador de corazón. Me encanta el café y los retos de código.",
        mensajes: [
            { idRemitente: 5, remitente: "Javier", contenido: "¿Alguien ha probado la nueva IA de OpenAI?", timestamp: "2024-07-05 10:15 AM" },
            { idRemitente: 222, remitente: "Elena", contenido: "Sí, está increíble.", timestamp: "2024-07-05 10:20 AM" }
        ]
    },
    {
        id: 'p-6ç',
        chatType: 'profile',
        nombre: "Elena Torres",
        imagen: "imagen6.jpeg",
        descripcion: "Amo la lectura y la ciencia ficción. Escritora en mi tiempo libre.",
        mensajes: [
            { idRemitente: 6, remitente: "Elena", contenido: "¿Recomiendan algún libro de ciencia ficción?", timestamp: "2024-07-06 07:30 PM" },
            { idRemitente: 222, remitente: "Ricardo", contenido: "Sí, 'Duna' es un clásico.", timestamp: "2024-07-06 07:40 PM" }
        ]
    },
    {
        id: 'p-7',
        chatType: 'profile',
        nombre: "Ricardo Pérez",
        imagen: "imagen7.jpeg",
        descripcion: "Amante del senderismo y la aventura. Siempre buscando la siguiente expedición.",
        mensajes: [
            { idRemitente: 7, remitente: "Ricardo", contenido: "¿Quién se anima a una caminata el domingo?", timestamp: "2024-07-07 12:00 PM" },
            { idRemitente: 222, remitente: "Gabriela", contenido: "¡Yo! Me encanta caminar.", timestamp: "2024-07-07 12:10 PM" }
        ]
    },
    {
        id: 'p-8',
        chatType: 'profile',
        nombre: "Gabriela Sánchez",
        imagen: "imagen8.jpeg",
        descripcion: "Amante de los animales y la naturaleza. Siempre en busca de nuevas experiencias.",
        mensajes: [
            { idRemitente: 8, remitente: "Gabriela", contenido: "¡Mi perrito aprendió un nuevo truco!", timestamp: "2024-07-08 04:30 PM" },
            { idRemitente: 222, remitente: "David", contenido: "¡Qué genial! ¿Cuál es?", timestamp: "2024-07-08 04:35 PM" }
        ]
    },
    {
        id: 'p-9',
        chatType: 'profile',
        nombre: "David Castro",
        imagen: "imagen9.jpeg",
        descripcion: "Ingeniero de software. Me encanta la inteligencia artificial y los videojuegos.",
        mensajes: [
            { idRemitente: 9, remitente: "David", contenido: "¿Alguien juega Valorant?", timestamp: "2024-07-09 08:45 PM" },
            { idRemitente: 222, remitente: "Andrea", contenido: "¡Sí! Soy main Jett.", timestamp: "2024-07-09 08:50 PM" }
        ]
    },
    {
        id: 'p-10',
        chatType: 'profile',
        nombre: "Andrea López",
        imagen: "imagen10.jpeg",
        descripcion: "Bailarina y fan de los videojuegos. Siempre en movimiento.",
        mensajes: [
            { idRemitente: 10, remitente: "Andrea", contenido: "¿Alguien quiere ir a clases de salsa?", timestamp: "2024-07-10 05:00 PM" },
            { idRemitente: 222, remitente: "Fernando", contenido: "¡Me interesa! Siempre he querido aprender.", timestamp: "2024-07-10 05:10 PM" }
        ]
    },
    {
        id: 'p-11',
        chatType: 'profile',
        nombre: "Fernando Ríos",
        imagen: "imagen11.jpeg",
        descripcion: "Músico y productor. Apasionado por los sonidos y la creatividad.",
        mensajes: [
            { idRemitente: 11, remitente: "Fernando", contenido: "Estoy produciendo una nueva canción. ¿Ideas?", timestamp: "2024-07-11 02:00 PM" },
            { idRemitente: 222, remitente: "Valeria", contenido: "¿Qué tal algo con influencias de jazz?", timestamp: "2024-07-11 02:05 PM" }
        ]
    },
    {
        id: 'p-12',
        chatType: 'profile',
        nombre: "Valeria Martínez",
        imagen: "imagen12.jpeg",
        descripcion: "Diseñadora gráfica. Amante del arte y la ilustración.",
        mensajes: [
            { idRemitente: 12, remitente: "Valeria", contenido: "Acabo de terminar un nuevo diseño. ¿Opiniones?", timestamp: "2024-07-12 11:00 AM" },
            { idRemitente: 222, remitente: "Carlos", contenido: "¡Se ve increíble! Me encanta tu estilo.", timestamp: "2024-07-12 11:10 AM" }
        ]
    }
];
const grupos = [
    {
        id: 'g-1',
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
        id: 'g-2',
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
        id: 'g-3',
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
            { idRemitente: 12, remitente: "Valeria", contenido: "Me encantaría escucharlo cuando esté listo.", timestamp: "2024-07-11 02:25 PM" },
            { idRemitente: 11, remitente: "Fernando", contenido: "Claro, les comparto un avance en unos días.", timestamp: "2024-07-11 02:30 PM" },
            { idRemitente: 222, remitente: "Tú", contenido: "Genial, estoy ansioso por escucharlo.", timestamp: "2024-07-11 02:35 PM" }
        ]
    },
    {
        id: 'g-4',
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
        id: 'g-5',
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
  export default Chat;