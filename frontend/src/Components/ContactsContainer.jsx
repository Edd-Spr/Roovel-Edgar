import ChatBox from './ChatBox.jsx';
import SearchInput from '../Components/SearchInput.jsx';
import '../Styles/chatsContainer.css';
import { useState } from 'react';

const ContactsContainer = ({actualChat, setActualChat, setIsOpen, perfiles, barChatOpen, setBarChatOpen}) => {

    return (
        <div className="contactsContainer" style={{display: 'flex'}}>
            <ContactsSection
              actualChat={actualChat}
              setActualChat={setActualChat}
              setIsOpen={setIsOpen}
              perfiles={perfiles}
              barChatOpen={barChatOpen}
              setBarChatOpen={setBarChatOpen}
            />
        </div>
    );
  }


  const ContactsSection = ({actualChat, setActualChat, setIsOpen, perfiles, barChatOpen, setBarChatOpen}) =>{

    return (
    <div className="chatSection" style={{ width: barChatOpen ? '20vw' : '9vh', transition: '.3s'}}>

      <div className="chatSearchContainer">
        <SearchInput size={barChatOpen ? 18 : 2.5}/>
      </div>
      
      {perfiles.map((perfil) => 
        <ChatBox
          key={perfil.id}
          chatKey={perfil.id}
          actualChat={actualChat}
          image={perfil.imagen}
          name={perfil.nombre}
          setActualChat={setActualChat}
          setIsOpen={setIsOpen}
          infoProfile={perfil}
          barChatOpen={barChatOpen}
          setBarChatOpen={setBarChatOpen}
          barChatType={true}
        />
        )}

    </div>
    )
  }

  export default ContactsContainer;