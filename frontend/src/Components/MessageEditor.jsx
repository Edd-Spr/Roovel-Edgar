import { useRef, useState } from "react";
import "../Styles/MessageEditor.css";

const MessageEditor = ({setMessageContainerHeight}) => {
    const textAreaRef = useRef(null);
    const [actualSizaMessage, setActualSizaMessage] = useState('45px');

    const adjustHeight = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const newHeight = textarea.scrollHeight-10;
            setMessageContainerHeight((window.innerHeight * 0.80) - actualSizaMessage)
            console.log('Altura calculada:', newHeight);

            if (newHeight <= 100) {
                textarea.style.height = `${newHeight}px`;
                textarea.style.overflowY = "hidden"; 
                setActualSizaMessage(newHeight)
            } else {
                textarea.style.height = `180px`;
                textarea.style.overflowY = "auto";
                setActualSizaMessage(`180px`)
            }
        }
    };

    return (
        <div className="messageEditorContainer">
            <textarea
                ref={textAreaRef}
                className="textAreaChat"
                rows="1"
                onInput={adjustHeight}
                placeholder="Escribe un mensaje..."
            ></textarea>
        </div>
    );
};

export default MessageEditor;