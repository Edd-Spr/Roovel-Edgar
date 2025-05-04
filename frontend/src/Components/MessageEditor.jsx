import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../Styles/MessageEditor.css";
import { httpClientePlugin } from "../Plugins";

const socket = io("http://localhost:3000");

//! Función para enviar mensajes
function sendMessage(idSentMessage, idReciveMessague, message) {
    socket.emit('chat message', { idSentMessage, idReciveMessague, message });
    console.log('Mensaje enviado a través de WebSocket:', { idSentMessage, idReciveMessague, message });
}
function sendMessageGroup(idSentMessage, idGruop, message) {
    socket.emit('chat message group', { idSentMessage, idGruop, message });
    console.log('Mensaje enviado a través de WebSocket:', { idSentMessage, idGruop, message });
}

export const MessageEditor = ({ setMessageContainerHeight, idReciveMessague, idSentMessage, actualChat }) => {
  const textAreaRef = useRef(null);
  const [actualSizaMessage, setActualSizaMessage] = useState(45); 
  const [message, setMessage] = useState('');

  console.log('actualSizaMessage', actualChat);

  // Vaciar el textarea cuando actualChat cambie
  useEffect(() => {
    setMessage(''); 
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '45px';
    }
  }, [actualChat]);

  
  const adjustHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reinicia para medir bien
      const newHeight = textarea.scrollHeight;
  
      const maxHeight = window.innerHeight * 0.20; // 20vh
      const heightToSet = Math.min(newHeight, maxHeight);
  
      textarea.style.height = `${heightToSet}px`;
      textarea.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
      setActualSizaMessage(heightToSet);
      setMessageContainerHeight((window.innerHeight * 0.80) - heightToSet);
      
      // Asegura que se vea el final del contenido
      textarea.scrollTop = textarea.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        sendMessage(idSentMessage, idReciveMessague, message);
        setMessage('');
        textAreaRef.current.style.height = '45px'; 
      } catch (error) {
        console.error('Error al manejar el envío del mensaje:', error);
      }
    }
  };

  return (
    <div className="messageEditorContainer">
      <textarea
        ref={textAreaRef}
        className="textAreaChat"
        rows="1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onInput={adjustHeight}
        placeholder="Escribe un mensaje..."
      ></textarea>
      <button 
        className="send-message__button"
        onClick={handleSendMessage}>{'>'}</button>
    </div>
  );
};

export const MessageEditorGroup = ({ setMessageContainerHeight, idGroup, idSentMessage, actualChat }) => {
  const textAreaRef = useRef(null);
  const [actualSizaMessage, setActualSizaMessage] = useState(45); 
  const [message, setMessage] = useState('');

  // Vaciar el textarea cuando actualChat cambie
  useEffect(() => {
    setMessage(''); 
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '45px'; 
    }
  }, [actualChat]);

  const adjustHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight - 10;
      setMessageContainerHeight((window.innerHeight * 0.80) - actualSizaMessage);

      if (newHeight <= 100) {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
        setActualSizaMessage(newHeight); 
      } else {
        textarea.style.height = `180px`;
        textarea.style.overflowY = "auto";
        setActualSizaMessage(180); 
      }
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        sendMessageGroup(idSentMessage, idGroup, message);
        setMessage('');
        textAreaRef.current.style.height = '45px'; 
      } catch (error) {
        console.error('Error al manejar el envío del mensaje:', error);
      }
    }
  };

  return (
    <div className="messageEditorContainer">
      <textarea
        ref={textAreaRef}
        className="textAreaChat"
        rows="1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onInput={adjustHeight}
        placeholder="Escribe un mensaje..."
      ></textarea>
      <button 
        className="send-message__button"
        onClick={handleSendMessage}>{'>'}</button>
    </div>
  );
};


