import ChatBox from './ChatBox.jsx';
import SearchInput from '../Components/SearchInput.jsx';
import '../Styles/chatsContainer.css';
import { useState } from 'react';

const ContactsContainer = ({actualChat, setActualChat, setChatIsOpen, perfiles, barChatOpen, setBarChatOpen, setActualChatType}) => {

  return (
    <div 
      className={`chatContactsSection`}
      style={{ 
        width: barChatOpen ? '25vw' : '4rem',
        minWidth: barChatOpen ? '18rem' : '4rem',
      }}
    >

      <div 
        className="chatSearchContainer"
        style={{ 
          width: barChatOpen ? '25vw' : '4rem',
          minWidth: barChatOpen ? '18rem' : '4rem',
        }}
      >
        <SearchInput size={barChatOpen ? 20 : 2.2}/>
      </div>
      
      <div className="contactsContainer">
        {perfiles.map((perfil) => 
          <ChatBox
            key={perfil.id}
            chatType={perfil.tipo}
            chatKey={perfil.id}
            actualChat={actualChat}
            image={perfil.imagen}
            name={perfil.nombre}
            setActualChat={setActualChat}
            setChatIsOpen={setChatIsOpen}
            infoProfile={perfil}
            barChatOpen={barChatOpen}
            setBarChatOpen={setBarChatOpen}
            barChatType={true}
            setActualChatType={setActualChatType}
          />
          )}
      </div>

    </div>
    )
  }


  export default ContactsContainer;