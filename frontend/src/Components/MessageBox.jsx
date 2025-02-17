import '../Styles/MessageBox.css';

const MessageBox = ({messages, info, chatUserId}) =>{

    console.log(chatUserId);
    const flag = true;
    return (
        <div className="messageBoxContainer" style={messages.idRemitente === chatUserId ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}>
            <div className={`messageBox ${messages.idRemitente === chatUserId ? 'sentMessageBox' : 'receivedMessageBox'}`}>
                <p className='messageText'>{messages.contenido}</p>
            </div>
        </div>
    );
}

export default MessageBox;