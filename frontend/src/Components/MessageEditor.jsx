import { useRef, useState } from "react";
import { io } from "socket.io-client";
import "../Styles/MessageEditor.css";
import { httpClientePlugin } from "../Plugins";

const socket = io("http://localhost:3000");

//! Función para enviar mensajes
function sendMessage(idSentMessage, idReciveMessague, message) {
    socket.emit('chat message', { idSentMessage, idReciveMessague, message });
    console.log('Mensaje enviado a través de WebSocket:', { idSentMessage, idReciveMessague, message });
}

const MessageEditor = ({ setMessageContainerHeight, idReciveMessague, idSentMessage }) => {
  const textAreaRef = useRef(null);
  const [actualSizaMessage, setActualSizaMessage] = useState(45); 
  const [message, setMessage] = useState('');

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
        //TODO: AQUI ESTABA MANDO EL MENSAJE PERO CON LA ANTIGUA FUNCION HTTP XDDD
        sendMessage( idSentMessage, idReciveMessague, message);
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
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default MessageEditor;