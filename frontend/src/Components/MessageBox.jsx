import '../Styles/MessageBox.css';

const MessageBox = ({messages, info, chatUserId, user}) =>{

    const flag = true;
    return (
        <div className="messageBoxContainer" style={messages.msg_for === user ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}}>
            <div className={`messageBox ${messages.msg_for === user ? 'sentMessageBox' : 'receivedMessageBox'}`}>
                <p className='messageText'>{messages.msg_content}</p>
            </div>
        </div>
    );
}

export default MessageBox;