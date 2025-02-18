import '../Styles/MessageBox.css';

const MessageBox = ({messages, info, chatUserId, user}) =>{

    console.log(chatUserId);
    const flag = true;
    return (
        <div className="messageBoxContainer" style={messages.idRemitente === user ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}}>
            <div className={`messageBox ${messages.idRemitente === user ? 'sentMessageBox' : 'receivedMessageBox'}`}>
                <p className='messageText'>{messages.contenido}</p>
            </div>
        </div>
    );
}

export default MessageBox;