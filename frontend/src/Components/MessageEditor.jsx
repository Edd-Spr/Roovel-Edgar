import '../Styles/MessageEditor.css';
import SearchInput from './SearchInput';


const MessageEditor = () =>{
    return (
        <div className="messageEditorContainer">
            <SearchInput size={25}/>
        </div>
    );
}

export default MessageEditor;