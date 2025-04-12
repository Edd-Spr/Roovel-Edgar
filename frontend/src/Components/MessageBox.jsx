import '../Styles/MessageBox.css';

const MessageBox = ({ messages, chatUserId, user }) => {
    return (
        <div
            className="messageBoxContainer"
            style={
                messages.msg_for === user
                    ? { justifyContent: 'flex-end' }
                    : { justifyContent: 'flex-start' }
            }
        >
            <div
                className={`messageBox ${
                    messages.msg_for === user ? 'sentMessageBox' : 'receivedMessageBox'
                }`}
            >
                <p className="messageText">{messages.msg_content}</p>
            </div>
        </div>
    );
};

export default MessageBox;