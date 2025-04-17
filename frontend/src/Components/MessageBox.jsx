import '../Styles/MessageBox.css';

export const MessageBox = ({ messages, chatUserId, user }) => {
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
export const MessageBoxGroup = ({ messages, chatUserId, user }) => {
    return (
        <div
            className="messageBoxContainer"
            style={
                messages.msg_from === user
                    ? { justifyContent: 'flex-end' }
                    : { justifyContent: 'flex-start' }
            }
        >
            <div
                className={`messageBox ${
                    messages.msg_from === user ? 'sentMessageBox' : 'receivedMessageBox'
                }`}
            >
                <p className="messageText">{messages.msg_content}</p>
            </div>
        </div>
    );
}

